import { GET, GET_SUCCESS, GET_ERROR } from "./actions";
import { store } from "../store";

const initialState = {
    entities: [],
    timeStamp: null,
    errorTimeStamp: null,
    options: null,
    mesanjeError: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case GET:
            newState.options = action.options;
            break;

        case GET_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;

        case GET_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
