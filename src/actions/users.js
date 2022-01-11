import {hideLoading, showLoading} from "react-redux-loading";
import {_getUsers} from "../utils/_DATA";

export const GET_ALL_USERS = 'GET_ALL_USERS'

export function getAllUsers(users) {
    return {
        type: GET_ALL_USERS,
        users
    }
}

export function handleInitialUsers() {
    return (dispatch) => {
        dispatch(showLoading())
        return _getUsers()
            .then((users) => {
                dispatch(getAllUsers(users))
                dispatch(hideLoading())
            })
    }
}
