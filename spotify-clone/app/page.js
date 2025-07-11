'use client'
import React from 'react'
import Image from './img'

const page = () => {
  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      </style>
      <div className='nav h-15 text-white flex justify-between items-center bg-black px-5'>
        <div><img src=''></img></div>
        <nav className='flex space-x-4'>
          <div className='font-bold gap-2.5 flex items-center'>
            <a href="#" className='opacity-70 hover:opacity-100 hover:scale-105'>Premium</a>
            <a href="#" className='opacity-70 hover:opacity-100 hover:scale-105'>Support</a>
            <a href="#" className='opacity-70 hover:opacity-100 hover:scale-105'>Download</a>
          </div>
          <hr className='border border-white h-6' />
          <div>
            <a href="#" className='mr-2 opacity-70 hover:opacity-100'>Install App</a>
            <a href="#" className='mr-2 opacity-70 hover:opacity-100'>Sign Up</a>
            <a href="#" className='mr-2 opacity-70 hover:opacity-100'>Log In</a>
          </div>
        </nav>
      </div>
    </>
  )
}

export default page
