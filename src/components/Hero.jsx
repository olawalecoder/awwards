import React, {useEffect, useRef, useState} from 'react'
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;

    const nextVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);

        setCurrentIndex(upcomingVideoIndex);
    }

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    useGSAP(() => {
        if(hasClicked) {
            gsap.set("#next-video", { visibility: 'visible', opacity: 1 });

            // Simultaneous expansion and fade-out
            gsap.to("#next-video", {
                transformOrigin: "center center",
                scale: 1,
                width: "100vw",
                height: "100vh",
                opacity: 0,
                duration: 0.5, // Smooth duration for both effects
                ease: "power1.inOut",
                onStart: () => nextVideoRef.current.play(),
                onComplete: () => {
                    // Reset visibility and z-index after fade-out
                    gsap.set("#next-video", { visibility: 'hidden', zIndex: -1 });
                },
            });

            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            })
        }

    }, {dependencies: [currentIndex], revertOnUpdate: true})

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div className="overflow-x-hidden relative h-dvh w-screen">
            {isLoading && (
                <div className="flex-center absolute h-dvh w-screen z-[100] bg-violet-50 overflow-hidden">
                    <div className="loader"></div>
                </div>
            )}

            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div
                        className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVdClick}
                             className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                src={getVideoSrc(upcomingVideoIndex)}
                                ref={nextVideoRef}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center object-cover object-center scale-150"
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>
                    <video
                        src={getVideoSrc(currentIndex)}
                        ref={nextVideoRef}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center absolute size-64 z-20 invisible object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />

                    <video
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        ref={nextVideoRef}
                        autoPlay
                        muted
                        className="absolute left-0 top-0 size-full object-center object-cover "
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                <h1 className="absolute z-40 special-font hero-heading text-blue-75 bottom-5 right-5">
                    G<b>a</b>ming
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className=" special-font hero-heading text-blue-100">
                            Redefi<b>n</b>e
                        </h1>
                        <p className="max-w-64 mb-5 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br/> Unleash the Play Economy
                        </p>

                        <Button
                            id="watch-trailer"
                            title="Watch Trailer" leftIcon={<TiLocationArrow/>}
                            containerClass="!bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>

            <h1 className="absolute special-font hero-heading text-black bottom-5 right-5">
                G<b>a</b>ming
            </h1>
        </div>
    )
}
export default Hero
