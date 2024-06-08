"use client"
import { api } from "@/trpc/react";
import InputForm from "./_components/input-form";
import { useState } from "react";
import { Transcript } from "@/utils/types";

export default async function Home() {
  const [selectedInputs, setSelectedInputs] = useState<
  {
    audioFile: File;
    transcript: Transcript;
  
  } | null> (null);

  const chunk = api.ai.chunk.useMutation();
  const analysis = api.ai.chunk.useMutation();  

  return (
    <main className="h-[100vh] bg-slate-50">
      <InputForm
        onSubmit={(audioFile, transcript) => {
          setSelectedInputs({ audioFile, transcript });
        }}
      />
    </main>
  );
}

