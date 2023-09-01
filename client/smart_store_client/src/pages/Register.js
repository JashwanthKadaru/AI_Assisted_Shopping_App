import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../css/Register.css';
import axios from 'axios';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
    const [isRegister, setIsRegister] = useState('');
    const [newRegister, setNewRegister] = useState('');

    const onSubmit = () => {
        setIsRegister('');
        setNewRegister('');

        axios.post('http://localhost:5123/smartfashionstore/register/', {username:username, email:email, password:password, picture:picture, fullname:fullName})
        .then(response => {
            if(response.data.success){
                setNewRegister('true')
            }else if(response.data.alreadyExists) {
                setIsRegister('true');
            }
        })
        .catch(error => {
            console.error('Error fetching data' + error);
        });

        setFullName(''); setUsername(''); setEmail(''); setPassword(''); setPicture('');
    }

    return (
        <div className="register">
            <form >
                <h1> Register </h1>

                <div className="register-form-field">
                    <label> Full Name :</label>
                    <input type='text' value={fullName} onChange={(e)=>{setFullName(e.target.value)}}/>
                </div>

                <div className="register-form-field">
                    <label> Username :</label>
                    <input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>

                <div className="register-form-field">
                    <label> Email :</label>
                    <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <div className="register-form-field">
                    <label> Password :</label>
                    <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <div className="register-form-field">
                    <input type="file" max={1} value={picture} onChange={(e) => {setPicture(e.target.value); console.log(e.target.value)}}/>
                </div>

                <button type="submit" onClick={(e) => {onSubmit();}}> Submit </button>

                {isRegister && <p style={{color: "red", width: "fit-content", maxWidth: "75%", margin: "0px auto", fontFamily: "Poppins", fontSize:"0.75rem"}}> This user has already registered.</p>}
                {newRegister && <p style={{color: "green", width: "fit-content", maxWidth: "75%", margin: "0px auto", fontFamily: "Poppins", fontSize:"0.75rem"}}> The user has been registered.</p>}
            </form>

            <NavLink to='/login'> Already registered? Redirect to Login Page.</NavLink>
        </div>
    )
}

export default Register;