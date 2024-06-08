"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import InputForm from "./input-form";
import ProgressBar from "./progressbar";
import { FaSpinner } from "react-icons/fa";

export default function ClientPage() {
    const [selectedInputs, setSelectedInputs] = useState<
        {
            src: string;
        } | null>(null);


    const {data, isLoading, error} = api.ai.processTranscript.useQuery({
        linesPerChunk: 5,
        transcript: ""
    }, {
        enabled: !!selectedInputs,
        queryKeyHashFn: (input) => JSON.stringify(input)
    })


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
            <main className="h-[100vh] p-10 bg-slate-50 flex justify-center items-center">
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
                <button className="bg-red-600 text-white px-16 py-1.5 font-bold rounded-lg">
                    Call 000
                </button>
            </section>

            <div className="p-2" />

            <h1 className="text-3xl font-semibold">
                Here-to-Help.ai
            </h1>

            <div className="p-2" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.3fr] gap-4 grow">
                {/* Profile */}
                <section className="bg-white border p-4 border-grey-200 rounded-xl">
                    <h2 className="text-lg font-semibold">Your call with Sahil</h2>

                    {/* Summary */}
                    <p>

                    </p>

                    {/* Risk Level and Emotional State */}
                    <div>

                    </div>

                    {/* Detected Issues */}
                    <div>

                    </div>
                </section>

                {/* Transcription */}
                <section className="bg-white border p-4 border-grey-200 rounded-xl">
                    <h2 className="text-lg font-semibold">Chat Transcription</h2>
                </section>
                {/* Suggestions */}
                <div className="flex flex-col gap-2">

                    <section className="bg-white border p-4 border-grey-200 rounded-xl grow">
                        <h2 className="text-lg font-semibold">Suggested Response</h2>

                    </section>
                    <section className="bg-white border p-4 border-grey-200 rounded-xl grow">
                        <h2 className="text-lg font-semibold">Insights and Recommendations</h2>
                    </section>
                </div>


            </div>

            <div className="p-4" />

            {/* Progress Bar */}
            <ProgressBar chunks={[]} src={selectedInputs.src}/>
        </main>
    );
}