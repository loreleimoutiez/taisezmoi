import { useState } from 'react';

const Chatbot = () => {
    const [userQuestion, setUserQuestion] = useState('');
    const [messages, setMessages] = useState([]);

    const handleUserInput = (event) => {
        setUserQuestion(event.target.value);
    };

    const handleSubmit = async () => {
        if (userQuestion) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: userQuestion, sender: 'user' }
            ]);

            try {
                const response = await fetch('/api/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ question: userQuestion })
                });
                const data = await response.json();

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: data.answer || 'No response found', sender: 'bot' }
                ]);

                setUserQuestion('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="chatbot-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender}>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>

            <div className="input-section">
                <input
                    type="text"
                    value={userQuestion}
                    onChange={handleUserInput}
                    placeholder="Message Quack"
                />
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
