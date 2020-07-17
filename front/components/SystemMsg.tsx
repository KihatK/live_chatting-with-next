import React from 'react';

import { Chat } from '../pages/room/[id]';

interface ChatProps {
    chat: Chat,
};

const SystemMsg = ({ chat }: ChatProps) => {
    return (
        <div style={{ textAlign: 'center', color: 'gray', marginBottom: '10px' }}>
            {chat.content}
        </div>
    );
}

export default SystemMsg;