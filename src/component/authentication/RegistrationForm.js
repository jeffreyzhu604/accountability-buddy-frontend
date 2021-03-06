/*
    Sources:
    - https://surajsharma.net/blog/axios-post-form-data
*/
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const RegistrationForm = () => {

    const history = useHistory();

    const [formValue, setFormValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profileMessage: "",
        username: ""
    });

    // Update local state of each form element
    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    }

    /*
    NOTE: Express server hosted on: https://arcane-falls-63724.herokuapp.com/. For local development,
    please use localhost on port 4000 (http://localhost:4000).
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const registrationInfo = await axios.post("https://arcane-falls-63724.herokuapp.com/register", formValue);
        setFormValue({
            ...formValue,  
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            profileMessage: "",
            username: ""
        });
        // After registration, redirect to login page
        history.push("/login");
    }

    return (
        <form onSubmit={handleSubmit}>
            <br/>
            <br/>
            <label htmlFor="firstName">
                First Name:
            </label>
            <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="off"
            value={formValue.firstName}
            onChange={handleChange}
            />
                        <br/>
            <br/>
            <label htmlFor="lastName">
                Last Name:
            </label>
            <input
            type="text"
            id="lastName"
            name="lastName"
            autoComplete="off"
            value={formValue.lastName}
            onChange={handleChange}
            />
            <br/>
            <br/>
            <label htmlFor="username">
                Username:
            </label>
            <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            value={formValue.username}
            onChange={handleChange}
            />
            <br/>
            <br/>
            <label htmlFor="email">
                Email:
            </label>
            <input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            value={formValue.email}
            onChange={handleChange}
            />
            <br/>
            <br/>            
            <label htmlFor="password">
                Password:
            </label>
            <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={formValue.password}
            onChange={handleChange}
            />
            <br/>
            <br/>
            <label htmlFor="profileMessage">
                Profile Message:
            </label>
            <input
            type="profileMessage"
            id="profileMessage"
            name="profileMessage"
            autoComplete="off"
            value={formValue.profileMessage}
            onChange={handleChange}
            />
            <br/>
            <br/>
            <button className="button-nav buttons" type="submit" >
                Register
            </button>
            <button className="button-nav buttons" onClick={
                () => {history.push("/login");}
            }> 
                Go back
            </button>
            <br/>
            <br/>
        </form>
    );
};