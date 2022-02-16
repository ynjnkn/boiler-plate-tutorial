import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
// import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// *** INITIAL STATES ***
const initialState = {
    user: null,
};

// *** ACTIONS ***
const LOG_IN = "LOG_IN";

// *** ACTION CREATORS ***
const logIn = createAction(LOG_IN, (user) => ({ user }));


// *** MIDDLEWARES ***
const loginMiddleware = (loginRequestBody) => {
    return (dispatch, getState, { history }) => {
        axios.post('http://localhost:5000/api/users/login', loginRequestBody)
            .then((response) => {
                let token = response.data;
                dispatch(logIn(token));
                window.location.href = "/";
            })
            .catch((error) => {
                window.alert(error.response);
            })
    };
};



// *** REDUCER ***
export default handleActions(
    {
        [LOG_IN]: (state, action) =>
            produce(state, (draft) => {
                draft.user = action.payload.user;
            }),
        // [LOG_OUT]: (state, action) =>
        //     produce(state, (draft) => {
        //         deleteCookie("is_login");
        //         draft.user = null;
        //         draft.is_login = false;
        //     }),
        // [GET_USER]: (state, action) => produce(state, (draft) => { }),
    },
    initialState
);


export const actionCreators = {
    loginMiddleware,
};