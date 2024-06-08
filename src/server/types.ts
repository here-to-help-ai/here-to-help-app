import { z } from 'zod'
export const schema = z.object({
  title: z.string(),
  type: z.string(),
  properties: z.object({
    content: z.object({
      title: z.string(),
      type: z.string(),
      content: z.string()
    })
  }),
  required: z.array(z.string())
})
export type Schema = z.infer<typeof schema>

export interface Results {
    [key: string]: {
      summary: Schema;
      analysis: Schema;
      riskLevel: Schema;
      detectedIssues: Schema;
      recommendations: Schema;
      actionSteps: Schema;
    };
  }
  
export interface ProcessTranscriptInput {
    transcript: string;
    linesPerChunk: number;
  }
