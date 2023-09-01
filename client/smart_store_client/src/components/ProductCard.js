import './../css/ProductCard.css'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react';
const ProductCard = ({item, key}) => {
    
    const {currentProduct, setCurrentProduct} = useOutletContext();
    const navigate = useNavigate();
    
    const navigateToProduct = (event) => {
        if(item){
            console.log("item:",item);
            console.log("setCurrentProduct", setCurrentProduct);
            setCurrentProduct(item);
            navigate('/product', {state: {item: item}});
        }
    }

    return (
        <div className="product-card" onClick={(e) => {navigateToProduct(e);}}>
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