import React, { useState, useCallback, useRef, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import SocketIOClient from 'socket.io-client';

import { RootState } from '../reducers';
import { ADD_ROOM_REQUEST } from '../reducers/room';


const NewRoom = () => {
    const dispatch = useDispatch();
    const { addedRoom } = useSelector((state: RootState) => state.room);

    const [title, setTitle] = useState('');
    const countRef = useRef(false);

    const changeTitle = useCallback(e => {
        setTitle(e.target.value);
    }, []);

    const publishRoom = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: ADD_ROOM_REQUEST,
            data: title,
        });
    }, [title]);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
        }
        else {
            if (addedRoom) {
                Router.push('/');
            }
        }
    }, [addedRoom]);

    return (
        <>
            <h1>채팅방 생성하기</h1>
            <form onSubmit={publishRoom}>
                <input value={title} onChange={changeTitle}/>
                <button type="submit">생성하기</button>
            </form>
        </>
    );
}

export default NewRoom;