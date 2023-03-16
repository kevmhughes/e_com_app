import React from 'react'

import { Product, HeroBanner, FooterBanner } from '../components'

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className='products-heading'>
        <h2>
          Best Selling Products
        </h2>
        <p>Speakers of Many Variations</p>
      </div>

      <div className='products-container'>
        {["Product 1", "Product 2"].map((product) => product)}
      </div>

      <FooterBanner />
    </>
  )
}

export default Home