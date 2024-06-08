import { z } from "zod";
export const transcriptSchema = z.object({
    timestamp: z.string(),
    content: z.string(),
    speaker: z.string()
}).array();

export type Transcript = z.infer<typeof transcriptSchema>