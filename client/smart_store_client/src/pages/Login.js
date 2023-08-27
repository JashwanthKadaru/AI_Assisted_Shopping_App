import { useState } from "react";
import '../css/Login.css'
import { NavLink, useOutletContext } from "react-router-dom";
const Login = () => {
    const { isLogged ,setIsLogegd, isVerfied, setIsVerified } = useOutletContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="login">
            <form>
                <h1> Sign In </h1>
                <div className="form-field">
                    <label > username: </label>
                    <input type="text" placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                </div>

                <div className="form-field">
                    <label > password: </label>
                    <input type="password" placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <button type="submit" onClick={() => {onsubmit()}}> Submit </button>
            </form>

            <NavLink to='/register'> Register Now </NavLink>
        </div>
    )
} 

export default Login;