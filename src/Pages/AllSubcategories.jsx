





import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import userService from '../appwrite/services'
import { useParams } from 'react-router-dom'
import banner_mens from '../assets/Assets/banner_mens.png'
import banner_womens from '../assets/Assets/banner_women.png'
import banner_kids from '../assets/Assets/banner_kids.png'
import ProductCrousal from '../component/ProductCrousal'
import LoadingSpinner from '../component/LoadingSpinner'
import FilterSheet from '../component/FilterSheet'

function AllSubcategories() {
  const { category } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [tops, setTops] = useState(null)
  const [bottoms, setBottoms] = useState(null)
  const [winters, setWinters] = useState(null)
  // const [copy]

  useEffect(() => {
    setLoading(true)
    
    ; (async () => {
      const fetchedTops = await userService.getProductsByCategoryAndSubCategory(category, "tops")
      const fetchedBottoms = await userService.getProductsByCategoryAndSubCategory(category, "bottoms")
      const fetchedWinters = await userService.getProductsByCategoryAndSubCategory(category, "winters")

      if (fetchedTops && fetchedBottoms && fetchedWinters) {
        setTops(fetchedTops.documents)
        setBottoms(fetchedBottoms.documents)
        setWinters(fetchedWinters.documents)
        setLoading(false)
      }
    })()
  }, [category])

  // const onFilter = (type1, value1,type2,value2) => {
  //   // let filteredProducts = [...products];
  //   console.log(type1,value1,type2,value2);
     
  //   if(value1 && value2)
  //   {
  //     let filteredProducts=[...copyProducts]
  //      filteredProducts=filteredProducts.filter((c)=> c.sizes?.includes(value1) && c.price<value2)
  //      setProducts(filteredProducts)
  //   }
    
    
  //   if(value1 && !value2)
  //    {
  //     let filteredProducts1=[...copyProducts]
  //     filteredProducts1 = filteredProducts1.filter((p) =>
  //       p.sizes?.includes(value1)

      
  //     );
  //               setProducts(filteredProducts1);

  //    }
  //    if(value2 && !value1)
  //    {

  //     let filteredProducts=[...products]
  //     console.log("value is::",value2)
  //     filteredProducts = filteredProducts.filter((p) =>  p.price<value2)
  //         setProducts(filteredProducts);

  //    }
  //    if(!value1 && !value2)
  //    {
  //     setProducts([...copyProducts])
  //    }


    
      
    

  // };


  if (loading) {
    return <LoadingSpinner text="Loading..."/>
  }

  return (
    <div className="w-full flex flex-col gap-16 py-10">
      {/* Banner */}
      <div className="w-full flex justify-center">
        {category === "kid" ? (
          <img className="h-auto max-w-[80%]" src={banner_kids} alt="" />
        ) : category === "men" ? (
          <img className="h-auto max-w-[80%]" src={banner_mens} alt="" />
        ) : (
          <img className="h-auto max-w-[80%]" src={banner_womens} alt="" />
        )}
      </div>
        
          {/* <FilterSheet/> */}
        
      {/* Tops Section */}
      {tops?.length > 0 && (
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-black pl-3">
            Tops
          </h2>
          <ProductCrousal items={tops} />
        </div>
      )}

      {/* Bottoms Section */}
      {bottoms?.length > 0 && (
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-black pl-3">
            Bottoms
          </h2>
          <ProductCrousal items={bottoms} />
        </div>
      )}

      {/* Winters Section */}
      {winters?.length > 0 && (
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-black pl-3">
            Winters
          </h2>
          <ProductCrousal items={winters} />
        </div>
      )}
    </div>
  )
}

export default AllSubcategories
