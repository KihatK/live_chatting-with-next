import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import room from './room';
import chat from './chat';
import user from './user';

axios.defaults.baseURL = 'http://localhost:3065';

export default function* rootSaga() {
    yield all([
        fork(room),
        fork(chat),
        fork(user),
    ]);
}