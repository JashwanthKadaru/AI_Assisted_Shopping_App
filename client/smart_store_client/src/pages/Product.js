import { useOutletContext, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Product.css'

const Product = () => {
    const {cartList, setCartList, productList, setProductList, currentProduct, setCurrentProduct, isLogged} = useOutletContext();
    const [buymessage, setBuyMessage] = useState('');
    const [number,setNumber] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!isLogged) {
            navigate('/login')
        }
    }, [])

    const addProductToCart = () => {
        axios.post('/smartfashionstore/addToCart', {globalUsername, cartList, currentProduct, qty})
        .then(response => {
            if(response.data.success){
                setNumber(number+1);
                if((number + 1)===1) setBuyMessage('Added '+ (number + 1) +' item to cart.')
                else setBuyMessage('Added '+ (number + 1) +' items to cart.')
                let newCartList = cartList.map((item) => {
                    if(item.id !== currentProduct.id) return item;
                    else {
                        item.qty-=1;
                        return item;
                    }
                })
                let newProductList = productList.map((item) => {
                    if(item.id !== currentProduct.id) return item;
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
        })

        const removeProductFromCart = () => {
            if(number<=0) return;
            axios.post('/smartfashionstore/removeFromCart', {globalUsername, cartList, currentProduct, qty})
            .then(response => {
                if(response.data.success){
                    setNumber(number-1);
                    if((number - 1)===0) setBuyMessage('')
                    else setBuyMessage('Added '+ (number - 1) +' items to cart.')
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
        <div className="product">
            <div className="product-div">
                <div className="product-img">
                    <img src="/shoe1.jpg"/>
                </div>

                <div className="product-body">
                    <div className='product-main'>
                        <div className='product-details'>
                            <h1> Product Name </h1>
                            <h2> Price: 9.99$</h2>
                            <h2> All sizes </h2>
                            <h2>Stock: {"avialable"} {`${23} pieces`}</h2>
                        </div>
                        <div className='product-actions-div'>
                            <div className="actions">
                                <div className="product-actions">
                                    <button><FaMinus color={"red"} onClick={(e) => {removeProductFromCart()}}/></button>
                                        {number}
                                    <button><FaPlus color={"green"} onClick={(e) => {addProductToCart()}}/></button>
                                </div>

                                { buymessage && <p> {buymessage} </p>}
                            </div>

                            <button className="BuyNow" onClick={(e) => {let navigate = useNavigate(); navigate('/cart')}}>
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div className="description">
                        <h3> Brand Name: <span>Bata</span> </h3>
                        <h4> Description: </h4>
                        <p> 
                            Timeless black leather oxford with a polished finish.
                            Best Suited for: Formal Events, Business Meetings
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product;