


















import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import userService from '../appwrite/services'
import { useParams } from 'react-router-dom'
import banner_mens from '../assets/Assets/banner_mens.png'
import banner_womens from '../assets/Assets/banner_women.png'
import banner_kids from '../assets/Assets/banner_kids.png'
import ProductCrousal from '../component/ProductCrousalCategory'
import LoadingSpinner from '../component/LoadingSpinner'
import { useSelector } from 'react-redux'
function CategoryPage() {
  const { category } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [men, setMen] = useState(null)
  const [women, setWomen] = useState(null)
  const [kid, setKid] = useState(null)
  
const getMen=useSelector((state)=> state.products.men)
  const getWomen=useSelector((state)=> state.products.women)
  const getKid=useSelector((state)=> state.products.kid)


  useEffect(() => {
    setLoading(true)
    
    if(getMen || getWomen || getKid)
    {
      ; (async () => {
      const fetchedMen = await userService.getProductsByCategory("men")
      const fetchedWomen = await userService.getProductsByCategory("women")
      const fetchedKid = await userService.getProductsByCategory("kid")

      // if (fetchedTops && fetchedBottoms && fetchedWinters) {
      //   setTops(fetchedTops.documents)
      //   setBottoms(fetchedBottoms.documents)
      //   setWinters(fetchedWinters.documents)
      //   setLoading(false)
      // }
        console.log("fethced.....",fetchedMen,fetchedWomen,fetchedKid)
      if(fetchedMen) setMen(fetchedMen.documents);
      if(fetchedWomen) setWomen(fetchedWomen.documents);
      if(fetchedKid) setKid(fetchedKid.documents);
      setLoading(false)
    })()
    }
    
  },[])

  if (loading) {
    return <LoadingSpinner text="Loading..."/>
  }

  return (
    <div className="w-full flex flex-col gap-16 py-10">
      {/* Banner */}
      {/* <div className="w-full flex justify-center">
        {category === "kid" ? (
          <img className="h-auto max-w-[80%]" src={banner_kids} alt="" />
        ) : category === "men" ? (
          <img className="h-auto max-w-[80%]" src={banner_mens} alt="" />
        ) : (
          <img className="h-auto max-w-[80%]" src={banner_womens} alt="" />
        )}
      </div> */}

      {/* Tops Section */}
      {men?.length > 0 && (
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-black pl-3">
            Men
          </h2>
          <ProductCrousal items={men} />
        </div>
      )}

      {/* Bottoms Section */}
      {women?.length > 0 && (
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-black pl-3">
            Women
          </h2>
          <ProductCrousal items={women} />
        </div>
      )}

      {/* Winters Section */}
      {kid?.length > 0 && (
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-black pl-3">
            Kid
          </h2>
          <ProductCrousal items={kid} />
        </div>
      )}
    </div>
  )
}

export default CategoryPage
