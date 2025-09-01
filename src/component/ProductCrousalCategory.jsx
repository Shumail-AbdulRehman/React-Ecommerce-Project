import React from "react"
import p1 from '../assets/Assets/product_20.png'
import { Link } from "react-router-dom"
import userService from "../appwrite/services"
function ProductGrid({ items }) {
  return (
    <div className="w-full max-w-6xl mx-auto py-10">
      {/* Grid of 4 products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {items.slice(0, 4).map((item, index) => (
          <Link
            key={index}
            to={`/${item.category}/${item.subcategory}/${item.$id}`}
          >
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="flex justify-center items-center  bg-gray-50 p-4">
                <img
                  src={userService.getFileView(item.image)}
                  alt={item.title}
                  loading="lazy"
                  className="max-h-60 w-auto object-contain"
                />
              </div>

              {/* Title + Price */}
              <div className="p-4 flex flex-col items-center text-center">
                <h1 className="font-semibold text-lg text-gray-900 truncate w-full">
                  {item.title.toUpperCase()}
                </h1>

                <div className="flex items-center gap-3 mt-2">
                  {/* Old Price */}
                  {item.originalprice && (
                    <span className="text-sm text-red-500 line-through">
                      PKR {item.originalprice}
                    </span>
                  )}
                  {/* Current Price */}
                  <span className="text-lg font-semibold text-gray-900">
                    PKR {item.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More Button → Always visible if there are items */}
      {items.length > 0 && (
        <div className="flex justify-center mt-8">
          <Link
            to={`/collections/${items[0].category}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors"
          >
            Show More
            <span className="text-xl">→</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
