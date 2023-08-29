import { useOutletContext } from 'react-router-dom';
import '../css/Purchases.css'
import PurchaseCard from '../components/PurchaseCard';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Purchases = () => {
    // props imported from App.js through outlet context.
    const {purchasesList, setPurchasesList, globalUsername, isLogged} = useOutletContext();

    const navigate = useNavigate();

    // Runs everytime the component is re-rendered
    useEffect(() => {
        if(!isLogged) {
            navigate('/login');
        }

        async function fetchPurchases() {
            try{
                const response = await axios.post('http://localhost:5123/smartfashionstore/purchases/get', {globalUsername});
                const responseData = response.data;

                if (responseData.success) {
                    const purchaseList = responseData.purchaseList;
                    setPurchasesList(purchaseList);
                    console.log(purchaseList);
                } 
                else {
                    console.error('Fetching purchase list failed');
                    setPurchasesList([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchPurchases();
    }, []);

    return (
        <div className='purchases'>
            <h1> Your Past Purchases On Smart Store</h1>
            
            <div className='purchases-display'>
                {(purchasesList && purchasesList.length>0)?purchasesList.map((item, index) => {
                    return (
                        <PurchaseCard listItem={item} key=  {index}/>
                    )
                }):<p style={{fontFamily: 'Poppins', color:'#e89cf8de', width: "fit-content", margin: "15px auto", fontSize:'1rem'}}> You have made no purchases till now.</p>}
            </div>
        </div>
    )
}

export default Purchases;