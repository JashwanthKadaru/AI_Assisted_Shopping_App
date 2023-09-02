import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../css/Register.css';
import axios from 'axios';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState();
    const [isRegister, setIsRegister] = useState('');
    const [newRegister, setNewRegister] = useState('');

    const onSubmit = () => {
    
        const onsubmitHelper = async () => {
            try{
                setIsRegister('');
                setNewRegister('');

                const formData = new FormData();
                formData.append('username', username);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('fullname', fullName);
                formData.append('picture', picture);

                let response = await axios.post('http://localhost:5123/smartfashionstore/register/', formData);
                
                if(response) {
                    if(response.data.success){
                        setNewRegister('true')
                    }else if(response.data.alreadyExists) {
                        setIsRegister('true');
                    }

                    console.log("Response:",response);
                } else {
                    console.log("Response:",response);
                }
            } catch(error) {
                console.error('Error fetching data' + error);
            };

            setFullName(''); setUsername(''); setEmail(''); setPassword(''); setPicture('');
        }

        // call to async function.
        onsubmitHelper();
    }
    
    return (
        <div className="register">
            <form encType="multipart/form-data">
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
                    <input type="file" max={1} accept='image/*' onChange={(e) => {setPicture(e.target.files[0]); console.log(e.target.value)}}/>
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