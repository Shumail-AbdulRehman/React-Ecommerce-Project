import React, { useState } from "react";
import { Menu, Search, ShoppingCart,X } from "lucide-react";
import logo from "../assets/Assets/logo_big.png";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import CartDrawer from "./CartDrawer";
import { useSelector } from "react-redux";
import { DropDownMenu } from "./DropDownMenu";
import { NavigationMenuComp } from "./NavigationMenuComp";
import { Button } from "@/components/ui/button"
import Marquee from "react-fast-marquee";
import { rgba } from "framer-motion";
function Navbar() {
  const userStatus=useSelector((state)=> state.auth.status)
  const userData=useSelector((state)=> state.auth.userData)
  const [open, setOpen] = useState(false);
  // const subcategory=["tops","bottoms","winters"]
  const ourCollections=["Men","Women","Kid"]
const womenSubcategories = ["Tops", "Bottoms", "Winters"]
const menSubcategories = ["Tops", "Bottoms", "Winters"]
const kidSubcategories = ["Tops", "Bottoms", "Winters"]
const [sideOpen,setSideOpen]=useState(false)

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
       <nav className="relative w-full flex   sm:flex justify-around  sm:justify-around sm:items-center pt-2 pb-2 bg-slate-900 font-[Poppins] font-normal text-2xl border-slate-400 border-1">
      {/* Logo */}
      <div className="sm:text-2xl text-xl mt-1 font-extrabold tracking-wide uppercase text-white">
        {/* <img src={logo} alt="Logo" className="w-20" /> */}
        SHOPPER
      </div>
      {/* <X className="h-10 w-10 text-white"/> */}
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

  {userStatus? null:<Link to="/login"><button className="  text-white rounded-xl hover:text-black hidden sm:flex hover:bg-gray-100 text-lg sm:text-xl px-1.5 py-1 ">Login</button></Link> }
  <CartDrawer/>
  {userStatus? <div className="hidden sm:flex"><LogoutBtn  /></div>:null}
        {sideOpen ?
        
        <div className="gap-3 px-3 lg:hidden font-medium" style={{position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: "250px",
  zIndex: 999,
  backgroundColor: "rgba(255, 255, 255, 255)",
  backdropFilter: "blur(10px)",
  boxShadow: "-10px 0 10px rgba(0, 0, 0, 0.3)",
  display: "flex", 
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",}}>
           <X 
        onClick={()=> setSideOpen(false)}
        className="h-10 w-10 hover:font-semibold hover:cursor-pointer  text-black"/>
          <Link to="/collections" className="hover:cursor-pointer hover:font-semibold"><button>Our Collections</button></Link>

        <Link to="/collections/men" className="hover:cursor-pointer hover:font-semibold"><button>Men</button></Link>
        <Link to="/collections/women" className="hover:cursor-pointer hover:font-semibold"><button>Women</button></Link>
        <Link to="/collections/kid" className="hover:cursor-pointer hover:font-semibold"><button>Kid</button></Link>
          {userStatus? null:<Link to="/login"><button className="  text-black  hover:font-semibold text-2xl    sm:flex  font-medium  ">Login</button></Link> }
                    {!userStatus? null:<Link to="/signup"><button className="  text-black  hover:font-semibold text-2xl    sm:flex  font-medium  ">SignUp</button></Link> }

        </div>
        
       
        
        : <Menu
        onClick={()=> setSideOpen(true)}
        className="h-7 w-10 lg:hidden text-white"/>}
</div>
    
    </nav>
    </div>
   
  );
}

export default Navbar;
