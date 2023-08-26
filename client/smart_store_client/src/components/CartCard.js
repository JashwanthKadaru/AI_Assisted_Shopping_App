import '../css/CartCard.css'
import { FaPlus, FaMinus } from 'react-icons/fa' 
import { useState } from 'react';
const CartCard = () => {
    const [number, setNumber] = useState(0);
    return (
        <div className='cart-card'>
            <div className="cart-card-head"> 
                <div className="cart-image">
                    <img src='./shoe1.jpg'/>
                </div>
            </div>

            <div className="cart-card-body">
                <h6> Product Name</h6>
                <p className="cart-price-info"> Price : {6.66 + ' $'}</p>
                <div className='cart-qty-bar'> 
                <button className='red' onClick={() => {if(number>0) setNumber(number-1);}}><FaMinus color='red'/></button> {number}  
                <button className='green' onClick={() => {setNumber(number+1)}}><FaPlus color='green'/></button></div>
            </div>
        </div>
    )
}

export default CartCard;