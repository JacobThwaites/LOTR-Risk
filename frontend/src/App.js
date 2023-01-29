import React, { useEffect } from 'react';
import Risk from './components/Risk';
import './sass/main.scss';

function App() {
  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:8001');

    // Connection opened
    socket.addEventListener('open', (event) => {
      socket.send('Hello Server!');
    });

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
