import React, { useEffect } from 'react';
import Risk from './components/Risk';
import './sass/main.scss';

function App() {
  // TODO: probably can be removed
  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:8001');

    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
    });
  }, []);

  return (
    <div className="App">
      <Risk />
    </div>
  );
}

export default App;
