import '../css/Cart.css' 
import CartCard from '../components/CartCard'
import { useOutletContext } from 'react-router-dom'
const Cart = () => {
    const {cartList} = useOutletContext();
    return (
        <div className='cart'>
            <h1> Items in your cart. Have a look before you proceed. </h1>

            <div className="cart-section-display">
                <div className="cart-grid-layout">
                    {
                        cartList.map((item) => {
                            return ( 
                                <CartCard item={item}/>
                            )
                        })
                    }
                </div>
            </div>

            <button className='cart-purchase-button'>
                Purchase
            </button>
        </div>
    )
}

export default Cart;