import React from "react";

type Props = {
  message: string,
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

function ChatInput(props: Props) {
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
