import { ReactNode, useRef } from "react";

interface Chunk {
    startTime: Date;
    endTime: Date;
    popups: ReactNode[];
}

interface ProgressBarProps {
    chunks: Chunk[];
    currentDuration: string;
}

export default function ProgressBar(props: ProgressBarProps) {
    const { chunks, currentDuration } = props;
    const ref = useRef<HTMLDivElement>(null);
    const chunkWidth = ref.current?.clientWidth ? ref.current.clientWidth / chunks.length : 0;

    return (
        <div className="grid grid-cols-[1fr_7rem] items-center bg-white border  border-grey-200 rounded-xl">
            {/* Our complex logic */}
            <div className="px-4">
                <div className="h-2.5 bg-gray-200 rounded-full relative"
                    ref={ref}>

                    {
                        chunks.map((chunk, index) => (
                            <div className="absolute" style={{
                                width: chunkWidth,
                                left: chunkWidth * index
                            }}>
                                CHUNK
                            </div>
                        ))
                    }

                </div>
            </div>
            {/* Our duration */}
            <div className="p-4 bg-slate-100 rounded-r-xl flex items-center justify-between gap-2">
                <div>
                    {currentDuration}
                </div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
        </div>
    )
}