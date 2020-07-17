import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import io from 'socket.io-client';

import SystemMsg from '../../components/SystemMsg';
import MyMsg from '../../components/MyMsg';
import OthersMsg from '../../components/OthersMsg';
import { RootState } from '../../reducers';
import { GET_CHAT_REQUEST, ADD_CHAT } from '../../reducers/chat';

export interface Chat {
    user: string,
    content: string,
};

const chats = [{
    nickname: 'system',
    content: 'Kihat님께서 입장하셨습니다.',
    me: false,
}, {
    nickname: 'TiredKihat',
    content: 'Hello',
    me: false,
}, {
    nickname: 'NewKihat',
    content: 'Hello there',
    me: false,
}, {
    nickname: 'Kihat',
    content: 'Bye',
    me: true,
}];

const fetcher = (url: string) => axios.get(url).then((result) => result.data);

const socket = io('http://localhost:3065/chat');

const chat = () => {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const { chatList } = useSelector((state: RootState) => state.chat);

    const { data: room, error: roomError } = useSWR(`http://localhost:3065/room/${id}`, fetcher);

    const [chat, setChat] = useState('');

    const changeChat = useCallback((e) => {
        setChat(e.target.value);
    }, []);

    const sendMessage = useCallback((e) => {
        e.preventDefault();
        socket.emit('sendMsg', { chat, id, nickname });
    }, [chat, nickname]);

    useEffect(() => {
        dispatch({
            type: GET_CHAT_REQUEST,
            data: id,
        });
    }, []);

    useEffect(() => {
        socket.on('backMsg', (data: any) => {
            dispatch({
                type: ADD_CHAT,
                data: data.sendChat,
            });
        });
    }, []);

    return (
        <>
            <div>{room?.title}</div>
            <div style={{ marginBottom: '5px' }}>
                방장: <span style={{ color: `${room?.owner}` }}>{room?.owner}</span>
            </div>
            <fieldset>
                <legend>채팅 내용</legend>
                <div>
                    {chatList?.map((c: { content: string, user: string, id: number }) => {
                        return c.user === 'system'
                            ? <SystemMsg key={c.id} chat={c}/>
                            : (
                                c.user === nickname
                                    ? <MyMsg key={c.id} chat={c}/>
                                    : <OthersMsg key={c.id} chat={c}/>
                            )
                    })}
                </div>
            </fieldset>
            <form style={{ float: 'right' }} onSubmit={sendMessage}>
                <input type="text" value={chat} onChange={changeChat}/>
                <button type="submit">전송</button>
            </form>
        </>
    );
}

export default chat;