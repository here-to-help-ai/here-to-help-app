import { type ReactNode, useRef, useState } from "react";
import AudioPlayer from "./audio-player";
import { FaPlay } from "react-icons/fa";
import { ProcessedDataArray } from "./client-page";


interface ProgressBarProps {
    data: ProcessedDataArray;
    src: string;
    currentDuration: number;
    setCurrentDuration: (duration: number) => void;
}

export default function ProgressBar(props: ProgressBarProps) {
    const { data, src, currentDuration, setCurrentDuration } = props;
    const ref = useRef<HTMLDivElement>(null);
    const chunkWidth = ref.current?.clientWidth ? ref.current.clientWidth / data.length : 0;
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="grid grid-cols-[1fr_7rem] items-center bg-white border  border-grey-200 rounded-xl">
            {/* Our complex logic */}
            <div className="px-4">
                <div className="h-2.5 bg-gray-200 rounded-full relative"
                    ref={ref}>

                    {
                        data.map((chunk, index) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const [hovered, setHovered] = useState(false);
                           return (<div key={index} className="absolute " style={{
                                width: chunkWidth,
                                left: chunkWidth * index
                            }}>
                                <div className="h-2.5 w-2.5 bg-red-500 rounded-full relative" 
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    {
                                        hovered && (
                                            <div className="absolute top-0 left-0 bg-white p-2 rounded-lg shadow-lg">
                                                {/* {chunk} */}
                                            </div>
                                        )
                                    }
                                  
                                </div>
                            </div>)
})
                    }

                    <div className="h-5 w-5 bg-white  rounded-full border border-gray-300 absolute -right-2 -top-1">
                        
                    </div>
                       
                </div>

            </div>
            {/* Our duration */}
            <div className="p-4 bg-slate-100 rounded-r-xl flex items-center justify-between gap-2">
                <div>
                    
                    {
                        Math.floor(currentDuration / 60)
                    }
                    :
                    {
                        Math.floor(currentDuration % 60).toString().padStart(2, "0")
                    }
                </div>
                {
                    isPlaying ? (
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"
                            onClick={() => setIsPlaying(false)}
                        ></div>

                    ) : (
                        <button onClick={() => setIsPlaying(true)}>
                           <FaPlay />
                        </button>
                    )
                }
            </div>

            <AudioPlayer src={src} isPlaying={isPlaying} 
            onTimeUpdate={(currentTime) => {
                setCurrentDuration(currentTime);
            }}
            />
        </div>
    )
}