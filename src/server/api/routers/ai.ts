import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";


export const aiRouter = createTRPCRouter({
  chunk: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  analysis: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),

});
