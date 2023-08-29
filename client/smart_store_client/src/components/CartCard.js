import '../css/CartCard.css'
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa' 
import { useState } from 'react';
import axios from 'axios'

const CartCard = ({item, cartList, setCartList, isLogged, globalUsername, productList, setProductList}) => {

    // state to set and update the quantity of cart item on UI.
    const [number, setNumber] = useState(0);
    const [tooLess, setTooLess] = useState('');
    const [tooMany, setTooMany] = useState('');
    // Logic for adding product to cart

    const removeCartCard = () => {
        let tempList = cartList;
        let newCartList = tempList.filter((cartitem) => {
            if(cartitem.ID === item.ID) return false;
            return true;
        })
        
        setCartList(newCartList);
    }

    const addProductToCart = async () => {
        try {
            let currentItem = item;

            let newCartList = cartList.map((cartitem) => {
                if (cartitem.ID === currentItem.ID) {
                    let tempList = productList;

                    for (let prod of tempList) {
                        if (prod.productID === currentItem.ID) {
                            if (prod.productQty > 0) {
                                break;
                            } else {
                                return tooMany("Out of stock.");
                            }
                        }
                    }

                    setProductList(tempList);
                    let newitem = { ...cartitem };
                    newitem.qty = number + 1;
                    return newitem;
                }

                return {...cartitem};
            });

            let response = await axios.patch('http://localhost:5123/smartfashionstore/cart/user', {
                globalUsername,
                newCartList,
            });
            if (response.data.success) {
                setNumber(number + 1);
                let newCartList = response.data.newCart;

                let newProductList = productList.map((item) => {
                    if (item.productID !== currentItem.ID) return {...item};
                    else {
                        let newitem = { ...item };
                        newitem.productQty -= 1;
                        return newitem;
                    }
                });

                let response2 = await axios.patch('http://localhost:5123/smartfashionstore/products/push', {
                    newProductList,
                });
                if (response2.data.success) {
                    console.log('Successfully updated cart.');
                    setCartList(newCartList);
                    setProductList(newProductList);
                } else {
                    throw new Error('Failed to update cart. CartCard.js');
                }
            } else {
                throw new Error('Failed to update cart. CartCard.js');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeProductFromCart = async () => {
        try {
            let currentItem = item;

            let tempCartList = cartList.map((cartitem) => {
                if (cartitem.ID === currentItem.ID) {
                    let newitem = { ...cartitem };
                    newitem.qty = number - 1;
                    return newitem;
                }

                return {...cartitem};
            });

            let newCartList = tempCartList.filter((item) => {
                return item.qty > 0;
            });

            let response = await axios.patch('http://localhost:5123/smartfashionstore/cart/user', {
                globalUsername,
                newCartList,
            });
            if (response.data.success) {
                setNumber(number - 1);
                let newCartList = response.data.newCart;

                let newProductList = productList.map((item) => {
                    if (item.productID !== currentItem.ID) return {...item};
                    else {
                        let newitem = { ...item };
                        newitem.productQty += 1;
                        return newitem;
                    }
                });

                let response2 = await axios.patch('http://localhost:5123/smartfashionstore/products/push', {
                    newProductList,
                });
                if (response2.data.success) {
                    console.log('Successfully updated cart.');
                    setCartList(newCartList);
                    setProductList(newProductList);
                } else {
                    throw new Error('Failed to update cart. CartCard.js');
                }
            } else {
                throw new Error('Failed to update cart. CartCard.js');
            }
        } catch (error) {
            console.error(error);
        }
    };

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