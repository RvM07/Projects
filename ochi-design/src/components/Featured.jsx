import { motion, useAnimation } from "framer-motion";
import React from "react";

const Featured = () => {
    const cards = [useAnimation(), useAnimation()];
    const handleHover = (index) => {
        cards[index].start({ y: "0" });
    };
    const handleHoverEnd = (index) => {
        cards[index].start({ y: "100%" });
    };

    return (
        <div data-scroll data-scroll-section className="w-full py-20">
            <div className="w-full px-20 border-b-2 border-y-zinc-700 pb-20 ">
                <h1 className="text-7xl font-[Neue_Montreal] tracking-tight">
                    Featured Projects
                </h1>
            </div>
            <div className="px-20">
                <div className="cards w-full flex gap-10 mt-10">
                    <motion.div
                        onHoverStart={() => handleHover(0)}
                        onHoverEnd={() => handleHoverEnd(0)}
                        className="cardcontainer relative w-1/2 h-[75vh]"
                    >
                        <h1 className="text-[#CDEA68] overflow-hidden flex absolute left-full -translate-x-1/2 -translate-y-1/2 top-1/2 z-3 text-8xl leading-none tracking-tighter">
                            {"FYDE".split("").map((item, index) => (
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={cards[0]}
                                    transition={{ ease: [0.45, 0, 0.55, 1], delay: index * 0.1 }}
                                    className="inline-block"
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </h1>
                        <div className="w-full h-full rounded-xl bg-cover overflow-hidden">
                            <img
                                className="w-full h-full"
                                src="https://ochi.design/wp-content/uploads/2025/02/Salience_Website_cover-663x551.png"
                                alt=""
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        onHoverStart={() => handleHover(1)}
                        onHoverEnd={() => handleHoverEnd(1)}
                        className="cardcontainer relative w-1/2 h-[75vh]"
                    >
                        <h1 className="text-[#CDEA68] overflow-hidden flex absolute right-full translate-x-1/2 -translate-y-1/2 top-1/2 z-3 text-8xl leading-none tracking-tighter">
                            {"VISE".split("").map((item, index) => (
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={cards[1]}
                                    transition={{ ease: [0.45, 0, 0.55, 1], delay: index * 0.1 }}
                                    className="inline-block"
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </h1>
                        <div className="w-full h-full rounded-xl bg-cover overflow-hidden">
                            <img
                                className="w-full h-full"
                                src="https://ochi.design/wp-content/uploads/2025/08/Med_Website_0.png"
                                alt=""
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
