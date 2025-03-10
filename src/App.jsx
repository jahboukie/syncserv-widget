import React, { useState, useEffect } from 'react';

function App() {
  const [xaiResponse, setXaiResponse] = useState('');
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/history`)
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error('History fetch error:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/xai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setXaiResponse(data.message || data.error);
      const historyRes = await fetch(`${import.meta.env.VITE_API_URL}/history`);
      setHistory(await historyRes.json());
    } catch (err) {
      setXaiResponse('Error fetching xAI');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-blue-500">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask xAI something..."
          className="border p-2 mr-2 text-black"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
      <div className="text-3xl font-bold mb-4">
        {xaiResponse || 'SyncServ.ai Widget'}
      </div>
      <div className="text-lg max-h-64 overflow-y-auto">
        <h3 className="font-bold">Chat History</h3>
        {history.map((entry, idx) => (
          <div key={idx} className="mb-2">
            <p><strong>You:</strong> {entry.prompt}</p>
            <p><strong>Grok:</strong> {entry.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;