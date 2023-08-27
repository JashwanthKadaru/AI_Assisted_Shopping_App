import { useState } from "react";
import '../css/Login.css'
import { NavLink, Navigate, useNavigate, useOutletContext } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const { isLogged ,setIsLogged, isVerfied, setIsVerified, setGlobalUsername } = useOutletContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        axios.post('/smartfashionstore/login', {username, password}).then(response => {
            if(response.data.success || true) {
                setIsLogged(true);
                setIsVerified(true);
                setGlobalUsername(username);
                navigate('/shop');
            } else {
                setErrorMessage('Invalid username or password.');
            }
        })
        .catch(error => {
            console.error('Error during login: ', error);
            setErrorMessage('An error occurred during login');
        })
        setIsLogged(true);
        setIsVerified(true);
        navigate('/shop');
    }

    return (
        <div className="login">
            <form onSubmit={(e) => {handleLogin(e)}}>
                <h1> Sign In </h1>
                <div className="form-field">
                    <label > username: </label>
                    <input type="text" placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}} required/>
                </div>

                <div className="form-field">
                    <label > password: </label>
                    <input type="password" placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                </div>

                <button type="submit"> Submit </button>
                {errorMessage && <p style={{color: "red", width: "fit-content", maxWidth: "75%", margin: "0px auto", fontFamily: "Poppins", fontSize:"0.75rem"}}> {errorMessage} </p>}
            </form>

            <NavLink to='/register'> Register Now </NavLink>
        </div>
    )
} 

export default Login;