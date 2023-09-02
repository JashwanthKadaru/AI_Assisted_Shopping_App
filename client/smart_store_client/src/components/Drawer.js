import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import '../css/Drawer.css'
const Drawer = ({ isLogged ,setIsLogged, isVerfied, setIsVerified, profilePicturePath, globalUsername }) => {
    const navigate = useNavigate();

    const handleLogout = (event) => {
       event.preventDefault();
       
       setIsLogged(false); setIsVerified(false);

       navigate('/login');
    }

    // console.log(`Path1: http://localhost:5123/static/${profilePicturePath}`);
    return (
        <div className="app-drawer">
            <div className='navbar'>
                <div className='brand-div'>
                    <div className='brand-name'>
                        <h1> Smart </h1>
                        <span> Fashion </span> 
                        <h1> Store </h1>
                    </div>

                    <div className='brand-tag'>
                        <h3> Fashion. </h3>
                        <h3> made. </h3>
                        <span> Smarter. </span>
                    </div>
                </div>

                <div className='user-div'>
                    <div className='profile-pic'> 
                        {   
                            profilePicturePath &&
                            <img src={`http://localhost:5123/static/${profilePicturePath}`}/>
                        }    
                    </div>
                    <div className='user-details'>
                        <h4> {globalUsername} </h4>
                        <h6> #0001102FA137 </h6>
                    </div>
                </div>

                <header>
                    <nav>
                        {(isLogged)?<NavLink className='link' to={'/shop'}> Home </NavLink>:null}
                        {(isLogged)?<NavLink className='link' to={'/purchases'}> Purchases </NavLink>:null}
                        {(isLogged)?<NavLink className='link' to={'/cart'}> Cart </NavLink>:null}
                        {(isLogged)?<a className='link' onClick={(e)=>{handleLogout(e)}}> Sign Out </a>:null}
                        {(!isLogged)?<NavLink className='link' to={'/login'}> Login </NavLink>:null}
                    </nav>
                </header>
            </div>

            <footer>
                <p> Made with &hearts; by Jashwanth Kadaru</p>
            </footer>
        </div>
    )
}

export default Drawer;