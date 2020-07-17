import produce from 'immer';

type RoomState = {
    addedRoom: boolean,
};

export const initialState: RoomState = {
    addedRoom: false,
};

export const ADD_ROOM_REQUEST = 'ADD_ROOM_REQUEST';
export const ADD_ROOM_SUCCESS = 'ADD_ROOM_SUCCESS';
export const ADD_ROOM_FAILURE = 'ADD_ROOM_FAILURE';

export interface AddRoomRequestAction {
    type: typeof ADD_ROOM_REQUEST,
    data: string,
};
interface AddRoomSuccessAction {
    type: typeof ADD_ROOM_SUCCESS,
}
interface AddRoomFailureAction {
    type: typeof ADD_ROOM_FAILURE,
    error: Error,
};

type RoomAction = 
    | AddRoomRequestAction | AddRoomSuccessAction | AddRoomFailureAction;

export default (state = initialState, action: RoomAction): RoomState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_ROOM_REQUEST: {
                draft.addedRoom = false;
                break;
            }
            case ADD_ROOM_SUCCESS: {
                draft.addedRoom = true;
                break;
            }
            case ADD_ROOM_FAILURE: {
                draft.addedRoom = false;
                break;
            }
            default: {
                break;
            }
        }
    });
}