import React from 'react';

import { Chat } from '../pages/room/[id]';

interface ChatProps {
    chat: Chat,
};

const MyMsg = ({ chat }: ChatProps) => {
    return (
        <div style={{ marginBottom: '10px', textAlign: 'right' }}>
            <div style={{ color: `${chat.user}` }}>{chat.user}</div>
            <div style={{ border: '1px solid skyblue', display: 'inline-block', padding: '5px', borderRadius: '10px' }}>
                {chat.content}
            </div>
        </div>
    );
}

export default MyMsg;