import { type ReactNode, useRef, useState } from "react";
import AudioPlayer from "./audio-player";
import { FaExclamation, FaPlay } from "react-icons/fa";
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
                           
                           return (<div key={index} className="absolute " style={{
                                width: chunkWidth,
                                left: chunkWidth * index
                            }}>
                               
                                <HoverItem title={`${chunk.startTime} - ${chunk.endTime}`} content={
<>
    <h2 className="text-bold">Analysis</h2>
    <p>{chunk.analysis}</p>
    <h2 className="text-bold">Risk Level</h2>
    <p>{chunk.riskLevel}</p>
    <h2 className="text-bold">Detected Issues</h2>
    <p>{chunk.detectedIssues}</p>
    <h2 className="text-bold">Recommendations</h2>
    <p>{chunk.recommendations}</p>
    <h2 className="text-bold">Action Steps</h2>
    <p>{chunk.actionSteps}</p>
</>

                                } />
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

const HoverItem = (props: {
    title: string;
    content: ReactNode;
}) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="h-5 w-5 bg-white border-gray-200 border flex items-center justify-center rounded-full relative" 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        <FaExclamation  className="text-red-500 w-4 h-4"/>
        {
            hovered && (
                <div className="absolute top-0 left-0 bg-white p-2 rounded-lg shadow-lg w-64 h-64">
                    <h2 className="text-lg font-bold">{props.title}</h2>
                    <p>{props.content}</p>
                </div>
            )
        }
      
    </div>
    )
}
