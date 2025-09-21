import { motion } from "framer-motion";
import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";

const LandingPage = () => {
    return (
        <div data-scroll data-scroll-speed='-.2' className="w-full h-screen bg-zinc-900 pt-1">
            <div className="textStructure mt-40 px-20">
                {["We Create", "Eye Opening", "Presentations"].map((item, index) => (
                    <div className="masker">
                        <div className="w-fit flex items-end overflow-hidden">
                            {index === 1 && (<motion.div initial={{width:0}} animate={{width:'8vw'}} transition={{ease:[0.45, 0, 0.55, 1],duration:1}} className="w-[8vw] h-[5.7vw] mr-[1vw] rounded-md bg-red-500 relative -top-[1.2vw]"></motion.div>)}
                            <h1 className="uppercase text-[9vw] font-semibold leading-[.75] -mb-[1vw] pt-[2vw] font-[Founders_Grotesk_X]">
                                {item}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t-2 border-zinc-700 mt-20 flex justify-between items-center px-20 py-6">
                {["For public and private companys", "From the first pitch to IPO"].map(
                    (item, index) => (
                        <p className="text-md font-light tracking-tighter leading-none">
                            {item}
                        </p>
                    )
                )}
                <div className="start flex items-center gap-4">
                    <div className="px-5 py-2 border-[1px] rounded-full border-zinc-500 font-light text-md uppercase">
                        Start the Project
                    </div>
                    <div className="w-9 h-9 flex items-center justify-center border-[1px] rounded-full border-zinc-500">
                        <span className="rotate-[45deg]"><FaArrowUpLong /></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
