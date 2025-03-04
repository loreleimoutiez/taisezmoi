from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import requests
from openai import OpenAI, OpenAIError
from bs4 import BeautifulSoup
from database import get_neo4j_session
from langchain.text_splitter import RecursiveCharacterTextSplitter
from settings import OPENAI_API_KEY, NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD
from langchain_community.vectorstores import Neo4jVector
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQAWithSourcesChain
import time
import random

document_bp = Blueprint('document_bp', __name__)

sessions = {}

def get_session(user_id):
    return sessions.get(user_id, {"history": []})

def update_session(user_id, question, answer):
    if user_id not in sessions:
        sessions[user_id] = {"history": []}
    sessions[user_id]["history"].append((question, answer))

# Initialiser le client OpenAI
client = OpenAI(api_key=OPENAI_API_KEY)

# Configuration LangChain
neo4j_vector_store = Neo4jVector.from_existing_graph(
    embedding=OpenAIEmbeddings(),
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    index_name='document_chunks',
    node_label='Chunk',
    text_node_properties=['text'],
    embedding_node_property='textEmbedding',
)

retriever = neo4j_vector_store.as_retriever()

chain = RetrievalQAWithSourcesChain.from_chain_type(
    ChatOpenAI(temperature=0.1), 
    chain_type="stuff", 
    retriever=retriever
)

def extract_keyword(text):
    if not text:
        return None
    words = text.split()
    return words[0] if words else None

def derive_chunk_id(response_text):
    if not response_text:
        return None
    session = get_neo4j_session()
    try:
        keyword = extract_keyword(response_text)
        if keyword:
            query = """
            MATCH (chunk:Chunk)
            WHERE chunk.text CONTAINS $keyword
            RETURN chunk.chunkId as id
            LIMIT 1
            """
            result = session.run(query, keyword=keyword)
            single_result = result.single()
            if single_result:
                return single_result[0]
            else:
                return None
    finally:
        session.close()

def prettychain(question: str) -> dict:
    print(f"Question reçue: {question}")  # Log de la question reçue
    response = chain({"question": question}, return_only_outputs=True)
    if response and 'answer' in response:
        chunk_id = derive_chunk_id(response['answer'])
        print(f"ID de chunk dérivé: {chunk_id}")  # Log de l'ID de chunk
        return {'answer': response['answer'], 'chunkId': chunk_id if chunk_id else 'undefined'}
    else:
        print("Aucune réponse générée ou manquante dans la réponse.")  # Log en cas d'échec
        return {'answer': 'No response generated', 'chunkId': 'undefined'}

def make_api_call(text):
    try:
        response = client.embeddings.create(
            model="text-embedding-ada-002",
            input=[text]
        )
        if response.data[0]:
            print("Embedding created successfully.")
        return True, response.data[0]
    except OpenAIError as e:
        print(f"OpenAI Error: {str(e)}")
        return False, str(e)
    except Exception as e:
        print(f"General Error: {str(e)}")
        return False, str(e)

def call_with_exponential_backoff(text):
    retries = 3
    wait = 1
    for i in range(retries):
        success, message = make_api_call(text)
        if success:
            return message
        else:
            print(f"Échec de l'appel API, nouvelle tentative dans {wait} secondes... Raison : {message}")
            time.sleep(wait)
            wait *= (2 ** i) + random.uniform(0, 1)

def calculate_embeddings(text):
    embeddings = call_with_exponential_backoff(text)
    return embeddings

