import { useOutletContext } from 'react-router-dom';
import '../css/Purchases.css'
import PurchaseCard from '../components/PurchaseCard';

const Purchases = () => {
    const {purchasesList} = useOutletContext();

    const listItem = {
        name: '',
        goods:[{},{},{},{},{},{}],
    };
    return (
        <div className='purchases'>
            <h1> Your Past Purchases On Smart Store</h1>
            {purchasesList.map(() => {
                return (
                    <PurchaseCard listItem={listItem}/>
                )
            })}
        </div>
    )
}

export default Purchases;