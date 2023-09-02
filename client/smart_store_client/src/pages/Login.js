import { useState } from "react";
import '../css/Login.css'
import { NavLink, Navigate, useNavigate, useOutletContext } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const { isLogged ,setIsLogged, isVerfied, setIsVerified, setGlobalUsername, profilePicturePath, setProfilePicturePath } = useOutletContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        
        const Verify = async () => {
            try{
                let response = await axios.post('http://localhost:5123/smartfashionstore/login', {username: username, password: password});
            
                if(response) {
                    if(response.data.success) {
                        setGlobalUsername(username);
                        console.log("setProfilePicturePath:", setProfilePicturePath);
                        setProfilePicturePath(response.data.profilePicturePath);
                        setIsLogged(true);
                        setIsVerified(true);
                        async function fetchUserCart() {
                            try{
                                const response = await axios.get(`http://localhost:5123/smartfashionstore/cart/user/${username}`);
                                const responseData = response.data;

                                if(responseData.success) {
                                    const cart = responseData.cart;
                                    console.log(cart);  
                                } 
                                else {
                                    console.error('Something went wrong. Cart is not loading.');
                                    throw Error(`Something went wrong. Cart is not loading.`);
                                }
                            } catch (error) {
                                console.error('Error fetching data:', error);
                                throw Error(`Error fetching data:${error}`);
                            }
                        }

                        fetchUserCart();
                        navigate('/shop');
                        console.log("Navigated to shop");
                    } else {
                        setErrorMessage('Invalid username or password.');
                        console.log("Navigated to shop");
                    }
                }
            } catch(error) {
                console.error('Error during login: ', error);
                setErrorMessage('An error occurred during login');
            }
        }

        Verify();
    }

    return (
        <div className="login">
            <form onSubmit={(e) => { handleLogin(e); }}>
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