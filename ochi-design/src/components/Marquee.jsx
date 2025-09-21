import { motion } from "framer-motion";
import React from "react";

const Marquee = () => {
  return (
    <div data-scroll data-scroll-speed='.05' className="w-full py-20 rounded-t-2xl bg-[#004D43]">
      <div className="text border-t-2 border-b-2 border-zinc-300 flex whitespace-nowrap overflow-hidden">
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
          className="text-[24vw] leading-none font-[Founders_Grotesk_X] font-bold uppercase -mb-[7vw] pt-10 pr-20"
        >
          We are ochi
        </motion.h1>
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
          className="text-[24vw] leading-none font-[Founders_Grotesk_X] font-bold uppercase -mb-[7vw] pt-10 pr-20"
        >
          We are ochi
        </motion.h1>
      </div>
    </div>
  );
};

export default Marquee;
