const HowDoesItWork = () => (
    <div className="max-w-3xl mx-auto px-6 py-10 dark:bg-base-100 dark:text-white">
        <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 text-center mb-6">
            How it works
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8">
            Welcome to Quack, a RAG app that allows you to easily explore the content of a web page and interact with it through a cute chatbot.
        </p>

        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Loading a Document
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Enter a URL:</strong> To get started, copy and paste the link to a web page and click "Load Document".</li>
                    <li><strong>Content Extraction:</strong> The application retrieves the text from the page and splits it into smaller sections (chunks).</li>
                    <li><strong>Smart Storage:</strong> Each chunk is stored in a search-optimized database (Neo4j).</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Asking Questions
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Understanding:</strong> The application uses artificial intelligence to analyze your question.</li>
                    <li><strong>Search:</strong> Quack finds relevant passages from the document using an AI-based search engine.</li>
                    <li><strong>Responses:</strong> The AI provides a concise and accurate answer based on the document’s content.</li>
                </ul>
            </div>
        </div>
    </div>
);

export default HowDoesItWork;
