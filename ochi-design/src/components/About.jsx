import React from 'react'

const About = () => {
  return (
    <div data-scroll data-scroll-speed='-.2' className='w-full p-20 bg-[#CDEA68] rounded-t-2xl text-black '>
      <h1 className='font-[Neue_Montreal] text-[4vw] tracking-tighter leading-[4.5vw]'>We craft category-defining presentations, brand identities, and digital experiences that drive funding, sales, and market leadership.</h1>
      <div className=" flex gap-5 w-full border-t-[1px] pt-10 border-white mt-20">
        <div className="w-1/2">
          <h1 className='text-7xl'>Our Approach:</h1>
          <button className='flex gap-10 items-center px-10 py-6 mt-10 bg-zinc-900 rounded-full text-white '>Read More
            <div className="rounded-full w-2 h-2 bg-zinc-100"></div>
          </button>
        </div>
        <div className="w-1/2 h-[70vh] bg-[#aec94c] rounded-3xl"></div>
      </div>
    </div>
  )
}

export default About