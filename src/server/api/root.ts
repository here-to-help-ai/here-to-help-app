import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { aiRouter } from "./routers/ai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ai: aiRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);


// async function processTranscript(transcript: string) {
//   const trpc = createCaller();
//   const { lines } = await trpc.ai.chunk({ text: transcript });

//   const analysisResults = await Promise.all(
//     lines.map(line => trpc.ai.analyzeLine({ line }))
//   );

//   return analysisResults;
// }