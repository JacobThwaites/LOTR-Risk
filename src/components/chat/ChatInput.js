import React from "react";

function ChatInput(props) {
  return (
    <input
      id="chat--message"
      type="text"
      placeholder="Message"
      value={props.message}
      onChange={props.onTextChange}
      onKeyPress={props.onKeyPress}
    />
  );
}

export default ChatInput;
