import React from 'react'
import userService from '../appwrite/services'
import { Link } from 'react-router-dom'
import p1 from '../assets/Assets/product_20.png'

function ProductCard({ price, $id, title, image, category, subcategory,sizes,stock,color }) {
  return (
    <Link to={`/${category}/${subcategory}/${$id}`}>
      <div className="inline-block transition-transform duration-500 ease-in-out transform hover:scale-105">
        
        <img src={userService.getFileView(image)} loading='lazy' alt={title} className="w-full rounded-lg"/>
        {/* <img className="" src={p1} alt={title} /> */}

        <div className="mt-2 ml-1">
          <h1 className="text-xs sm:text-lg font-bold">{title.toUpperCase()}</h1>
          <div className='flex gap-3'>  
<h1 className="text-gray-500 line-through text-sm">PKR 12,789</h1>
       
<h1 className="text-sm text-red-500">
  PKR {Number(price).toLocaleString()}
</h1>
</div>


        </div>
      </div>
    </Link>
  )
}

export default ProductCard
