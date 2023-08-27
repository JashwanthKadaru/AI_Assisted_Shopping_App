import '../css/Product.css'

const Product = () => {
    return (
        <div className="product">
            <div className="product-div">
                <div className="product-img">
                    <img src="/shoe1.jpg"/>
                </div>

                <div className="product-body">
                    <h1> Product Name </h1>
                    <h2> Price: 9.99$</h2>
                    <h2> Stock: {"avialable"} {`${23} pieces`}</h2>
                    <div className="description">
                        <h3> Brand Name: Bata </h3>
                        <h4>Description: </h4>
                        <p> Timeless black leather oxford with a polished finish.
                            Best Suited for: Formal Events, Business Meetings
                        </p>
                    </div>

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
        </div>
    )
}

export default Product;