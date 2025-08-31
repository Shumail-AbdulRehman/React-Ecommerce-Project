import React, { useEffect, useState } from "react";
import userService from "../appwrite/services";
import { ProductCard } from "../component";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../component/LoadingSpinner";
import FilterSheet from "../component/FilterSheet";

function CategoryAndSubcategoryPage() {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [copyProducts, setCopyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortedLowHigh, setSortedLowHigh] = useState(null);
  const [sortedHighLow, setSortedHighLow] = useState(null);

  useEffect(() => {
    if (!category || !subcategory) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts =
          await userService.getProductsByCategoryAndSubCategory(
            category,
            subcategory
          );

        if (fetchedProducts?.documents?.length) {
          setProducts(fetchedProducts.documents);
          setCopyProducts(fetchedProducts.documents);
        } else {
          setProducts([]);
          setCopyProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  // 👉 FILTER HANDLER
  const onFilter = (type1, value1,type2,value2) => {
    // let filteredProducts = [...products];
    console.log(type1,value1,type2,value2);
     
    if(value1 && value2)
    {
      let filteredProducts=[...copyProducts]
       filteredProducts=filteredProducts.filter((c)=> c.sizes?.includes(value1) && c.price<value2)
       setProducts(filteredProducts)
    }
    
    
    if(value1 && !value2)
     {
      let filteredProducts1=[...copyProducts]
      filteredProducts1 = filteredProducts1.filter((p) =>
        p.sizes?.includes(value1)

      
      );
                setProducts(filteredProducts1);

     }
     if(value2 && !value1)
     {

      let filteredProducts=[...products]
      console.log("value is::",value2)
      filteredProducts = filteredProducts.filter((p) =>  p.price<value2)
          setProducts(filteredProducts);

     }
     if(!value1 && !value2)
     {
      setProducts([...copyProducts])
     }


    
      
    

  };

  // 👉 SORT HANDLER
  const onSortChange = (value) => {
    setLoading(true);
    if (value === "low-high") {
      // if (sortedLowHigh) {
      //   setProducts(sortedLowHigh);
      // } else {
        const lowHigh = [...products].sort((a, b) => a.price - b.price);
        setSortedLowHigh(lowHigh);
        setProducts(lowHigh);
      // }
    } else if (value === "high-low") {
      // if (sortedHighLow) {
      //   setProducts(sortedHighLow);
      // } else {
        const highLow = [...products].sort((a, b) => b.price - a.price);
        setSortedHighLow(highLow);
        setProducts(highLow);
      // }
    } else if (value === "all-products") {
      setProducts(copyProducts);
    } else if (value === "less-2999") {
      const filteredProducts = [...copyProducts].filter(
        (c) => c.price < 2999
      );
      setProducts(filteredProducts);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner text=" Loading...." />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex flex-col items-start mt-4 w-full justify-between h-auto">
        <div className="ml-5">
          {products && (
            <h1 className="text-lg font-medium ">
              Showing 1-{products.length} Products
            </h1>
          )}
        </div>

        <div className="w-auto flex mt-3 ml-5 ">
          <select
            // defaultValue="all-products"
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-black shadow-sm text-gray-700 bg-white focus:font-medium focus:outline-none focus:ring-2 cursor-pointer"
          >
            <option value="">Sort by</option>
            {/* <option value="all-products">All Products</option> */}
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            {/* <option value="less-2999">Price: less than RS 2999</option> */}
          </select>
        </div>

        <div className="mt-3 ml-5">
          {/* 👉 Pass onFilter properly */}
          <FilterSheet onFilter={onFilter} />
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <ProductCard key={product.$id} {...product} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[600px] flex justify-center items-center text-4xl font-bold">
<h1>          No products found for {category} / {subcategory}
</h1>
        </div>
      )}
    </div>
  );
}

export default CategoryAndSubcategoryPage;
