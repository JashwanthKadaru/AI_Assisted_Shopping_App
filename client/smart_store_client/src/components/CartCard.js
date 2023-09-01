import '../css/CartCard.css'
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa' 
import { useState } from 'react';
import axios from 'axios'

const CartCard = ({item, cartList, setCartList, isLogged, globalUsername, productList, setProductList}) => {

    // state to set and update the quantity of cart item on UI.
    const [number, setNumber] = useState(item.cartQty);
    const [tooLess, setTooLess] = useState('');
    const [tooMany, setTooMany] = useState('');
    const [buymessage, setBuyMessage] = useState('');
    
    // Logic for adding product to cart
    const removeCartCard = () => {
        let tempList = cartList;
        // let newCartList = tempList.filter((cartitem) => {
        //     if(cartitem.productID === item.productID) return false;
        //     return true;
        // })

        const removeCard = async () => {
            try{
                let response = await axios.patch(`http://localhost:5123/smartfashionstore/cart/user/${globalUsername}/update`, {op: 'remove', itemID:item.productID, qty: 1});
                
                console.log(response);
                if(response.data.success) {
                    console.log("removed product from cart.");
                    setCartList(response.data.new_cart);
                } else {
                    setBuyMessage(response.data.error);
                }
            } catch(error) {
                console.error("Something went wrong.", error);
                setBuyMessage("Error adding to cart. Try again");
            }
        }

        removeCard();
    }

    const addProductToCart = async () => {
        try{
            let response = await axios.patch(`http://localhost:5123/smartfashionstore/cart/user/${globalUsername}/update`, {op: 'add', itemID:item.productID, qty: 1});
            
            if(response.data.success) {
                setCartList(response.data.new_cart);
                setNumber(number+1);
            } else {
                setBuyMessage(response.data.error);
            }
        } catch(error) {
            console.error("Something went wrong.", error);
            setBuyMessage("Error adding to cart. Try again");
        }
    }

    const removeProductFromCart = async () => { 
        try{
            let response;
            if(number>1) {
                response = await axios.patch(`http://localhost:5123/smartfashionstore/cart/user/${globalUsername}/update`, {op: 'reduce', itemID:item.productID, qty: 1});
            } else {
                response = await axios.patch(`http://localhost:5123/smartfashionstore/cart/user/${globalUsername}/update`, {op: 'remove', itemID:item.productID, qty: 1});
            }

            if(response.data.success) {
                setCartList(response.data.new_cart);
                setNumber(number-1);
            } else {
                setBuyMessage(response.data.error);
            }
        } catch(error) {
            console.error("Something went wrong.", error);
            setBuyMessage("Error removing from cart. Try again");
        }
    }

    return (
        <div className='cart-card'>
            <div className="cart-card-head"> 
                <div className="cart-image">
                    <img src='./shoe1.jpg'/>
                </div>
            </div>

            <div className="cart-card-body">
                <h6> {item.name} </h6>
                <p className="cart-price-info"> Price : {item.price + ' $'}</p>
                
                <div className='cart-actions'>
                    <div className='cart-qty-bar'> 
                        <button className='red' onClick={() => {if(number>0) removeProductFromCart();}}><FaMinus color='red'/></button> <span>{number}</span>  
                        <button className='green' onClick={() => {addProductToCart();}}><FaPlus color='green'/></button>
                    </div>

                    <div className='cart-remove-btn'>
                        <FaTrashAlt color='red' className='remove-btn' onClick={(e) => {removeCartCard()}}/>
                        <span className='rm-tooltip' onClick={(e) => {removeCartCard()}}> remove </span>
                    </div>
                </div>
                {tooMany && <p style={{color:'red', fontSize:'12'}}> {tooMany} </p>}
            </div>
        </div>
    )
}

export default CartCard;