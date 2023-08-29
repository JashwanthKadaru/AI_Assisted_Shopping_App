import { useOutletContext, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Product.css'

const Product = () => {
    const {cartList, setCartList, productList, setProductList, currentProduct, setCurrentProduct, isLogged, globalUsername} = useOutletContext();
    const [buymessage, setBuyMessage] = useState('');

    let Qty=0;
    for(let item of cartList){
        if(item.ID===productList.productID){
            Qty = item.qty;
        }
    }

    const [number,setNumber] = useState(Qty);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!isLogged) {
            navigate('/login')
        }
    }, [])


const addProductToCart = async () => {
    try{
        if(currentProduct.productQty<=0) return;
        let iscartupdated = false;
        let tempList = cartList;
        let newCurrentProduct;
        for(let item of tempList){
            if(currentProduct.productID===item.ID) {
                item.qty++;
                iscartupdated=true;
            }
        }

        if(!iscartupdated && currentProduct.productQty>=1) {
            tempList.push({ID: currentProduct.productID, qty: 1, name: currentProduct.productName, price: currentProduct.productPrice});
            newCurrentProduct = currentProduct;
            newCurrentProduct.productQty-=1;
        }

        let newProductList = productList;
        for(let prod of newProductList) {
            if(prod.productID===currentProduct.productID) {
                prod.productQty-=1;
            }
        }

        let response = await axios.patch('http://localhost:5123/smartfashionstore/cart/user', {
                globalUsername,
                tempList,
            });
        
        
        if (response.data.success) {
            setNumber(number - 1);
            let newCartList = response.data.newCart;

            let response2 = await axios.patch('http://localhost:5123/smartfashionstore/products/push', {
                newProductList,
            });
            if (response2.data.success) {
                console.log('Successfully updated cart.');
                setCartList(newCartList);
                setProductList(newProductList);
                setCurrentProduct(newCurrentProduct);
            } else {
                throw new Error('Failed to update cart. CartCard.js');
            }
        } else {
            throw new Error('Failed to update cart. CartCard.js');
        }
    } catch(error) {
        console.error(error);
    }
}

const removeProductFromCart = async () => {
    try{
        let iscartupdated = false;
        let tempList = cartList;
        let newCurrentProduct;
        for(let item of tempList){
            if(currentProduct.productID===item.ID) {
                item.qty--;
                iscartupdated=true;
            }
        }

        tempList = tempList.filter((item) => {return item.qty!==0})

        if(!iscartupdated) {
            return;
        }

        newCurrentProduct = currentProduct;
        newCurrentProduct.productQty += 1; 

        let newProductList = productList;
        for(let prod of newProductList) {
            if(prod.productID===currentProduct.productID) {
                prod.productQty+=1;
            }
        }

        let response = await axios.patch('http://localhost:5123/smartfashionstore/cart/user', {
                globalUsername,
                tempList,
            });
        
        
        if (response.data.success) {
            setNumber(number - 1);
            let newCartList = response.data.newCart;

            let response2 = await axios.patch('http://localhost:5123/smartfashionstore/products/push', {
                newProductList,
            });
            if (response2.data.success) {
                console.log('Successfully updated cart.');
                setCartList(newCartList);
                setProductList(newProductList);
                setCurrentProduct(newCurrentProduct);
            } else {
                throw new Error('Failed to update cart. CartCard.js');
            }
        } else {
            throw new Error('Failed to update cart. CartCard.js');
        }
    } catch(error) {
        console.error(error);
    }        
};


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

                            <button className="BuyNow" onClick={(e) => {navigate('/cart')}}>
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