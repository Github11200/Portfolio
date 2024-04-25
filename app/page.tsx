"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CardWrapper } from "@/components/ui/cardWrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import MeshComponent from "@/components/ui/modelBox";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface ContactObject {
    svgName: string;
    link: string;
}

interface GlowPosition {
    mouseX: number;
    mouseY: number;
}

const Page: React.FC = () => {
    const skillsIconsSvgNames = [
        "css.svg",
        "git.svg",
        "html.svg",
        "javascript.svg",
        "nodejs.svg",
        "python.svg",
        "react.svg",
        "rust.svg",
        "tailwindcss.svg",
        "c++.svg",
    ];

    const contactSvgNames: Array<ContactObject> = [
        {
            svgName: "linkedin",
            link: "https://www.linkedin.com/in/jinay-patel-6369002b4/",
        },
        {
            svgName: "discord",
            link: "https://discordapp.com/users/904515875615420426",
        },
        {
            svgName: "github",
            link: "https://github.com/Github11200",
        },
    ];

    const [glowPosition, updateGlowPosition] = useState<GlowPosition>({
        mouseX: 0,
        mouseY: 0,
    });

    const updateShadowPosition = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        updateGlowPosition({ mouseX: event.pageX, mouseY: event.pageY });
    };

    const spaceBetweenItemsInsideSectionsInPixels = 80;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        });

        const hiddenElements = document.querySelectorAll(".not-visible");
        hiddenElements.forEach((element) => observer.observe(element));
    });

    return (
        <div onMouseMove={(event) => updateShadowPosition(event)}>
            <div
                className="absolute mouse-blur z-[-10]"
                style={{
                    top: glowPosition.mouseY,
                    left: glowPosition.mouseX,
                }}
            ></div>
            <div
                className="grid grid-cols-2 overflow-y-hidden justify-items-center"
                id="home"
            >
                <nav className="border-[1px] fixed z-20 border-l-border flex items-center h-16 w-[40rem] justify-center gap-x-16 text-center rounded-lg col-span-2 my-5 font-lexend shadow-2xl shadow-slate-900 bg-[#030712] text-xl not-visible translate-y-[-10%] blur">
                    <Link href="#home" className="z-20">
                        Home
                    </Link>
                    <Link href="#projects" className="z-20">
                        Projects
                    </Link>
                    <Link href="#contact" className="z-20">
                        Contact
                    </Link>
                </nav>
                <div className="text-9xl flex min-h-screen items-center justify-center overflow-y-hidden overflow-x-hidden gap-x-36 col-span-2 bottom-10">
                    <div className="font-lexend font-bold leading-snug not-visible translate-x-[50%] blur">
                        <h1>Learning</h1>
                        <h1>Building</h1>
                        <h1>Growing</h1>
                    </div>
                    <div className="flex items-center justify-center w-[600px] h-[600px]">
                        <div className="absolute rounded-full background-blur not-visible translate-x-[50%] blur"></div>{" "}
                        <div className=" not-visible blur w-full h-full">
                            <MeshComponent />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-[40rem] pb-24 mt-[20rem]">
                <div className="w-[800px] mx-auto not-visible translate-x-[-30%] blur">
                    <h1
                        className="text-7xl font-lexend font-bold text-center"
                        style={{
                            marginBottom:
                                spaceBetweenItemsInsideSectionsInPixels,
                        }}
                    >
                        About Me
                    </h1>
                    <p className="text-2xl font-lexend font-light leading-relaxed">
                        Hi 👋! I&apos;m Jinay Patel, a grade 10 student with a
                        passion for all things related to STEM. I mainly
                        specialize in full-stack web development, but have also
                        started delving a lot into machine learning with
                        PyTorch.
                    </p>
                </div>
                <div className="w-[60%] mx-auto overflow-x-hidden">
                    <h1
                        className="text-7xl font-lexend font-bold text-center not-visible translate-x-[30%] blur"
                        style={{
                            marginBottom:
                                spaceBetweenItemsInsideSectionsInPixels,
                        }}
                    >
                        Skills
                    </h1>
                    <div
                        className={cn(
                            `grid w-9/12 mx-auto gap-12 overflow-x-hidden overflow-y-hidden justify-items-center not-visible translate-x-[50%] blur grid-cols-5 grid-cols-${Math.round(
                                skillsIconsSvgNames.length / 2
                            )}`
                        )}
                    >
                        {skillsIconsSvgNames.map((object, index) => {
                            return (
                                <Image
                                    src={"logos/" + object}
                                    height={120}
                                    width={120}
                                    alt={object + "logo"}
                                    key={index}
                                    className={`place-self-center not-visible blur button-hover`}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="w-[800px] mx-auto" id="projects">
                    <h1
                        className="text-7xl font-lexend font-bold text-center not-visible translate-x-[-30%] blur"
                        style={{
                            marginBottom:
                                spaceBetweenItemsInsideSectionsInPixels,
                        }}
                    >
                        Projects
                    </h1>
                    <div className="text-center grid grid-cols-2 justify-items-center gap-32 not-visible translate-x-[-50%] blur">
                        <CardWrapper
                            title="Pure Pursuit Simulator"
                            image="/purePursuitLogo.png"
                            description="This program simulates the Pure Pursuit algorithm which I use in Vex Robotics. It allows me to place points, see how the robot will move (to scale), and then export the code."
                            link="https://github.com/Github11200/Pure-Pursuit-Simulator"
                        />
                        <CardWrapper
                            title="Quantum Trader"
                            image="/quantumTraderLogo.png"
                            description="This is a project I did with my friend that aims to predict stock prices using Python and PyTorch by using a type of neural network called a RNN (recurrent neural network)."
                            link="https://github.com/Github11200/QuantumTrader"
                        />
                        <CardWrapper
                            title="The Mental Leaf"
                            image="/theMentalLeaf.png"
                            description="This is a hackathon project I made with my friend for Recess Hacks 3.0. It is a mental health dashboard with a chatbot, jokes section, journaling section, and a place for resources."
                            link="https://github.com/Github11200/The-Mental-Leaf"
                        />
                        <CardWrapper
                            title="Jensei AI"
                            image="/jenseiAI.png"
                            description="This is another hackathon project I made at NwHacks 2024. It is a journaling app that aims to make it easier for people to get started with journaling using conversational AI."
                            link="https://youtube.com"
                        />
                    </div>
                </div>

                <div className="w-[800px] mx-auto" id="contact">
                    <h1
                        className="text-7xl font-lexend font-bold text-center not-visible translate-y-[100%] blur"
                        style={{
                            marginBottom:
                                spaceBetweenItemsInsideSectionsInPixels,
                        }}
                    >
                        Contact
                    </h1>
                    <div className="flex justify-center gap-x-32 not-visible translate-y-[130%] blur">
                        {contactSvgNames.map((object, index) => {
                            return (
                                <Link
                                    href={object.link}
                                    className="flex justify-center items-center"
                                    key={index}
                                    target="_blank"
                                >
                                    <div
                                        className={`${object.svgName}-shadow`}
                                    ></div>
                                    <Image
                                        src={`logos/${object.svgName}.svg`}
                                        width={100}
                                        height={100}
                                        alt={`${object.svgName} logo`}
                                        className="z-10 button-hover"
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="mb-10 grid grid-cols-2 px-10 justify-center content-center mt-[10rem]">
                <div className="flex items-center">
                    <span className="text-2xl font-lexend">Made with: </span>
                    <span className="ml-3 flex gap-3">
                        <Link href="https://nextjs.org/">
                            <Image
                                src="nextJSIcon.svg"
                                width={40}
                                height={40}
                                alt="next js icon"
                                className="inline"
                            />
                        </Link>
                        <Link href="https://tailwindcss.com/">
                            <Image
                                src="tailwindCSSIcon.svg"
                                width={40}
                                height={40}
                                alt="next js icon"
                                className="inline"
                            />
                        </Link>
                        <Link href="https://ui.shadcn.com/">
                            <Image
                                src="shadcnIcon.svg"
                                width={40}
                                height={40}
                                alt="next js icon"
                                className="inline"
                            />
                        </Link>
                        <Link href="https://threejs.org/">
                            <Image
                                src="threeJSIcon.svg"
                                width={40}
                                height={40}
                                alt="next js icon"
                                className="inline"
                            />
                        </Link>
                    </span>
                </div>
                <div className="justify-self-end">
                    <span className="font-lexend">
                        Icons made by{" "}
                        <Link
                            href="https://iconscout.com/contributors/tomsdesign"
                            className="underline inline"
                        >
                            Tom&apos;s Design
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};
export default Page;
