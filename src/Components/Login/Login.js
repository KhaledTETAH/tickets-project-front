import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const LOGIN_URL = `http://localhost:8000/dj-rest-auth/login/`;
const USER_INFO_URL = `http://localhost:8000/tickets_app/v1/users/username/`;

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLoginSubmit = (event) => {
        event.preventDefault();
        console.log(username, password);
        const loginEntity = {username, password};

        fetchLogin(loginEntity);
        fetchUserInfo(username);
        resetLoginForm();

    }

    const fetchLogin = async (entity) => {
        const response = await axios.post(LOGIN_URL, entity)
        .catch((error) => {
            console.log(error)
        })
        console.log(response);
        navigate("/home/");
    }

    const fetchUserInfo = async (username) => {
        const response = await axios.get(USER_INFO_URL+username)
        .catch((error) => {
            console.log(error);
        })
        console.log(response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    const resetLoginForm = () => {
        setPassword('');
        setUsername('');
    }

    return (
        <div className="login-container-1">
            <div className="login-container-2">
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control   type="text" 
                                        placeholder="Username" 
                                        value={username}
                                        onChange={(event) => {
                                            setUsername(event.target.value)
                                        }}
                                        required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control   type="password" 
                                        placeholder="Password" 
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }}
                                        required/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>

    )
};

export default Login; 