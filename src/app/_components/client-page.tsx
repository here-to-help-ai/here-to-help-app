"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import { Transcript } from "@/utils/types";
import InputForm from "./input-form";

export default function ClientPage() {
    const [selectedInputs, setSelectedInputs] = useState<
        {
            audioFile: File;
            transcript: Transcript;

        } | null>(null);

    const chunk = api.ai.chunk.useMutation();
    const analysis = api.ai.chunk.useMutation();

    return (
        <main className="h-[100vh] bg-slate-50">
            <InputForm
                onSubmit={(audioFile, transcript) => {
                    setSelectedInputs({ audioFile, transcript });
                }}
            />

            {
                selectedInputs ? (
                    <div>
                        <h2>Selected Inputs</h2>
                        <p>Audio File: {selectedInputs.audioFile.name}</p>
                        <p>Transcript: {JSON.stringify(selectedInputs.transcript)}</p>
                    </div>
                ) : null
            }
        </main>
    );
}