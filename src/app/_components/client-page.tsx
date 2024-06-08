"use client";

import { api } from "@/trpc/react";
import { useMemo, useState } from "react";
import InputForm from "./input-form";
import ProgressBar from "./progressbar";
import { FaSpinner } from "react-icons/fa";
import { transcript } from "@/server/transcript";

export type ProcessedDataArray = {
    startTime: number;
    endTime: number;
    analysis: string;
    riskLevel: string;
    detectedIssues: string;
    recommendations: string;
    actionSteps: string;
}[]
export default function ClientPage() {
    const [selectedInputs, setSelectedInputs] = useState<
        {
            src: string;
        } | null>(null);


    const { data, isLoading, error } = api.ai.processTranscript.useQuery({
        linesPerChunk: 5,
        transcript: transcript.transcription_speaker_timestamp
    }, {
        enabled: !!selectedInputs,
        queryKeyHashFn: (input) => JSON.stringify(input)
    })
    const [currentDuration, setCurrentDuration] = useState<number>(0);

    const processedData = useMemo<ProcessedDataArray>(() => {
        const res: ProcessedDataArray = [];

        if (!data) {
            return res;
        }

        for (const [key, value] of Object.entries(data)) {
            const startTime = Number(key.split("_")[0]);
            const endTime = Number(key.split("_")[1]);

            res.push({
                startTime,
                endTime,
                analysis: value.analysis,
                riskLevel: value.riskLevel,
                detectedIssues: value.detectedIssues,
                recommendations: value.recommendations,
                actionSteps: value.actionSteps
            });
        }

        // filter so that endtime is less than the current duration
        res.filter((d) => d.endTime <= currentDuration);
        
        return res;
    }, [data])

    const activeData = useMemo(() => {
      
        const active =  processedData.find((d) => {
            return d.startTime <= currentDuration && d.endTime >= currentDuration;
        }
        );
        // if nothing just fall back to the one where the endtime is closest to the current duration
        if (!active) {
            return processedData.reduce((prev, curr) => {
                return Math.abs(curr.endTime - currentDuration) < Math.abs(prev.endTime - currentDuration) ? curr : prev;
            }, []);
        }
        return active;
    }
        , [processedData, currentDuration])



    if (!selectedInputs) {
        return (
            <main className="h-[100vh] p-10 bg-slate-50 flex justify-center items-center">
                <InputForm
                    onSubmit={(src) => {
                        setSelectedInputs({ src });
                    }}
                />
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className="h-[100vh] p-10 bg-slate-50 flex justify-center items-center gap-2">
                <p>Initialising...</p>
                <FaSpinner className="animate-spin" />
            </main>
        );
    }

    if (error) {
        return (
            <main className="h-[100vh] p-10 bg-slate-50 flex justify-center items-center">
                <p>Error: {error.message}</p>
            </main>
        );
    }

 
    return (
        <main className="h-[100vh] bg-slate-50 p-8 w-full flex flex-col">
            {/* Emergency Control Bar */}
            <section className="flex justify-end">
                <button className="bg-red-600 text-white px-16 py-1.5 font-bold rounded-lg"
                    onClick={() => {
                        alert("Calling 000");
                    }}
                >
                    Call 000
                </button>
            </section>

            <div className="p-2" />

            <h1 className="text-3xl font-semibold">
                Here-to-Help.ai
            </h1>

            <div className="p-2" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 grow"

            >
                {/* Profile */}
                <section className="bg-white border p-4 border-grey-200 rounded-xl">
                    <h2 className="text-lg font-semibold">Your call with Sahil</h2>

                    {/* Summary */}
                    <p>
                        {activeData?.analysis}
                    </p>

                    {/* Risk Level and Emotional State */}
                    <div>
                        {activeData?.riskLevel}
                    </div>

                    {/* Detected Issues */}
                    <div>
                        {activeData?.detectedIssues}
                    </div>
                </section>

                {/* Suggestions */}
                <div className="flex flex-col gap-2">
                    <section className="bg-white border p-4 border-grey-200 rounded-xl grow">
                        <h2 className="text-lg font-semibold">Suggested Response</h2>

                        {activeData?.recommendations}
                    </section>
                    <section className="bg-white border p-4 border-grey-200 rounded-xl grow">
                        <h2 className="text-lg font-semibold">Insights and Recommendations</h2>
                        {
                            activeData?.actionSteps
                        }
                    </section>
                </div>


            </div>

            <div className="p-4" />

            {/* Progress Bar */}
            <ProgressBar data={processedData} src={selectedInputs.src}
                currentDuration={currentDuration}
                setCurrentDuration={setCurrentDuration}
            />
        </main>
    );
}