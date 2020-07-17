import produce from 'immer';

type ChatState = {
    chatList: {
        id: number,
        content: string,
        user: string,
    }[],
};

export const initialState: ChatState = {
    chatList: [],
};

export const GET_CHAT_REQUEST = 'GET_CHAT_REQUEST';
export const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
export const GET_CHAT_FAILURE = 'GET_CHAT_FAILURE';

export const ADD_CHAT = 'ADD_CHAT';

export interface GetChatRequestAction {
    type: typeof GET_CHAT_REQUEST,
    data: number,
};
interface GetChatSuccessAction {
    type: typeof GET_CHAT_SUCCESS,
    data: {
        id: number,
        content: string,
        user: string,
    }[],
};
interface GetChatFailureAction {
    type: typeof GET_CHAT_FAILURE,
    error: Error,
};

interface AddChatAction {
    type: typeof ADD_CHAT,
    data: {
        content: string,
        user: string,
        id: number,
    },
};

type ChatAction = 
    | GetChatRequestAction | GetChatSuccessAction | GetChatFailureAction
    | AddChatAction;

export default (state = initialState, action: ChatAction): ChatState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case GET_CHAT_REQUEST: {
                draft.chatList = [];
                break;
            }
            case GET_CHAT_SUCCESS: {
                action.data.forEach((c) => {
                    draft.chatList.push(c);
                });
                break;
            }
            case GET_CHAT_FAILURE: {
                break;
            }
            case ADD_CHAT: {
                draft.chatList.push(action.data);
                break;
            }
            default: {
                break;
            }
        }
    });
}