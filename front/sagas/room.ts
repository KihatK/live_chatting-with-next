import { all, fork, takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {  
    ADD_ROOM_REQUEST, ADD_ROOM_SUCCESS, ADD_ROOM_FAILURE, AddRoomRequestAction,
} from '../reducers/room';

function addRoomAPI(roomTitle: string) {
    return axios.post('/room', { roomTitle }, {
        withCredentials: true,
    });
}

function* addRoom(action: AddRoomRequestAction) {
    try {
        yield call(addRoomAPI, action.data);
        yield put({
            type: ADD_ROOM_SUCCESS,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: ADD_ROOM_FAILURE,
            error: e.response?.data,
        });
    }
}

function* watchAddRoom() {
    yield takeEvery(ADD_ROOM_REQUEST, addRoom);
}

export default function* roomSaga() {
    yield all([
        fork(watchAddRoom),
    ]);
}