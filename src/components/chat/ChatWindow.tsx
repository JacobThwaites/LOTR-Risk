import React from 'react';
import ChatOutput from "./ChatOutput";
import ChatFeedback from "./ChatFeedback";
import { ChatMessage } from './ChatMessageType';

type Props = {
    messages: Array<ChatMessage>,
    isSomeoneTyping: boolean
}

function ChatWindow(props: Props) {
    return (
        <div id="chat--window">
          <ChatOutput messages={props.messages} />
          <ChatFeedback isSomeoneTyping={props.isSomeoneTyping} />
        </div>
    )
}

export default ChatWindow;