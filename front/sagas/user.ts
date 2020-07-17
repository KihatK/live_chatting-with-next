import { all, fork, takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SignupRequestAction,
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LoginRequestAction,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, LogoutRequestAction,
} from '../reducers/user';

function signupAPI(signupData: { userId: string, password: string, nickname: string }) {
    return axios.post('/user', signupData);
}

function* signup(action: SignupRequestAction) {
    try {
        yield call(signupAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}

function* watchSignup() {
    yield takeEvery(SIGN_UP_REQUEST, signup);
}

function loginAPI(LoginData: { userId: string, password: string }) {
    return axios.post('/user/login', LoginData, {
        withCredentials: true,
    });
}

function* login(action: LoginRequestAction) {
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
            error: e,
        });
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login);
}

function logoutAPI() {
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}

function* logout(action: LogoutRequestAction) {
    try {
        yield call(logoutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        });
    }
}

function* watchLogout() {
    yield takeEvery(LOG_OUT_REQUEST, logout);
}

export default function* userSaga() {
    yield all([
        fork(watchSignup),
        fork(watchLogin),
        fork(watchLogout),
    ]);
}