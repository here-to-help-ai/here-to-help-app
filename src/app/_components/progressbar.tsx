import { ReactNode } from "react";

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
    
    return (
        <div className="grid grid-cols-[1fr_7rem] items-center bg-white border  border-grey-200 rounded-xl">
            {/* Our complex logic */}
            <div></div>
            {/* Our duration */}
            <div className="p-4 bg-slate-100 rounded-r-xl flex items-center justify-between gap-2">
                <div>
                    {currentDuration}
                </div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
        </div>
    )
}