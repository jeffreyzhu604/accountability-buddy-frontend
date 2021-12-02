/*
    Sources:
    - https://surajsharma.net/blog/axios-post-form-data
*/
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addAgreement } from '../../actions';

export const AgreementForm = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    // Get the current active user, list of current users and loading state from Redux store.
    // Component re-renders if any of these states change.
    const { activeUser, users, loading } = useSelector(state => ({
        activeUser: state.loginReducer.activeUser,
        users: state.userReducer.users,
        loading: state.agreementReducer.loading
    }));
    
    const [formValue, setFormValue] = useState({
        endDate: "",
        amount: "",
        description: "",
        friend: ""
    });

    // Update local state of each form element
    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFriend(formValue.friend)) {
            dispatch(addAgreement({
                endDate: formValue.endDate,
                amount: formValue.amount,
                description: formValue.description,
                friendID: getFriendID(formValue.friend),
                creatorID: activeUser._id
            }));
            // Update users here
            setFormValue({
                ...formValue,
                endDate: "",
                amount: "",
                description: "",
                friend: ""
            });
            // Redirect to agreements page after submitting the agreement
            if (!loading) {
                history.push("/agreement");
            }
        }
    }

    const isFriend = (friend) => {
        // Find the friend
        const result = users.find(user => user.username === friend);
        if (!result) {
            alert(`${friend} is not your friend`);
            return false;
        }
        if (activeUser.friends.includes(result._id)) return true;
        return false;
    }

    const getFriendID = (friend) => {
        const result = users.find(user => user.username === friend);
        if (result) return result._id;
        return "";
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <br/>
                    <br/>
                    <label htmlFor="endDate">
                        End date:
                    </label>
                    <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    autoComplete="off"
                    value={formValue.endDate}
                    onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    <label htmlFor="amount">
                        Amount:
                    </label>
                    <input
                    type="text"
                    id="amount"
                    name="amount"
                    autoComplete="off"
                    value={formValue.amount}
                    onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    <label htmlFor="description">
                        Description:
                    </label>
                    <input
                    type="text"
                    id="description"
                    name="description"
                    autoComplete="off"
                    value={formValue.description}
                    onChange={handleChange}
                    />
                    <br/>
                    <br/>            
                    <label htmlFor="friend">
                        Friend:
                    </label>
                    <input
                    type="friend"
                    id="friend"
                    name="friend"
                    autoComplete="off"
                    value={formValue.friend}
                    onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    <button className="button-nav buttons" type="submit" >
                        Create Agreement
                    </button>
                    <button className="button-nav buttons" onClick={
                        () => {history.push("/agreement");}
                    }> 
                        Cancel
                    </button>
                    <br/>
                    <br/>
                </form>    
            </div>
        </div>
    );
};