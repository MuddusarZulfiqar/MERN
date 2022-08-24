import React from 'react'
import Header from './header/Header';
import Footer from './footer/Footer';
import { useSelector  } from 'react-redux'
function Layout({children}) {
  
  return (
    <div className='boxed'>
        <Header/>
          {children}
        <Footer/>
    </div>
  )
}

export default Layout