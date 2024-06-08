"use client";

import { api } from "@/trpc/react";
import { useEffect, useMemo, useState } from "react";
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
        linesPerChunk: 3, //modify this to have more or less overall chunks
        transcript: transcript.transcription_speaker_timestamp
    }, {
        enabled: !!selectedInputs,
        queryKeyHashFn: (input) => JSON.stringify(input),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    })
    const [currentDuration, setCurrentDuration] = useState<number>(0);

    const processedData = useMemo<ProcessedDataArray>(() => {
        let res: ProcessedDataArray = [];

        if (!data) {
            return res;
        }

        for (const [key, value] of Object.entries(data)) {
            const startTime = Number(key.split("_")[0]);
            const endTime = Number(key.split("_")[1]);

            res.push({
                startTime,
                endTime,
                analysis: value.analysis.properties.content.content,
                riskLevel: value.riskLevel.properties.content.content,
                detectedIssues: value.detectedIssues.properties.content.content,
                recommendations: value.recommendations.properties.content.content,
                actionSteps: value.actionSteps.properties.content.content,
            });
        }

        console.log("Raw Data", res);
        console.log("Current Duration", currentDuration);

        // filter so that endtime is less than the current duration
        const before = res.filter((d) => {
            return d.endTime <= currentDuration;
        });


        if (before.length === 0) {
            // array with element with the lowest end time
            res = [res.reduce((prev, current) => {
                return (prev.endTime < current.endTime) ? prev : current;
            })];  
        }
        else {
            res = before;
        }

        console.log("Filtered Data", res);

        return res;
    }, [data, currentDuration])

    useEffect(() => {
        console.log("Processed Data", processedData);
    }, [processedData])

    const activeData = useMemo(() => {

        // get last element of processed data
        const lastElement = processedData[processedData.length - 1];

        if (!lastElement) {
            return null;
        }

        return lastElement;
    }
        , [processedData,])

    useEffect(() => {
        console.log("Active Data", activeData);
    }
        , [activeData])



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
                    <div className="p-2" />
                    {/* Risk Level and Emotional State */}
                    <h2 className="font-semibold">Risk Level</h2>
                    <div className="p-2" />

                    {activeData?.riskLevel ?    <p className="text-sm">
                        {activeData.riskLevel}
                    </p> : <NoDataMessage />
                    }

                    <div className="p-4" />

                    <h2 className="font-semibold">Detected Issues</h2>
                    <div className="p-2" />
                    {/* Detected Issues */}
                    {activeData?.detectedIssues ?     <p className="text-sm">
                        {activeData?.detectedIssues}
                    </p> : <NoDataMessage />}
                </section>

                {/* Suggestions */}
                <div className="flex flex-col gap-2">
                    <section className="bg-white border p-4 border-grey-200 rounded-xl grow">
                        <h2 className="text-lg font-semibold">Suggested Response</h2>
                        {
                            activeData?.recommendations ? (
                                <p className="text-sm">
                                    {activeData?.recommendations}
                                </p>
                            ) : (
                                <NoDataMessage />
                            )
                        }
                    </section>
                    <section className="bg-white border p-4 border-grey-200 rounded-xl grow">
                        <h2 className="text-lg font-semibold">Insights and Recommendations</h2>
                        {
                            activeData?.actionSteps ? (
                                <p className="text-sm">
                                    {activeData?.actionSteps}
                                </p>
                            ) : (
                                <NoDataMessage />
                            )
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

function NoDataMessage() {
    return (
        <p className="text-xs text-gray-400">
            Waiting on data...
        </p>
    );
}