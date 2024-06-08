import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";


export const aiRouter = createTRPCRouter({
  chunk: publicProcedure
  .input(z.object({ text: z.string(), linesPerChunk: z.number().min(1) }))
  .mutation(({ input }) => {
    const { text, linesPerChunk } = input;
    const lines = text.split('\n');
    let chunks = [];
    for (let i = 0; i < lines.length; i += linesPerChunk) {
      chunks.push(lines.slice(i, i + linesPerChunk).join('\n'));
    }
    return {
      chunks: chunks,
    };
  }),

  analysis: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),

});
