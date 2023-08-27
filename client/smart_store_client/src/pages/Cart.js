import '../css/Cart.css' 
import CartCard from '../components/CartCard'
import { useOutletContext, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Cart = () => {
    const {cartList, setCartList, isLogged, globalUsername} = useOutletContext();

    const navigate = useNavigate();
    useEffect(() => {
        if(!isLogged) {
            navigate('/login');
        }
        axios.post('/smartfashionstore/cart', {globalUsername})
        .then(response => {
            setCartList(response.data.purchasesList);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div className='cart'>
            <h1> {(cartList)?"Items in your cart. Have a look before you proceed.":"There are currently no items in your cart. "} </h1>

            <div className="cart-section-display">
                {
                    (cartList) &&
                    <div className="cart-grid-layout">
                        {
                            cartList.map((item,index) => {
                                return ( 
                                    <CartCard item={item} key={index}/>
                                )
                            })
                        }
                    </div>
                }
            </div>

            {
                (cartList) &&    
                    <button className='cart-purchase-button'>
                        Purchase
                    </button>
            }
            
            {    (!cartList) &&    
                    <p style={{fontFamily: 'Poppins', color:'#e97dffde', width: "fit-content", margin: "15px auto", fontSize:'1rem'}}> There are 0 items in your cart. Hope you will find something useful.</p>
            }
        </div>
    )
}

export default Cart;