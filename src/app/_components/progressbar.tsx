import { ReactNode, useRef, useState } from "react";
import AudioPlayer from "./audio-player";
import { FaPlay } from "react-icons/fa";
interface Chunk {
    startTime: Date;
    endTime: Date;
    popups: ReactNode[];
}

interface ProgressBarProps {
    chunks: Chunk[];
    src: string;
}

export default function ProgressBar(props: ProgressBarProps) {
    const { chunks, src } = props;
    const ref = useRef<HTMLDivElement>(null);
    const chunkWidth = ref.current?.clientWidth ? ref.current.clientWidth / chunks.length : 0;
    const [currentDuration, setCurrentDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="grid grid-cols-[1fr_7rem] items-center bg-white border  border-grey-200 rounded-xl">
            {/* Our complex logic */}
            <div className="px-4">
                <div className="h-2.5 bg-gray-200 rounded-full relative"
                    ref={ref}>

                    {
                        chunks.map((chunk, index) => (
                            <div key={index} className="absolute" style={{
                                width: chunkWidth,
                                left: chunkWidth * index
                            }}>
                                CHUNK
                            </div>
                        ))
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