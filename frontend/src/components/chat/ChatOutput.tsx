import React from "react";
import { ChatMessage } from './ChatMessageType';

type Props = {
  messages: Array<ChatMessage>
}

function ChatOutput(props: Props) {
  return (
    <div id="chat--output">
      {props.messages.map((m, index) => {
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
