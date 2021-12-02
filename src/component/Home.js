import React, { useEffect } from 'react';
import { UserList } from './users/UserList';
import { SearchBar } from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../actions';

export const Home = () => {

  const dispatch = useDispatch();

  // Get list of current users from Redux store.
  // Component re-renders if any of these states change.
  const { users } = useSelector(state => ({
    users: state.userReducer.users
  }));

  // Load initial users
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="home">
      <SearchBar />
      <h1>Members:</h1>
      <UserList users={users}/>
    </div>
  );
};
