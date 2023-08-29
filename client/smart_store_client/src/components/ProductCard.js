import './../css/ProductCard.css'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState } from 'react';
const ProductCard = ({item}) => {
    const {currentProduct, setCurrentProduct} = useOutletContext();
    const navigate = useNavigate();
    const navigateToProduct = (event) => {
        setCurrentProduct(item)
        navigate('/product')
    }

    return (

        <div className="product-card" onClick={(e) => {navigateToProduct(e)}}>
           <div className="product-card-head"> 
                <div className="product-image">
                    <img src='./shoe1.jpg'/>
                </div>
            </div>

            <div className="product-card-body">
                <h6> {item.productName} </h6>
                <p className="price-info"> {'Price : ' + item.productPrice + ' $'}</p>
                <p className="stock-info"> {(item.productPrice > 0)?"available":"Not Available"} </p>
            </div>
        </div>
    )
}

export default ProductCard;