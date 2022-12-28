import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../App.css'

const Layout = ({children}) => {
    const navigate = useNavigate();
  return (
    <div>
        <div style={{marginLeft: '50%'}}> 
        <button 
        className='addContactButton'
         type='button'
          onClick={()=>navigate('/add-contact')}>
            Add new contact
        </button>
        </div>
        {children}
    </div>
  )
};

export default Layout;