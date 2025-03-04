from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from routes.doc_routes import document_bp
from database import get_neo4j_session
import warnings

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'AUTH_TOKEN'
jwt = JWTManager(app)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"]
)

app.register_blueprint(document_bp, url_prefix='/api')

def process_data_with_neo4j():
    session = get_neo4j_session()
    try:
        result = session.run("MATCH (n) RETURN count(n) as nodeCount")
        node_count = result.single()[0]
        return node_count
    finally:
        session.close()

@app.route('/test')
def test():
    count = process_data_with_neo4j()
    return f"Nombre de noeuds dans Neo4j: {count}"

if __name__ == "__main__":
    app.run(debug=True, port=5001)
