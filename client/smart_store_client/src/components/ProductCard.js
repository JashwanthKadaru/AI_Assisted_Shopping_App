import './../css/ProductCard.css'

const ProductCard = ({item}) => {
    return (
        <div className="product-card">
           <div className="product-card-head"> 
                <div className="product-image">
                    <img src='./shoe1.jpg'/>
                </div>
            </div>

            <div className="product-card-body">
                <h6> Product Name</h6>
                <p className="price-info"> Price : {6.66 + ' $'}</p>
                <p className="stock-info"> available </p>
            </div>
        </div>
    )
}

export default ProductCard;