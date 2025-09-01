import React from 'react'
import hero_image from '../assets/Assets/hero_image.png'
import hand_icon from '../assets/Assets/hand_icon.png'
import arrow from '../assets/Assets/arrow.png'
import HomeFeatures from '../component/HomeFeatures'
import Testimonials from '../component/Testimonials'
import { Link } from 'react-router-dom'
function Shop() {
  return (
    <div>
    <div className='flex  flex-col pt-10 sm:flex-row bg-slate-200 h-[850px]  w-full items-center justify-around'>
      <div className='flex items-start  justify-between flex-col gap-2 '>
        <div className='font-medium text-lg sm:text-lg'>NEW ARRIVALS ONLY</div>
        <div className='flex flex-row'>
          <div className='font-bold  text-5xl sm:text-6xl lg:text-7xl'>new</div>
          <img className='sm:h-18 h-14 w-auto' src={hand_icon} alt="hand_icon" />
        </div>
        <div className='font-bold text-5xl sm:text-6xl lg:text-7xl'>
          collections
        </div>
        <div className='font-bold  text-5xl sm:text-6xl lg:text-7xl'>
          for everyone
        </div>
        <Link to='/collections'>
         <div className='flex flex-row bg-red-500 text-white font-medium cursor-pointer items-center justify-around p-3 px-10 hover:bg-red-600 rounded-3xl gap-3.5 mt-7'>
          <button className=' cursor-pointer'>Our Collections </button>

          <img src={arrow} alt="" />
        </div></Link>
       
      </div>
      <div>
        <img className='lg:h-180 h-auto w-auto sm:h-110' src={hero_image} alt="hero_image" />
      </div>
    </div>
    {/* <div><Testimonials/></div>
    <div>    <HomeFeatures/> */}
{/* </div> */}
    </div>
  )
}

export default Shop
