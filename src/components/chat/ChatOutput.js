import React from "react";

function ChatOutput({ messages }) {
  return (
    <div id="chat--output">
      {messages.map((m, index) => {
        return (
          <p key={index}>
            <strong>{m.chatHandle}:</strong> {m.chatInput}
          </p>
        );
      })}
    </div>
  );
}

export default ChatOutput;
