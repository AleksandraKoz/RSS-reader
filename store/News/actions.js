import {CLEAR_STATE} from "./actionTypes";

export function clearState() {
    return (dispatch) => {
        dispatch({
            type: CLEAR_STATE,
        });
    };
}