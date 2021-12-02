import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUser, removeUser } from '../../actions';

export const User = ({ id, username, profileMessage, dateJoined, friends, activeUser, trimDate }) => {

    const dispatch = useDispatch();

    // Get the status if a user is currently logged in from the Redux store.
    // Component re-renders if the state changes.
    const { loggedIn } = useSelector(state => ({
        loggedIn: state.loginReducer.loggedIn   
    }));

    const addFriend = () => {
        dispatch(addUser({
            activeUser: activeUser,
            _id: id
        }));
    }
    
    const removeFriend = () => {
        dispatch(removeUser({
            activeUser: activeUser,
            _id: id
        }));
    }

    // Conditionally render buttons on the user list.
    const renderButtons = () => {
        // Checks if a user is logged in.
        if (loggedIn) {
            // If id is the same as the active user, display no button.
            if (id === activeUser._id) {
                return <div></div>
            // If friends list contains active user, display remove button
            } else if (friends.includes(activeUser._id)) {
                return <button onClick={() => removeFriend()} className="button-nav buttons">Remove friend</button>;
            // If friends list doesn't contain active user, display add button                
            } else {
                return <button onClick={() => addFriend()} className="button-nav buttons">Add friend</button>;
            }
        } 
        // No user is logged in, display no button
        return <div></div>
    }

    return (
        <div className="card">
            <Link to={`/profile/${id}`}><h3>{`${username}`}</h3></Link>
            <div className="user-list-description">
                <p>{profileMessage}</p>
                <p>{trimDate(dateJoined)}</p>
                {renderButtons()} 
            </div>
        </div>
               
    );
};