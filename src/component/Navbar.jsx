import React, { useState } from "react";
import { Menu, Search, ShoppingCart } from "lucide-react";
import logo from "../assets/Assets/logo_big.png";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import CartDrawer from "./CartDrawer";
import { useSelector } from "react-redux";
import { DropDownMenu } from "./DropDownMenu";
import { NavigationMenuComp } from "./NavigationMenuComp";
import { Button } from "@/components/ui/button"
import Marquee from "react-fast-marquee";
function Navbar() {
  const userStatus=useSelector((state)=> state.auth.status)
  const userData=useSelector((state)=> state.auth.userData)
  const [open, setOpen] = useState(false);
  // const subcategory=["tops","bottoms","winters"]
  const ourCollections=["Men","Women","Kid"]
const womenSubcategories = ["Tops", "Bottoms", "Winters"]
const menSubcategories = ["Tops", "Bottoms", "Winters"]
const kidSubcategories = ["Tops", "Bottoms", "Winters"]

  console.log("userData and status are :",userData,userStatus)
  return (
    <div>
     <div className="bg-red-600 text-white font-bold uppercase tracking-wide py-2">
      <Marquee gradient={false} speed={50}>
        <span className="mx-10 text-lg font-medium">
          🚚 Free delivery for orders over 5000 PKR
        </span>
        <span className="mx-10 text-lg font-medium">
          🎉 New arrivals just dropped — shop now!
        </span>
        <span className="mx-10 text-lg font-medium">
          💳 Easy payment options available
        </span>
      </Marquee>
    </div>
       <nav className="relative w-full items-center  flex justify-around  sm:justify-around sm:items-center pt-2 pb-2 bg-slate-900 font-[Poppins] font-normal text-2xl border-slate-400 border-1">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-wide uppercase text-white">
        {/* <img src={logo} alt="Logo" className="w-20" /> */}
        SHOPPER
      </div>
      <ul className="hidden lg:flex   gap-8 items-center mt-1">
        <Link to="/">        <Button       className=" text-[16px]  bg-slate-900 cursor-pointer text-white hover:bg-white hover:text-black border border-slate-900">Home</Button>
</Link>
  <NavigationMenuComp title="Women" subcategories={womenSubcategories} category="women" />
  <NavigationMenuComp title="Men" subcategories={menSubcategories} category="men" />
  <NavigationMenuComp title="Kids" subcategories={kidSubcategories} category="kid" />
  {/* <NavigationMenuComp title="Our Collections" subcategories={ourCollections} category="Collections" /> */}

    <Link to="/collections">        <Button       className=" text-[16px]  bg-slate-900 text-white cursor-pointer hover:bg-white hover:text-black border border-slate-900">Our Collections</Button>
</Link>
  
</ul>



<div className="flex justify-around  items-center gap-5">

  {userStatus? null:<Link to="/login"><button className="  text-white rounded-2xl px-3 py-3 hover:text-black hover:bg-gray-100 text-xl ">Login</button></Link> }
  <CartDrawer/>
  {userStatus? <LogoutBtn />:null}

</div>
    
    </nav>
    </div>
   
  );
}

export default Navbar;
