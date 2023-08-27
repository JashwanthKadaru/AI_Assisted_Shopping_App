import { useOutletContext } from "react-router-dom";
import { BiSearch } from 'react-icons/bi'
import { FcAssistant } from 'react-icons/fc' 
import './../css/Home.css'
import ProductCard from "../components/ProductCard";
import { useState } from "react";
const Home = () => {
    const {searchText, setSearchText, productList, onSearch, onClickProduct, assistText, setAssistText} = useOutletContext();

    const [ assistOn, setAssistOn ] = useState(false);

    const [ displayList, setDisplayList ] = useState([]);
    
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
                <div className="grid-layout">
                    {
                        productList.map((item, index) => {
                            return ( 
                                <ProductCard item={item} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;