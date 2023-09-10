import React, { useEffect } from 'react'
import Head from "next/head";
import NavBar from './NavBar';
import Footer from './Footer';

import { useStateContext } from "../context/StateContext";

// children below allows us to access the props of <Component> in _app.js
const Layout = ({ children }) => {
    // getting from local storage
    const { setCartItems, setTotalQuantities, setTotalPrice } = useStateContext();
    useEffect(() => {
      // get cart items
      const parsed = localStorage.getItem("cartItems");
      const sendThis = JSON.parse(parsed);
      !sendThis ? setCartItems([]) : setCartItems(sendThis);
      // get quantity of items
      const totalQuantity = localStorage.getItem("total");
      totalQuantity && setTotalQuantities(parseInt(totalQuantity));
      // get total price
      const totalPrice = localStorage.getItem("price");
      totalPrice && setTotalPrice(parseInt(totalPrice));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div>
      <div className='layout'>
        <Head>
          <title>JSM ProSounds</title>
        </Head>
        <header>
          <NavBar></NavBar>
        </header>
        <main className='main-container'>
          {children}
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  )
}

export default Layout