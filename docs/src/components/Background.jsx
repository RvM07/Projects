import React from 'react'

const Background = () => {
    return (
        <>
        <div className='w-full h-screen fixed z-2'>
            <div className='absolute top-[5%] w-full py-10 flex justify-center text-xl text-zinc-400 font-semibold'>Documents</div>
            <h1 className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[14vw] leading-none tracking-tight font-semibold text-zinc-900'>Docs.</h1>
        </div>
        </>
    )
}

export default Background