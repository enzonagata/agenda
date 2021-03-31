import {
    USER_VARIABLES,
    USER_LOGIN_ERROR,
    USER_LOGIN
} from '../actions/types';

const initialstate = {
    userlogged: []
}

//Salva o nome do usuário
const userReducer = (state = initialstate, action) => {
    //console.log(action)
    switch (action.type) {
        case USER_LOGIN_ERROR:
            return {
                ...state,
                error: action.msg
            }
        case USER_LOGIN:
            return {
                ...state,
                userlogged: action.user
            }
        default:
            return state;
    }
}
export default userReducer;
