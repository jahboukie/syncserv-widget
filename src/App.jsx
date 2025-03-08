import React, { useState, useEffect } from 'react';

function App() {
  const [xaiResponse, setXaiResponse] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/xai')
      .then((res) => res.json())
      .then((data) => setXaiResponse(data.message))
      .catch((err) => setXaiResponse('Error fetching xAI'));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-3xl text-blue-500 font-bold">
      {xaiResponse || 'SyncServ.ai Widget'}
    </div>
  );
}

export default App;

