import './App.css';
import Drawer from './components/Drawer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
function App() {

  const [ searchText, setSearchText ] = useState('');

  const productList = [{name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'},{name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'}, ]
  
  const purchasesList = [{name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'},{name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'}, ]

  const onSearch = () => {
    return {}
  }

  const onClickProduct = () => {
    return {}
  }

  return (
    <div className='app-body'>

        {/* side drawer for menu and credits and app name     */}
        <div className='app-drawer-box overlay'>
          <Drawer />
        </div>

        <div className='app-drawer-box'>
        </div>
        {/* Outlet section to dynamically change content */}
        <div className='app-display-box'>
          <Outlet context={{searchText, setSearchText, productList, onSearch, onClickProduct, purchasesList}}/>
        </div>
    </div>
  )
}

export default App;
