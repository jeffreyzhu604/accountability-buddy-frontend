/**
 * Sources:
 * - https://www.digitalocean.com/community/tutorials/react-axios-react
 * - https://dmitripavlutin.com/react-useeffect-infinite-loop/
 * - https://stackoverflow.com/questions/57444203/get-id-from-url-in-react-js
 * - https://stackoverflow.com/questions/69795799/useeffect-dependency-cause-an-infinite-loop
 * 
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styles from '../../styles.css';
import { UserList } from './UserList';

export const Profile = () => {

    // Get user ID from URL
    let selectedID = useParams().id;

    const [selectedUser, setSelectedUser] = useState({});

    const [currentUserFriends, setCurrentUserFriends] = useState([]);

    // Get a list of users and current active user from the Redux store.
    // Component re-renders if the state changes.
    const { users, activeUser } = useSelector(state => ({
        users: state.userReducer.users,
        activeUser: state.loginReducer.activeUser
    }));

    // Update the selected user based off the ID in the URL.
    // Run each time the ID changes.
    useEffect(() => {
        const user = users.find(user => user._id === selectedID);
        setSelectedUser(user);
    }, [selectedID]);

    // Update the selected user list of friends.
    // Run each time the user list or ID in the URL changes.
    useEffect(() => {
        const friends = users.filter(user => user.friends.includes(selectedID));
        setCurrentUserFriends(friends);
    }, [users, selectedID]);

    const filterProfileUsers = () => {
        // Checks if the ID in the URL matches the ID of the active user
        if (selectedID == activeUser._id) {
            // Filter 1: Removes active user from the user list
            // Filter 2: Finds all friends of current active user
            return users.filter(user => user._id !== activeUser._id).filter(user => user.friends.includes(activeUser._id));
        }
        return currentUserFriends;
    }

    return (
        <div className="profile-content">
            {selectedUser ? <h1>{`${selectedUser.firstName} ${selectedUser.lastName}`}</h1> : <div></div>}
            <h2>Friends:</h2>
            <UserList users={filterProfileUsers()} selectedID={selectedID} />
        </div>
    );
};