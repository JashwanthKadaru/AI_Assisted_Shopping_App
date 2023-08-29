import { useNavigate, useOutletContext } from "react-router-dom";
import { BiSearch } from 'react-icons/bi'
import { FcAssistant } from 'react-icons/fc' 
import './../css/Home.css'
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    
    // getting state props from App router context. Props passed to Outlet in App.js can be imported here.
    const {searchText, setSearchText, productList, setProductList, assistText, setAssistText, isLogged, globalUsername} = useOutletContext();


    // Additional states that define state of the homepage.

    // To decide whether assistant box or search box should be displayed.
    const [ assistOn, setAssistOn ] = useState(false);
    
    // To decide which list of products will be displayed. There are 2 lists: product and display.
    //          one contains all product details fetched from server.
    // The other contains only few of the products displayed to user depending on filter. 
    const [ displayList, setDisplayList ] = useState([]);
    const navigate = useNavigate();


    // Everytime the component is loaded:
    useEffect(() => {
        //Check if is Logged else send back to login page.
        if(!isLogged) {
            navigate('/login');
        }

        async function fetchData() {
            try{
                const response = await axios.get('http://localhost:5123/smartfashionstore/products/list');
                const responseData = response.data;

                if (responseData.success) {
                    const productList = responseData.productList;
                    setProductList(productList);
                    console.log(productList);
                    setDisplayList(productList);
                } 
                else {
                    console.log('Fetching product list failed');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [])
    
    useEffect(() => {
        if(searchText==="") {
            setDisplayList(productList);
        } else {
            onSearch(productList, searchText);
        }
    }, [searchText]);

    const onSearch = (mydisplayList, searchword) => {
        if(searchword==="") {
            setDisplayList(productList);
        }
        // new display list
        let newDisplayList = mydisplayList.filter((item, index) => {
            searchword = searchword.toLowerCase();
            console.log(searchword);
            console.log(item.productName);
            console.log(item.productName.toLowerCase());
            
            if(item.productName.toLowerCase().includes(searchword)) return true;
            else return false;
        })

        // update display list.
        setDisplayList(newDisplayList);
    }


    const onAssistSearch = (mydisplayList, myAssistText) => {
        let newDisplayList = getGPTResponseForPrompt(mydisplayList, myAssistText);
        setDisplayList(newDisplayList);
    }

    const getGPTResponseForPrompt = (mydisplayList, myAssistText) => {
        if(myAssistText==='') return;
        
        axios.post('/smartfashionstore/GPTservice/', { globalUsername, productList, myAssistText})
        .then(response => {
            setDisplayList(response.data.productList);
        })
        .catch(error => {
            console.error('Error fetching data' + error);
        });
    }


    // implement filter buttons
    const filterBtn = (list,key) => {
        if(key==='All'){
            const newDisplayList = productList.filter((item)=>{
                return true;
            })
            setDisplayList(newDisplayList);
        } else if(key==='Shoes') {
            const newDisplayList = productList.filter((item)=>{
                return (item.productType==='Shoes');
            })
            setDisplayList(newDisplayList);
        } else if(key==='Clothes') {
            const newDisplayList = productList.filter((item)=>{
                return (item.productType==='Clothes');
            })
            setDisplayList(newDisplayList);
        }

        console.log(displayList);
    }    


    return (
        <div className="home">
            <div className="search-box">
                {
                    (assistOn)? <input type="text" placeholder="type prompt" value={assistText} onChange={(e) => setAssistText(e.target.value)}/> : <input type="search" placeholder="type search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                }
                
                <BiSearch className="search-icon" onClick={()=>{if(assistOn) {setAssistOn(false);} else {onSearch(productList, searchText);}}}/>
                <FcAssistant className="search-icon" onClick={() => {if(!assistOn) {setAssistOn(true);} else {onAssistSearch(productList, assistText);}}}/>
            </div>

            <div className="tags-div">
                    <button onClick={(e) => {filterBtn(productList, 'All');}}> All </button>
                    <button onClick={(e) => {filterBtn(productList, 'Shoes');}}> Shoes </button>
                    <button onClick={(e) => {filterBtn(productList, 'Clothes');}}> Clothes </button>
            </div>

            <span className='separate'></span>

            <div className="product-section-display">
                {
                    (displayList)?
                    <div className="grid-layout">
                        {
                            displayList.map((item, index) => {
                                return ( 
                                    <ProductCard item={item} key={index}/>
                                )
                            })
                        }
                    </div>:<p style={{fontFamily: 'Poppins', color:'#e89cf8de', width: "fit-content", margin: "15px auto", fontSize:'1rem'}}> No products in store, to display.</p>
                }
            </div>
        </div>
    )
}

export default Home;