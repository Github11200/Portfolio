import React from "react";
import "./hero.css";

export const Hero = () => {
    return (
        <>
            <div className="flex flex-row flex-wrap justify-center items-center gap-8 text-center text-[11vh] mt-[12%] font-bold text-white mb-[5%]">
                <h1 className="from-[#0061ff] to-[#3de4f6]" id="learning">
                    Learning.
                </h1>
                <h1 className="from-[#ff930f] to-[#fff95b]" id="building">
                    Building.
                </h1>
                <h1 className="from-[#5fc52e] to-[#6eee87]" id="growing">
                    Growing.
                </h1>
                <p className="place-self-center text-3xl tracking-wider leading-10 w-[30vw] mt-[2%] font-normal">
                    Hi 👋! I{"'"}m Jinay Patel, a grade 10 student from Delta,
                    BC. I absolutely love to create things, whether it{"'"}s a
                    program, robot, or anything else.
                </p>
            </div>{" "}
            <div
                className="flex flex-row justify-center mb-[10%] gap-7"
                id="buttons"
            >
                <button className="bg-red-500 px-10 h-[80px] text-3xl rounded-3xl border-red-500 border-4 hover:bg-black hover:text-white transition-colors duration-300">
                    Resume
                </button>
                <button className="px-10 h-[80px] text-3xl rounded-3xl border-red-500 border-4 hover:text-white transition-colors duration-300">
                    Contact Me
                </button>
            </div>
        </>
    );
};
