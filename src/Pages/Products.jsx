import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userService from '../appwrite/services'
import { setAllProducts } from '../store/productSlice'
import { ProductCard } from '../component'
import LoadingSpinner from '../component/LoadingSpinner'
function Products() {

  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const allProducts = useSelector((state) => state.products.allProducts)

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await userService.getProducts()
      if (fetchedProducts) {
        setProducts(fetchedProducts.documents)
        dispatch(setAllProducts(fetchedProducts.documents))
      } else {
        console.log("fetchedProducts in Product page is null ::=>", fetchedProducts)
      }
      setLoading(false)
    }

    if (allProducts.length === 0) {

      fetchProducts()
    } else {

      setProducts(allProducts)
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <LoadingSpinner text="Loading..."/>
  }

  return (
    <div>
      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <ProductCard key={product.$id} {...product} />
          ))}
        </div>
      ) : (
        <div>No product is found</div>
      )}
    </div>
  )
}

export default Products
