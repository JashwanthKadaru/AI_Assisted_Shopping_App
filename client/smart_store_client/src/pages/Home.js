import { useNavigate, useOutletContext } from "react-router-dom";
import { BiSearch } from 'react-icons/bi'
import { FcAssistant } from 'react-icons/fc' 
import './../css/Home.css'
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
    const {searchText, setSearchText, productList, setProductList, assistText, setAssistText, isLogged, globalUsername} = useOutletContext();

    const [ assistOn, setAssistOn ] = useState(false);
    const [ displayList, setDisplayList ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLogged) {
            navigate('/login');
        }

        axios.get('/smartfashionstore/products')
        .then(response => {
            setProductList(response.data.productList);
        })
        .catch(error => {
            console.error('Error fetching data' + error);
        });
    }, [])
    
    const onSearch = (mydisplayList=[], searchword) => {
        let newDisplayList = mydisplayList.filter((item, index) => {
            searchword = searchword.toLowercase()
            if(item.name.toLowercase.includes(searchword)) return true;
            else return false;
        })

        setDisplayList(newDisplayList);
        return {}
    }

    const onAssistSearch = () => {
        let newDisplayList = getGPTResponseForPrompt();
        setDisplayList(newDisplayList);
    }

    const getGPTResponseForPrompt = () => {
        axios.post('/smartfashionstore/GPTservice/', {password, globalUsername, productList, assistText})
        .then(response => {
            setDisplayList(response.data.productList);
        })
        .catch(error => {
            console.error('Error fetching data' + error);
        });
    }


    // TODO : implement filter buttons
    

    return (
        <div className="home">
            <div className="search-box">
                {
                    (assistOn)? <input type="text" placeholder="type prompt" value={assistText} onChange={(e) => setAssistText(e.target.value)}/> : <input type="search" placeholder="type search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                }
                
                <BiSearch className="search-icon" onClick={()=>{setAssistOn(false)}}/>
                <FcAssistant className="search-icon" onClick={() => {setAssistOn(true)}}/>
            </div>

            <div className="tags-div">
                    <button> All </button>
                    <button> Shoes </button>
                    <button> Clothes </button>
            </div>

            <span className='separate'></span>

            <div className="product-section-display">
                {
                    (productList)?
                    <div className="grid-layout">
                        {
                            productList.map((item, index) => {
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