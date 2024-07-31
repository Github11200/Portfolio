"use client";

import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import * as React from "react";
import { SocialButton } from "@/components/SocialButton";
import { ExperienceCard } from "@/components/ExperienceCard";
import { useState, useEffect } from "react";

interface GlowPosition {
    mouseX: number;
    mouseY: number;
}

export default function Home() {
    const [glowPosition, updateGlowPosition] = useState<GlowPosition>({
        mouseX: 0,
        mouseY: 0,
    });
    const [hasMouse, setHasMouse] = useState(false);
    const size = 20;

    const updateShadowPosition = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        updateGlowPosition({
            mouseX: event.pageX,
            mouseY: event.pageY,
        });
    };

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
        <div
            className="grid justify-items-center gap-40 min-w-full"
            onMouseMove={(event) => {
                setHasMouse(true);
                updateShadowPosition(event);
            }}
        >
            {/* <div
                className={
                    `absolute mouse-blur bg-primary rounded-full size-[100px] blur-[120px] ` +
                    (!hasMouse && "hidden")
                }
                style={{
                    top: glowPosition.mouseY - size * 2,
                    left: glowPosition.mouseX - size * 2,
                }}
            ></div> */}
            <div className="w-9/12 lg:w-7/12 xl:w-6/12 2xl:w-4/12 text-lg sm:text-xl min-h-screen flex items-center">
                <div>
                    <h1 className="text-4xl mb-10 not-visible translate-x-[-30%] blur font-extrabold">
                        Hi, I&apos;m Jinay!
                    </h1>
                    <div className="not-visible translate-x-[-40%] blur font-light">
                        <p>
                            A <b>full stack developer</b> from Delta, BC{" "}
                        </p>
                        <br />
                        <p>
                            Currently doing a{" "}
                            <span className="font-bold">
                                Software Engineering Fellowship at{" "}
                                <Link
                                    href="https://headstarter.co/"
                                    className="underline"
                                    target="_blank"
                                >
                                    Headstarter
                                </Link>
                            </span>
                        </p>
                        <br />
                        <p>
                            Working on{" "}
                            <Link
                                href="https://viralinsight.vercel.app"
                                target="_blank"
                            >
                                <span className="underline font-bold">
                                    Viral Insight
                                </span>
                            </Link>
                            , an app that predicts the number of views a video
                            may get based on it&apos;s title
                        </p>
                        <br />
                        <p>
                            Exploring machine learning with{" "}
                            <Link href="https://pytorch.org/" target="_blank">
                                <span className="underline font-bold">
                                    PyTorch
                                </span>
                            </Link>
                            , and getting into competitive programming
                        </p>
                    </div>
                    <div className="flex flex-row gap-2 mt-10">
                        <SocialButton
                            link="https://github.com/Github11200"
                            image="/Github.png"
                            yOffset={1000}
                        />
                        <SocialButton
                            link="https://x.com/codemoment2"
                            image="/x.svg"
                            yOffset={2000}
                        />
                        <SocialButton
                            link="https://www.linkedin.com/in/jinay-patel-6369002b4/"
                            image="/Linkedin.png"
                            yOffset={3000}
                        />
                    </div>
                </div>
            </div>
            <div className="grid gap-[50%]">
                <div className="w-full grid justify-items-center">
                    <h2 className="text-3xl mb-6 translate-x-[30%] blur not-visible font-bold">
                        My Projects
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 p-2 justify-items-center gap-6 text-3xl mb-6 translate-x-[40%] blur not-visible">
                        <ProjectCard
                            title="Viral Insight"
                            description="Predict the number of views a video may get based on it's title and other features"
                            link="https://viralinsight.vercel.app"
                            image="/ViralInsight.png"
                        />
                        <ProjectCard
                            title="Pure Pursuit Simulator"
                            description="Simulate the pure pursuit algorithm within your browser"
                            link="https://github.com/Github11200/Pure-Pursuit-Simulator"
                            image="/PurePursuitLogo.png"
                        />
                        <ProjectCard
                            title="Quantum Trader"
                            description="Predict stock prices using LSTMs in PyTorch and Meta's Prophet library"
                            link="https://github.com/Github11200/QuantumTrader"
                            image="/QuantumTrader.png"
                        />
                        <ProjectCard
                            title="Jensei AI"
                            description="AI journaling app to make it easier to journal, made at NwHacks 2024"
                            link="https://devpost.com/software/jinsei-ai"
                            image="/Jensei.png"
                        />
                    </div>
                </div>
                <div className="w-full grid justify-items-center pb-72">
                    <h2 className="text-3xl mb-6 translate-x-[-30%] blur not-visible font-bold">
                        Experiences
                    </h2>
                    <div className="flex flex-col justify-center gap-6 translate-x-[-20%] blur not-visible">
                        <ExperienceCard
                            title="Software Engineering Fellowship"
                            date="July 2024 - Now"
                            description="Work on various projects related to web development and AI. Also improve various SOFT skills such as communication, personal brand building, and public speaking."
                            link="https://headstarter.co/"
                        />
                        <ExperienceCard
                            title="Lead web developer"
                            date="October 2023 - Now"
                            description="Work with a team on revamping the Seaquam Robotics website in order to make the datadynamic. My role mainly focuses on the backendand creating an API that gathers data frommultiple locations. Also worked on creating aCMS system using Tauri and Vite."
                            link="https://seaquamrobotics.ca/"
                        />
                        <ExperienceCard
                            title="Air Cadets"
                            date="November 2020 - Now"
                            description="Work on various activites related to the cadet program, and work on skills such as leadership, teamwork, communication, and more. Also lead a flight throughout the year, and teach lessons."
                            link="https://www.northdeltaaircadets.net/"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
