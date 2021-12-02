import {
    LOG_IN,
    LOG_OUT,
    GET_USERS,
    ADD_USER,
    REMOVE_USER,
    UPDATE_FRIENDS,
    SET_LOADING,
    LOG_IN_ERROR,
    EDIT_USERS_ERROR,
    UPDATE_ACTIVE_USER,
    AGREEMENT_ERROR,
    CREATE_AGREEMENT,
    GET_AGREEMENT,
    NEW_SEARCH,
    RESET_ACTIVE_AGREEMENT
} from '../actions/types';
import axios from 'axios';

/*
    NOTE: Express server hosted on: https://arcane-falls-63724.herokuapp.com/. For local development,
    please use localhost on port 4000.

    NOTE: This file contains all the action creators used to change the state of the Redux store.
*/

/**
 * Action creator to set the state to indicate that something is being loaded.
 */
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

/**
 * Action creator to obtain user data once authenticated and authorized.
 */
export const login = credentials => async dispatch => {
    try {
        setLoading();
        const loginInfo = await axios.post("http://localhost:4000/login", credentials);
        dispatch({
            type: LOG_IN,
            payload: {
                _id: loginInfo.data.user._id,
                friends: loginInfo.data.user.friends                
            }
        });
    } catch (err) {
        dispatch({
            type: LOG_IN_ERROR,
            payload: err.response.statusText
        });
    }
};

/**
 * Action creator to log users out.
 */
export const logout = history => {
    history.push("/");
    return {
        type: LOG_OUT
    };
};

/**
 * Action creator update friends list if user adds or removes friends.
 */
export const updateFriends = (payload) => {
    return {
        type: UPDATE_FRIENDS,
        payload: payload
    };
};

/**
 * Action creator to fetch all the users of the site.
 */
export const getUsers = () => async dispatch => {
    try {
        const users = await axios.get("http://localhost:4000/users/all");
        dispatch({
            type: GET_USERS,
            payload: users.data
        });
    } catch (error) {
        dispatch({
            type: EDIT_USERS_ERROR,
            payload: error.response.statusText
        });
    }
};

/**
 * Action creator to add friends.
 */
export const addUser = friends => async dispatch => {
    try {
        const updates = await axios.put("http://localhost:4000/add-friend", {
            activeUser: friends.activeUser,
            _id: friends._id
        });

        const users = updates.data.map(user => {
            return {
                _id: user._id,
                friends: user.friends,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                profileMessage: user.profileMessage,
                dateJoined: user.dateJoined,
                friends: user.friends
            };
        });
        const activeUserUpdated = users.find(user => user._id === friends.activeUser._id);
        dispatch(updateFriends(users));
        dispatch({
            type: UPDATE_ACTIVE_USER,
            payload: activeUserUpdated
        });
    } catch (err) {
        dispatch({
            type: EDIT_USERS_ERROR,
            payload: err.response.statusText
        })
    }
};

/**
 * Action creator to remove friends
 */
export const removeUser = friends => async dispatch => {
    try {
        const updates = await axios.put("http://localhost:4000/remove-friend", {
            activeUser: friends.activeUser,
            _id: friends._id
        });
        const users = updates.data.map(user => {
            return {
                _id: user._id,
                friends: user.friends,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                profileMessage: user.profileMessage,
                dateJoined: user.dateJoined,
                friends: user.friends
            };
        });
        const activeUserUpdated = users.find(user => user._id === friends.activeUser._id);
        dispatch(updateFriends(users));
        dispatch({
            type: UPDATE_ACTIVE_USER,
            payload: activeUserUpdated
        });
    } catch (err) {
        dispatch({
            type: EDIT_USERS_ERROR,
            payload: err.response.statusText
        });
    }
};

/**
 * Action creator to create an agreement.
 */
export const addAgreement = agreement => async dispatch => {
    try {
        setLoading();
        const agreementData = await axios.post("http://localhost:4000/create-agreement", agreement);
        dispatch({
            type: CREATE_AGREEMENT,
            payload: agreementData.data
        });
    } catch (err) {
        dispatch({
            type: AGREEMENT_ERROR,
            payload: err.response.statusText
        });
    }
};

/**
 * Action creator to reset active agreement.
 */
export const resetActiveAgreement = () => {
    return {
        type: RESET_ACTIVE_AGREEMENT
    };
};

/**
 * Action creator to fetch agreements
 */
export const getAgreement = () => async dispatch => {
    try {
        setLoading();
        const agreements = await axios.get("http://localhost:4000/agreement");
        dispatch({
            type: GET_AGREEMENT,
            payload: agreements.data
        });
    } catch (err) {
        dispatch({
            type: AGREEMENT_ERROR,
            payload: err.response.statusText
        });
    }
};

/**
 * Action creator to create a search.
 */
export const newSearch = searchInput => {
    return {
        type: NEW_SEARCH,
        payload: searchInput
    };
};
