import React, { useState } from 'react';

function App() {
  const [xaiResponse, setXaiResponse] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://syncserv-backend.vercel.app/xai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setXaiResponse(data.message || data.error);
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
      <div className="text-3xl font-bold">
        {xaiResponse || 'SyncServ.ai Widget'}
      </div>
    </div>
  );
}

export default App;