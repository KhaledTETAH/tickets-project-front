import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, USER_INFO_URL } from "../Utils/ConfigApi";
import './Login.css';
import Alert from 'react-bootstrap/Alert';


const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState();
    const navigate = useNavigate();


    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const loginEntity = { username, password };

        try {
            const response = await axios.post(LOGIN_URL, loginEntity);
            
            const userResponse = await axios.get(USER_INFO_URL + username);

            localStorage.setItem('user', JSON.stringify(userResponse.data));
            navigate("/home/");
          } catch (error) {
            setLoginError(error.response.data.non_field_errors);
          };
        resetLoginForm();
    };


    const resetLoginForm = () => {
        setPassword('');
        setUsername('');
    };

    return (
        <div className="login-container-1">
            <div className="login-title-container">
                <h2>
                    LOGIN PAGE
                </h2>
            </div>
            
            <div className="login-container-2">
            {loginError && (
                <Alert key="danger" variant="danger" onClose={() => setLoginError(null)} dismissible>
                    {loginError}
                </Alert>
            )}
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                            required />
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