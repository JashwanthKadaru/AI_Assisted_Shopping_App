import './App.css';
import Drawer from './Drawer';

import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className='app-body'>

        {/* side drawer for menu and credits and app name     */}
        <div className='app-drawer-box'>
          <Drawer />
        </div>
        {/* Outlet section to dynamically change content */}
        <div className='app-display-box'>
          <Outlet />
        </div>
    </div>
  )
}

export default App;
