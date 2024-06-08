"use client"
import { api } from "@/trpc/react";

export default async function Home() {
  const chunk = api.ai.chunk.useMutation();
  const analysis = api.ai.chunk.useMutation();

  return (
    <main className="">
     
    </main>
  );
}

