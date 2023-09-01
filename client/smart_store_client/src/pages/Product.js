import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Product.css'

const Product = () => {
    const {cartList, setCartList, productList, setProductList, isLogged, globalUsername} = useOutletContext();
    const [buymessage, setBuyMessage] = useState('');
    const [currentProduct, setCurrentProduct] = useState({});
    
    console.log("cartList:",cartList);
    // setting number state to appropriate value
    let Qty=0;
    for(let item of cartList){
        if(item.ID===productList.productID){
            Qty = item.cartQty;
        }
    }

    // console logging to check;
    console.log("Qty:",Qty);

    const [number,setNumber] = useState(Qty);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!isLogged) {
            navigate('/login')
        }

        setCurrentProduct(location.state.item);
        console.log("location.state.item value print:",location.state.item);
    }, []);

    const addProductToCart = async () => {
        try{
            let response = await axios.patch(`http://localhost:5123/smartfashionstore/cart/user/${globalUsername}/update`, {op: 'add', itemID:currentProduct.productID, qty: 1});
            console.log("This is check point 2.");

            if(response.data.success) {
                console.log("This is check point 3.");
                setCartList(response.data.new_cart);
                setNumber(number+1);
            } else {
                console.log("This is check point 4.");
                setBuyMessage(response.data.error);
            }
        } catch(error) {
            console.log("This is check point 5.");
            console.error("Something went wrong.", error);
            setBuyMessage("Error adding to cart. Try again");
        }
    }

    const removeProductFromCart = async () => { 
        try{
            let response;
            if(number>1) {
                response = await axios.patch(`http://localhost:5123/smartfashionstore/cart/user/${globalUsername}/update`, {op: 'reduce', itemID:currentProduct.productID, qty: 1});
            } else {
                response = await axios.patch(`http://localhost:5123/smartfashionstore/cart/user/${globalUsername}/update`, {op: 'remove', itemID:currentProduct.productID, qty: 1});
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
        <div className="product">
            <div className="product-div">
                <div className="product-img">
                    <img src="/shoe1.jpg"/>
                </div>

                <div className="product-body">
                    <div className='product-main'>
                        <div className='product-details'>
                            <h1> {currentProduct.productName} </h1>
                            <h2> Price: {currentProduct.productPrice + " "}$</h2>
                            <h2> All sizes </h2>
                            <h2>Stock: {"avialable"} {`${currentProduct.productQty} pieces`}</h2>
                        </div>
                        <div className='product-actions-div'>
                            <div className="actions">
                                <div className="product-actions">
                                    <button onClick={(e) => {
                                        if(number>0)
                                        removeProductFromCart();
                                    }}><FaMinus color={"red"}/></button>
                                        {number}
                                    <button onClick={(e) => {
                                        addProductToCart();
                                        console.log("This is check point 1. global username: ", globalUsername);
                                    }}><FaPlus color={"green"}/></button>
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
                            {/* Timeless black leather oxford with a polished finish.
                            Best Suited for: Formal Events, Business Meetings */}
                            {currentProduct.productShortDescription}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product;