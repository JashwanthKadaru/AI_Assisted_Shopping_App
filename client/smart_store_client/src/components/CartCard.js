import '../css/CartCard.css'
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa' 
import { useState } from 'react';
const CartCard = ({item, setCartList, isLogged, globalUsername, productList, setProductList}) => {
    const [number, setNumber] = useState(0);

    const addProductToCart = () => {
        currentItem = item;
        axios.post('/smartfashionstore/addToCart', {globalUsername, cartList, item, qty})
        .then(response => {
            if(response.data.success){
                setNumber(number+1);
                
                let newCartList = cartList.map((item) => {
                    if(item.id !== currentItem.id) return item;
                    else {
                        item.qty-=1;
                        return item;
                    }
                })
                let newProductList = productList.map((item) => {
                    if(item.id !== currentItem.id) return item;
                    else {
                        item.qty-=1;
                        return item;
                    }
                })

                setCartList(newCartList);
                setProductList(newProductList);

            }else if(response.data.alreadyExist) {
                setIsRegister('true');
            }
        }).catch(error => {
                console.error('In product page ', error);
        })

        const removeProductFromCart = () => {
            if(number<=0) return;
            axios.post('/smartfashionstore/removeFromCart', {globalUsername, cartList, currentProduct, qty})
            .then(response => {
                if(response.data.success){
                    setNumber(number-1);
                    
                    let newCartList = cartList.map((item) => {
                        if(item.id !== currentProduct.id) return item;
                        else {
                            item.qty+=1;
                            return item;
                        }
                    })
                    let newProductList = productList.map((item) => {
                        if(item.id !== currentProduct.id) return item;
                        else {
                            item.qty+=1;
                            return item;
                        }
                    })

                    setCartList(newCartList);
                    setProductList(newProductList);
                    
                }else if(response.data.alreadyExist) {
                    setIsRegister('true');
                }
            }).catch(error => {
                console.error('In product page ', error);
            })
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
                <h6> Product Name</h6>
                <p className="cart-price-info"> Price : {6.66 + ' $'}</p>
                
                <div className='cart-actions'>
                    <div className='cart-qty-bar'> 
                        <button className='red' onClick={() => {if(number>0) setNumber(number-1);}}><FaMinus color='red'/></button> <span>{number}</span>  
                        <button className='green' onClick={() => {setNumber(number+1)}}><FaPlus color='green'/></button>
                    </div>

                    <div className='cart-remove-btn'>
                        <FaTrashAlt color='red' className='remove-btn'/>
                        <span className='rm-tooltip'> remove </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard;