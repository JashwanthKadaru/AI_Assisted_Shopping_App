import { useOutletContext } from 'react-router-dom';
import '../css/Purchases.css'
import PurchaseCard from '../components/PurchaseCard';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Purchases = () => {
    const {purchasesList, setPurchasesList, globalUsername, isLogged} = useOutletContext();

    const listItem = {
        name: '',
        goods:[{},{},{},{},{},{}],
    };

    const navigate = useNavigate();
    useEffect(() => {
        if(!isLogged) {
            navigate('/login');
        }
    axios.post('/smartfashionstore/purchases', {globalUsername})
      .then(response => {
        setPurchasesList(response.data.purchasesList);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, []);

    return (
        <div className='purchases'>
            <h1> Your Past Purchases On Smart Store</h1>
            
            <div className='purchases-display'>
                {(purchasesList && false)?purchasesList.map((item, index) => {
                    return (
                        <PurchaseCard listItem={listItem} key=  {index}/>
                    )
                }):<p style={{fontFamily: 'Poppins', color:'#e89cf8de', width: "fit-content", margin: "15px auto", fontSize:'1rem'}}> You have made no purchases till now.</p>}
            </div>
        </div>
    )
}

export default Purchases;