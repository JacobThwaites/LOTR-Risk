import React from 'react';
import ChatOutput from "./ChatOutput";
import ChatFeedback from "./ChatFeedback";

function ChatWindow({
    messages, 
    isSomeoneTyping
}) {
    return (
        <div id="chat--window">
          <ChatOutput messages={messages} />
          <ChatFeedback isSomeoneTyping={isSomeoneTyping} />
        </div>
    )
}

export default ChatWindow;