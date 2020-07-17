import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = () => {
    const dispatch = useDispatch();
    
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const changeUserId = useCallback(e => {
        setUserId(e.target.value);
    }, []);

    const changePassword = useCallback(e => {
        setPassword(e.target.value);
    }, []);

    const login = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId,
                password,
            }
        })
    }, [userId, password]);

    return (
        <form>
            <input value={userId} onChange={changeUserId} />
            <input value={password} onChange={changePassword} />
            <button onClick={login}>로그인</button>
        </form>
    );
}

export default LoginForm;