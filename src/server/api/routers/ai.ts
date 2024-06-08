import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { processTranscript } from '@/server/aiUtils'; 
import { type ProcessTranscriptInput } from '@/server/types'; 


export const aiRouter = createTRPCRouter({
  processTranscript: publicProcedure
    .input(z.object({ transcript: z.string(), linesPerChunk: z.number().min(1) }))
    .query(async ({ input }: { input: ProcessTranscriptInput }) => {
      // const res = await axios.post(`https://api-f1db6c.stack.tryrelevance.com/latest/studios/85f65ea7-b2d0-4788-bc63-8686221de8a7/trigger_limited`, {
      //   headers: {
      //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      //     "Content-Type": "application/json"
      //   },
      // });
      // const transcribed = z.string().parse(res);
      return processTranscript({
        linesPerChunk: input.linesPerChunk,
        transcript: input.transcript,
      });
    }),
});



//   analysis: publicProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ input }) => {
//       // simulate a slow db call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//     }),

// });



// there is a prompt that is going to be passed to the endpoint, the way it will work is that the prompt will have intrsuction to the ai: 
// "Your task is to analyse this transcript of a call and return the sentiment of the most recent part of the conversation. 
// The conversation up to now:{history}
// The most reent chunk:{chunk}
// Your analyse: "

// So we will need to keep a store of the entire conversation (but maybe just a buffer of the last 4(?) chunks (so it is not too long but still preserves cocoherence and the urnning context) and passes the most recent chunk

// const history = conversationHistories[sessionId] || { chunks: [] };
      
// // Update history, maintain only the last 4 chunks
// history.chunks.push(chunk);
// if (history.chunks.length > 4) {
//   history.chunks.shift(); // Remove the oldest chunk if exceeding limit
// }

// conversationHistories[sessionId] = history;
