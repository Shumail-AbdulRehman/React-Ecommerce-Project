import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addItem } from "../store/cartSlice"
import userService from "../appwrite/services"
import p1 from "../assets/Assets/product_1.png"
import LoadingSpinner from "../component/LoadingSpinner"
export default function Product() {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [color, setSelectedColor] = useState(null)
  const [sizes, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false) // ✅ feedback state

  const { id } = useParams()
  const dispatch = useDispatch()

  const addToCart = () => {
    if (product) {
      const productWithOptions = {
        ...product,
        color,
        sizes,
      }
      // delete productWithOptions.sizes
      dispatch(addItem(productWithOptions))
      console.log("Added to cart:", productWithOptions)

      // ✅ visual feedback
      setAdded(true)
      setTimeout(() => setAdded(false), 1200)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await userService.getProduct(id)
      console.log("fetched product is : ", fetchedProduct)
      setProduct(fetchedProduct)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (product && !loading) {
    return (
      <div className="w-full h-[800px] flex justify-center gap-20 items-center">
        {/* Product Image */}
        <img className="w-[500px] h-[600px]" src={userService.getFileView(product.image)} alt={product.title} />

        {/* Product Info */}
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">{product.title}</h1>

          <h1 className="text-xl font-medium text-gray-700 max-w-md leading-relaxed">
            Description: {product.description}
          </h1>

          {/* Price */}
          <div className="flex gap-2">
            <h1 className="text-gray-500 line-through text-lg">PKR 12,789</h1>
            <h1 className="text-red-500 text-xl">
              PKR {Number(product.price).toLocaleString()}
            </h1>
          </div>

          {/* Colors */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <h1 className="font-bold">COLOR:</h1>
              {color && <h1 className="text-lg font-semibold">{color}</h1>}
            </div>
            <div className="flex gap-2">
              {Array.isArray(product.color) && product.color.length > 0 ? (
                product.color.map((c, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-all
                      ${
                        color === c
                          ? "ring-2 ring-black"
                          : "border-gray-300"
                      }`}
                    style={{ backgroundColor: c }}
                  />
                ))
              ) : (
                "No colors available"
              )}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <h1 className="font-bold">SIZE:</h1>
              {sizes && <h1 className="text-lg font-semibold">{sizes}</h1>}
            </div>

            <div className="flex gap-2 flex-wrap">
              {Array.isArray(product.sizes) && product.sizes.length > 0 ? (
                product.sizes.map((i, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(i)}
                    className={`px-3 py-1 rounded border transition-all
                      ${
                        sizes === i
                          ? "bg-black text-white border-black"
                          : "hover:bg-gray-200 border-gray-400"
                      }`}
                  >
                    {i}
                  </button>
                ))
              ) : (
                "No sizes are found"
              )}
            </div>
          </div>

          {/* Stock */}
          <h1>STOCK: {product.stock}</h1>

          {/* ✅ Add to Cart Button with animation */}
          <button
            onClick={addToCart}
            disabled={!sizes || !color}
            className={`mt-4 px-6 py-2 rounded-lg border-2 border-black 
              transition-all duration-300 transform
              ${
                added
                  ? "bg-green-600 text-white scale-105"
                  : "bg-black text-white hover:bg-white hover:text-black"
              } 
              disabled:opacity-50`}
          >
            {added ? "✔ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    )
  } else if (loading) {
    return <LoadingSpinner text="Loading..."/>
  } else {
    return <h1>No product is found</h1>
  }
}
