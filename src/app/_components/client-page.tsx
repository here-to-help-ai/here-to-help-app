"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import InputForm from "./input-form";
import ProgressBar from "./progressbar";

export default function ClientPage() {
    const [selectedInputs, setSelectedInputs] = useState<
        {
            audioFile: File;
        } | null>(null);


    const chunk = api.ai.chunk.useMutation();
    const analysis = api.ai.chunk.useMutation();

    if (!selectedInputs) {
        return (
            <main className="h-[100vh] p-10 bg-slate-50 flex justify-center items-center">
                <InputForm
                    onSubmit={(audioFile) => {
                        setSelectedInputs({ audioFile });
                    }}
                />
            </main>
        );
    }

    return (
        <main className="h-[100vh] bg-slate-50 p-8 w-full flex flex-col">
            {/* Emergency Control Bar */}
            <section className="flex justify-end">
                <button className="bg-red-600 text-white px-16 py-1 font-bold rounded-lg">
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
                    <h2 className="text-lg font-semibold">Your call with Jeff Tan</h2>

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
            <ProgressBar chunks={[]} currentDuration={"00:10"}/>
        </main>
    );
}