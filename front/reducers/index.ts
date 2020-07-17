import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import room from './room';
import chat from './chat';
import user from './user';

const rootReducer = combineReducers({
    room,
    chat,
    user,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;