import React from 'react';

function ChatFeedback(props) {
    return (
        <div id="chat--feedback">
            { props.isSomeoneTyping &&
                <p>someone is typing...</p>
            }
        </div>
    )
}

export default ChatFeedback;