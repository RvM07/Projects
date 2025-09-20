import React from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import {motion} from "framer-motion"


const Card = ({ data ,reference }) => {
    return (
        <motion.div drag dragConstraints={reference} whileDrag={{scale:1.1}} dragElastic={0.2} dragTransition={{bounceStiffness:700,bounceDamping:20}} className='relative flex-shrink-0 w-60 h-72 rounded-[45px] bg-zinc-900/90 px-8 py-10 text-white overflow-hidden'>
            <FaRegFileAlt />
            <p className='text-sm mt-5 font-medium'>{data.desc}</p>
            <div className="footer absolute bottom-0 w-full left-0">
                <div className='flex justify-between items-center px-8 py-3 mb-1'>
                    <h5>{data.filesize}</h5>
                    <span className='w-7 h-7 bg-zinc-700 rounded-full flex items-center justify-center'>
                        {data.close ? <IoClose color='#fff' /> : <LuDownload color='#fff' />}
                    </span>
                </div>
                {data.tag.isOpen && (
                    <div className={`tag w-full p-4 ${data.tag.tagColor ==="blue" ? "bg-blue-600" : "bg-green-600"} flex justify-center items-center`}>
                        <h3 className='text-sm font-semibold'>{data.tag.tagTitle}</h3>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default Card