@document_bp.route('/load-url', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:5173', headers=['Content-Type'])
def load_url():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()
    url = data['url']
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    title = soup.title.string if soup.title else "Document sans titre"
    text = soup.get_text(separator=' ', strip=True)

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=200,
        length_function=len,
        is_separator_regex=False,
    )
    text_chunks = text_splitter.split_text(text)

    session = get_neo4j_session()

    # Création du nœud de documentation
    doc_id = url.split('/')[-1]
    document_node_query = """
    MERGE (doc:Document {docId: $docId, url: $url})
    ON CREATE SET doc.title = $title
    ON MATCH SET doc.title = $title
    RETURN doc
    """
    session.run(document_node_query, docId=doc_id, url=url, title=title)

    # Fusion et création de nœuds chunk
    merge_chunk_node_query = """
    MERGE (chunk:Chunk {chunkId: $chunkParam.chunkId})
    ON CREATE SET
        chunk.text = $chunkParam.text,
        chunk.source = $chunkParam.source
    RETURN chunk
    """
    link_chunk_to_doc_query = """
    MATCH (doc:Document {docId: $docId})
    MATCH (chunk:Chunk {chunkId: $chunkId})
    MERGE (chunk)-[:PART_OF]->(doc)
    """

    try:
        chunk_seq_id = 0
        for chunk in text_chunks:
            chunk_param = {
                'text': chunk,
                'source': url,
                'chunkId': f'{doc_id}-chunk{chunk_seq_id:04d}'
            }
            # Création des chunks
            session.run(merge_chunk_node_query, chunkParam=chunk_param)
            # Lier les chunks au document
            session.run(link_chunk_to_doc_query, docId=doc_id, chunkId=chunk_param['chunkId'])
            chunk_seq_id += 1

        # Liaison séquentielle des chunks
        if chunk_seq_id > 1:  # S'assurer qu'il y a plus d'un chunk
            for i in range(chunk_seq_id - 1):
                link_chunks_query = """
                MATCH (c1:Chunk {chunkId: $prevChunkId}), (c2:Chunk {chunkId: $nextChunkId})
                MERGE (c1)-[:NEXT]->(c2)
                """
                session.run(link_chunks_query, prevChunkId=f'{doc_id}-chunk{i:04d}', nextChunkId=f'{doc_id}-chunk{i+1:04d}')

        # Traiter et encoder les embeddings de texte si nécessaire
        for chunk in text_chunks:
            success, embedding = make_api_call(chunk)
            if success:
                embedding_str = str(embedding)
                update_embedding_query = """
                MATCH (c:Chunk {chunkId: $chunkId})
                SET c.textEmbedding = $embedding_str
                RETURN c
                """
                session.run(update_embedding_query, parameters={'chunkId': chunk_param['chunkId'], 'embedding_str': embedding_str})
            else:
                print(f"Failed to create embedding for chunk: {chunk_param['chunkId']}")

        return jsonify({"message": "Texte chargé et traité avec succès", "url": url})
    finally:
        session.close()

@document_bp.route('/search', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:5173', headers=['Content-Type'])
def search():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    data = request.get_json(force=True)
    question = data.get('question')
    if not question:
        return jsonify({'error': 'No question provided'}), 400
    try:
        result = prettychain(question)
        if not result.get('chunkId'):
            return jsonify({'error': 'Chunk ID could not be determined', 'answer': result.get('answer')}), 500
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@document_bp.route('/get-window', methods=['POST'])
@cross_origin(origin='http://localhost:5173', headers=['Content-Type'])
def get_window():
    data = request.get_json()
    chunk_id = data['chunkId']

    session = get_neo4j_session()
    try:
        window_query = """
        MATCH (c1:Chunk)-[:NEXT]->(c2:Chunk)-[:NEXT]->(c3:Chunk)
        WHERE c1.chunkId = $chunkId
        RETURN c1.text as chunk1Text, c2.text as chunk2Text, c3.text as chunk3Text
        """
        result = session.run(window_query, {'chunkId': chunk_id})
        window_text = result.single()

        if window_text:
            return jsonify({
                "chunk1": window_text['chunk1Text'],
                "chunk2": window_text['chunk2Text'],
                "chunk3": window_text['chunk3Text']
            })
        else:
            return jsonify({"error": "No such window found."}), 404
    finally:
        session.close()
