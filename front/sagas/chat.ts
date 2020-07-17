import { all, fork, takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_CHAT_REQUEST, GET_CHAT_SUCCESS, GET_CHAT_FAILURE, GetChatRequestAction,
} from '../reducers/chat';

function getChatAPI(roomId: number) {
    return axios.get(`/room/${roomId}/chat`);
}

function* getChat(action: GetChatRequestAction) {
    try {
        const result = yield call(getChatAPI, action.data);
        yield put({
            type: GET_CHAT_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: GET_CHAT_FAILURE,
            error: e.response?.data,
        });
    }
}

function* watchGetChat() {
    yield takeEvery(GET_CHAT_REQUEST, getChat);
}

export default function* chatSaga() {
    yield all([
        fork(watchGetChat),
    ]);
}