import React, { Component } from "react";
import FormButton from "../common/FormButton";
import ChatOutput from "./ChatOutput";
import ChatInput from "./ChatInput";
import ChatFeedback from "./ChatFeedback";

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
    console.log(event);
    console.log(event.key);
    

    switch (event.key) {
      case 'Enter':
        this.onSubmitMessage();
        break;
      default:
        break;
    }
  }

  onSubmitMessage() {
    const { chatInput, chatHandle, messages } = this.state;

    if (chatInput.length < 1) {
      return;
    }

    const message = { chatHandle, chatInput };
    messages.push(message);
    this.setState({ messages, chatInput: "", isSomeoneTyping: false });

    // send websocket update
  }

  onTextChange(event) {
    console.log(event);
    
    const text = event.target.value;
    this.setState({ chatInput: text });
    console.log(text);
    
    if (text.length > 0) {
      this.setState({ isSomeoneTyping: true });
    } else {
      this.setState({ isSomeoneTyping: false });
    }
  }

  render() {
    const { chatInput, chatHandle, messages, isSomeoneTyping } = this.state;
    return (
      <div id="chat">
        <h2>Chat</h2>
        <div id="chat--window">
          <ChatOutput messages={messages} />
          <ChatFeedback isSomeoneTyping={isSomeoneTyping} />
        </div>
        <ChatInput
          chatHandle={chatHandle}
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
