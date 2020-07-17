import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SIGN_UP_REQUEST } from '../reducers/user';

const SignupForm = () => {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const changeUserId = useCallback(e => {
        setUserId(e.target.value);
    }, []);

    const changePassword = useCallback(e => {
        setPassword(e.target.value);
    }, []);

    const changeNickname = useCallback(e => {
        setNickname(e.target.value);
    }, []);

    const signup = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                userId,
                password,
                nickname,
            },
        });
    }, [userId, password, nickname]);

    return (
        <form onSubmit={signup}>
            <input value={userId} onChange={changeUserId} />
            <input value={password} onChange={changePassword} />
            <input value={nickname} onChange={changeNickname} />
            <button type="submit">회원가입</button>
        </form>
    )
}

export default SignupForm;