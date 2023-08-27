import { useOutletContext } from 'react-router-dom';
import '../css/Purchases.css'
import PurchaseCard from '../components/PurchaseCard';

const Purchases = () => {
    const {purchasesList, setPurchasesList} = useOutletContext();

    const listItem = {
        name: '',
        goods:[{},{},{},{},{},{}],
    };

    return (
        <div className='purchases'>
            <h1> Your Past Purchases On Smart Store</h1>
            
            {purchasesList.map((item, index) => {
                return (
                    <PurchaseCard listItem={listItem} key={index}/>
                )
            })}
        </div>
    )
}

export default Purchases;