import produce from 'immer';

type UserState = {
    me: {
        id: number,
        nickname: string,
    } | null,
};

const initialState: UserState = {
    me: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export interface SignupRequestAction {
    type: typeof SIGN_UP_REQUEST,
    data: {
        userId: string,
        password: string,
        nickname: string,
    },
};
interface SignupSuccessAction {
    type: typeof SIGN_UP_SUCCESS,
};
interface SignupFailureAction {
    type: typeof SIGN_UP_FAILURE,
    error: Error,
};

export interface LoginRequestAction {
    type: typeof LOG_IN_REQUEST,
    data: {
        userId: string,
        password: string,
    },
};
interface LoginSuccessAction {
    type: typeof LOG_IN_SUCCESS,
    data: {
        id: number,
        nickname: string,
    },
};
interface LoginFailureAction {
    type: typeof LOG_IN_FAILURE,
    error: Error,
};

export interface LogoutRequestAction {
    type: typeof LOG_OUT_REQUEST,
};
interface LogoutSuccessAction {
    type: typeof LOG_OUT_SUCCESS,
};
interface LogoutFailureAction {
    type: typeof LOG_OUT_FAILURE,
    error: Error,
};

type UserAction = 
    | SignupRequestAction | SignupSuccessAction | SignupFailureAction
    | LoginRequestAction | LoginSuccessAction | LoginFailureAction
    | LogoutRequestAction | LogoutSuccessAction | LogoutFailureAction;

export default (state = initialState, action: UserAction): UserState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SIGN_UP_REQUEST: {
                break;
            }
            case SIGN_UP_SUCCESS: {
                break;
            }
            case SIGN_UP_FAILURE: {
                break;
            }
            case LOG_IN_REQUEST: {
                break;
            }
            case LOG_IN_SUCCESS: {
                draft.me = action.data;
                break;
            }
            case LOG_IN_FAILURE: {
                break;
            }
            case LOG_OUT_REQUEST: {
                break;
            }
            case LOG_OUT_SUCCESS: {
                draft.me = null;
                break;
            }
            case LOG_OUT_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });
}