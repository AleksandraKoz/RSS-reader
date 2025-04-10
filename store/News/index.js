import { CLEAR_STATE } from './actionTypes';

const initialState = {
    isPending: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_STATE:
            return {
                ...state,
                isPending: true,
            };

        default:
            return state;
    }
};