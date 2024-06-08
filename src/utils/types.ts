import { z } from "zod";
export const transcriptSchema = z.object({
    timeStamp: z.string(),
    content: z.string(),
    speaker: z.string()
})

export type Transcript = z.infer<typeof transcriptSchema>