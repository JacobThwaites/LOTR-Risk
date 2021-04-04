import React from 'react';

type Props = {
    isSomeoneTyping: boolean
}

function ChatFeedback(props: Props) {
    return (
        <div id="chat--feedback">
            { props.isSomeoneTyping &&
                <p>someone is typing...</p>
            }
        </div>
    )
}

export default ChatFeedback;