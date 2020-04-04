import React, { Component } from "react";
import FormButton from "./common/FormButton";

class ChatWindow extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      chatInput: '',
      chatHandle: 'test',
      messages: []
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  onTextChange(event) {
    this.setState({ chatInput: event.target.value });
  }

  onSubmitMessage() {
    const { chatInput, chatHandle, messages } = this.state;
    const message = `${chatHandle}: ${chatInput}`
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    const { chatInput, chatHandle, messages } = this.state;
    return (
      <div id="chat">
        <h2>Chat</h2>
        <div id="chat--window">
          <div id="chat--output">
            {messages.map((message) => {
              return <p>{message}</p>
            })}
          </div>
          <div id="chat--feedback"></div>
        </div>
        <input 
          id="chat--handle" 
          type="text" 
          placeholder="Handle" 
          value={chatHandle}
        />
        <input 
          id="chat--message" 
          type="text"
          placeholder="Message" 
          value={chatInput}
          onChange={this.onTextChange}
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
