import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import io from 'socket.io-client';

import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';
import { RootState } from '../reducers';

const fetcher = (url: string) => axios.get(url).then((result) => result.data);

const socket = io('http://localhost:3065/room');

const Home = () => {
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);

    const { data: roomList, error: roomListError } = useSWR('http://localhost:3065/room', fetcher);

    const [rooms, setRooms] = useState<any>();

    useEffect(() => {
        socket.on('newRoom', (data: any) => {
            setRooms((prevRooms: any) => {
                return [data, ...prevRooms];
            });
        })
        return () => {
            socket.off('newRoom', (data: any) => {
                setRooms((prevRooms: any) => {
                    return [data, ...prevRooms];
                });
            });
        }
    }, []);

    useEffect(() => {
        setRooms(roomList);
    }, [roomList]);

    return (
        <>
            <Link href="/signup">
                <a>회원가입하기</a>
            </Link>
            {nickname
                ? <UserProfile/>
                : <LoginForm/>
            }
            <div style={{ marginBottom: '10px' }}>
                채팅방
            </div>
            <fieldset>
                <legend>채팅방 목록</legend>
                {rooms?.map((r: { title: string, owner: string, id: number }) => (
                    <div key={r.id} style={{ padding: '5px' }}>
                        <Link href="/room/[id]" as={`/room/${r.id}`}>
                            <a>{r.title}</a>
                        </Link>
                    </div>
                ))}
            </fieldset>
            <Link href="/newroom">
                <a>채팅방 생성</a>
            </Link>
        </>
    );
}

export default Home;