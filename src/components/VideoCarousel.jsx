import { highlightsSlides } from '../constants'
import {useEffect, useRef, useState} from "react";
import {pauseImg, playImg, replayImg} from "../utils/index.js";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

const VideoCarousel = () => {

    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    // For each video, trigger when to play the video
    // hold information about the video
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, setLoadedData] = useState([])

    // Destructure video state
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, [])

    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'pwoer2.inOut',
        })

        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true
                }))
            }
        })

    }, [isEnd, videoId])

    useEffect(() => {
        if(loadedData.length > 3) {
            if(!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData ]);

    const handleLoadedMetadata = (i, e,) => {
        setLoadedData((pre) => ([...pre, e]))
    }

    useEffect(() => {
        // Where are we in the slider?
        let currentProgress = 0
        // Get span element of currently playing video
        let span = videoSpanRef.current;

        if(span[videoId]) {
            // Animate the progress of the video

            let anim = gsap.to(span[videoId], {
                // animate the progress of the video
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100)

                    if(progress !== currentProgress) {
                        currentProgress = progress
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760
                            ? '10vw'
                            : window.innerWidth < 1200
                                ? '10vw'
                                    : '4vw'
                        })

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },
                onComplete: () => {
                    if(isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px',
                        })

                        gsap.to(span[videoId], {
                            backgroundColor: "#afafaf"
                        })
                    }
                }
            })

            if (videoId === 0) {
                anim.restart()
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime/highlightsSlides[videoId].videoDuration)
            }

            if(isPlaying) {
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }
        }



    }, [videoId, startPlay]);

    const handleProcess = (type, i) => {
        switch (type) {
            // At end of the current video
            case "video-end":
                setVideo((pre) => (
                     {
                         ...pre,
                         isEnd: true,
                         videoId: i + 1
                    }
                ))
                break;
            // At end of video list
            case "video-last":
                setVideo(pre => ({
                    ...pre,
                    isLastVideo:true
                }))
                break;
            // handle video reset
            case "video-reset":
                setVideo(pre => ({
                    ...pre,
                    isLastVideo: false,
                    videoId: 0
                }))
                break;
            case 'play':
                setVideo(pre => ({
                    ...pre,
                    isPlaying: !pre.isPlaying
                }))
                break;
            case 'pause':
                setVideo(pre => ({
                    ...pre,
                    isPlaying: !pre.isPlaying
                }))
                break;
            default:
                return video;

        }
    }

    return (
        <>
            <div className="flex items-center">
                {highlightsSlides.map((slide, i) => (
                    <div key={slide.id} id="slider" className='sm:pr-20 pr-10'>
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    preload="auto"
                                    muted
                                    className={`${slide.id === 2 && 'translate-x-44'} pointer-events-none`}
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onPlay={() => {
                                        setVideo((prevVideo) => (
                                            {
                                                ...prevVideo,
                                                isPlaying: true
                                            }
                                        ))
                                    }}
                                    onLoadedMetadata={(e) =>  handleLoadedMetadata(i, e)}
                                    onEnded={() => i !== 3 ? handleProcess("video-end", i) : handleProcess("video-last", i)}
                                >
                                    <source src={slide.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {slide.textLists.map((text) => (
                                    <p key={text} className="md:texxt-2xl text-xl font-medium">{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            ref={(el) => (videoDivRef.current[i] = el)}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        >
                            <span className="absolute h-full w-full rounded-full"
                                  ref={(el) => (videoSpanRef.current[i] = el)}
                            />
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        onClick={isLastVideo
                            ? () => handleProcess('video-reset')
                            : !isPlaying
                                ? () => handleProcess('play')
                                : () => handleProcess('pause')
                        }
                    />
                </button>
            </div>
        </>
    )
}
export default VideoCarousel
