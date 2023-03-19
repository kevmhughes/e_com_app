import React from 'react'
import Head from "next/head";
import NavBar from './NavBar';
import Footer from './Footer';

// children below allows us to access the props of <Component> in _app.js
const Layout = ({ children }) => {
  return (
    <div>
      <div className='layout'>
        <Head>
          <title>Tech Store</title>
        </Head>
        <header>
          <NavBar>

          </NavBar>
        </header>
        <main className='main-container'>
          {children}
        </main>
        <footer>
          <Footer>
            
          </Footer>
        </footer>
      </div>
    </div>
  )
}

export default Layout