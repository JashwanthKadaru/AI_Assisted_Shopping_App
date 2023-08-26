import { useOutletContext } from "react-router-dom";
import { BiSearch } from 'react-icons/bi'
import './../css/Home.css'
const Home = () => {
    const {searchText, setSearchText, productList, onSearch, onClickProduct} = useOutletContext();
    return (
        <div className="home">
            <div className="search-box">
                <input type="search" placeholder="type search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                <BiSearch className="search-icon"/>
            </div>

            <div className="tags-div">
                    <button> All </button>
                    <button> Shoes </button>
                    <button> Clothes </button>
            </div>
        </div>
    )
}

export default Home;