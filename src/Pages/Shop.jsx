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
    <div className='flex bg-gradient-to-b flex-col pt-10 sm:flex-row from-pink-200 to-white h-full  w-full items-center justify-around'>
      <div className='flex items-start justify-between flex-col gap-2 '>
        <div className='font-medium text-lg'>NEW ARRIVALS ONLY</div>
        <div className='flex flex-row'>
          <div className='font-bold text-7xl'>new</div>
          <img className='h-18 w-auto' src={hand_icon} alt="hand_icon" />
        </div>
        <div className='font-bold text-7xl'>
          collections
        </div>
        <div className='font-bold text-7xl'>
          for everyone
        </div>
        <div className='flex flex-row bg-red-500 text-white font-medium items-center justify-around p-3 px-10 hover:bg-red-600 rounded-3xl gap-3.5 mt-7'>
<Link to='/collections'>          <button>Our Collections </button>
</Link>
          <img src={arrow} alt="" />
        </div>
      </div>
      <div>
        <img className='lg:h-180  w-auto sm:h-100' src={hero_image} alt="hero_image" />
      </div>
    </div>
    {/* <div><Testimonials/></div>
    <div>    <HomeFeatures/> */}
{/* </div> */}
    </div>
  )
}

export default Shop
