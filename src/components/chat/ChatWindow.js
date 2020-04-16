import React, { Component } from "react";
import FormButton from "../common/FormButton";
import ChatOutput from "./ChatOutput";
import ChatInput from "./ChatInput";
import ChatFeedback from "./ChatFeedback";
import io from "socket.io-client";

const socket = io('http://localhost:4000');

class ChatWindow extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      chatInput: "",
      chatHandle: "Test",
      messages: [],
      isSomeoneTyping: false,
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  _handleKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        this.onSubmitMessage();
        break;
      default:
        break;
    }
  }

  onSubmitMessage() {
  const { chatInput } = this.state;

    if (chatInput.length < 1) {
      return;
    }

    this.emitChatMessage();
    this.addEmittedMessageToList();
    
    // send websocket update
  }

  emitChatMessage() {
    const { chatInput, chatHandle } = this.state;
    const message = { chatHandle, chatInput };
    socket.emit('chat', message);
    return message;
  }

  addEmittedMessageToList() {
    const { messages } = this.state;
    socket.on('chat', (message) => {
      console.log(message);
      messages.push(message);
      console.log(messages);
      this.setState({ messages, chatInput: "", isSomeoneTyping: false });
    })
  }

  onTextChange(event) {    
    const text = event.target.value;
    this.setState({ chatInput: text });
    
    if (text.length > 0) {
      this.setState({ isSomeoneTyping: true });
    } else {
      this.setState({ isSomeoneTyping: false });
    }
  }

  render() {
    const { chatInput, messages, isSomeoneTyping } = this.state;
    return (
      <div id="chat">
        <h2 id="chat--header">Chat</h2>
        <div id="chat--window">
          <ChatOutput messages={messages} />
          <ChatFeedback isSomeoneTyping={isSomeoneTyping} />
        </div>
        <ChatInput
          message={chatInput}
          onTextChange={this.onTextChange}
          onKeyPress={this._handleKeyDown}
        />
        <FormButton
          id="chat--send-button"
          label="send"
          onClick={this.onSubmitMessage}
        />
      </div>
    );
  }
}

export default ChatWindow;
