import { useOutletContext, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import '../css/Product.css'

const Product = () => {
    const {cartList, setCartList, currentProduct, setCurrentProduct, isLogged} = useOutletContext();
    const [buymessage, setBuyMessage] = useState('');
    const [number,setNumber] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLogged) {
            navigate('/login')
        }
    }, [])
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
                                    <button><FaMinus color={"red"}/></button>
                                        {number}
                                    <button><FaPlus color={"green"}/></button>
                                </div>

                                { buymessage && <p> {buymessage} </p>}
                            </div>

                            <button className="BuyNow">
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