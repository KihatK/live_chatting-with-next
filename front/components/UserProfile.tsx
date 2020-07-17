import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../reducers';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
    const dispatch = useDispatch();

    const nickname = useSelector((state: RootState) => state.user.me?.nickname);

    const logout = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    return (
        <div>
            {nickname}님
            <button onClick={logout}>로그아웃</button>
        </div>
    );
}

export default UserProfile;