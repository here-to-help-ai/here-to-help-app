export interface Results {
    [key: string]: {
      summary: string;
      analysis: string;
      riskLevel: string;
      detectedIssues: string;
      recommendations: string;
      actionSteps: string;
    };
  }
  
export interface ProcessTranscriptInput {
    transcript: string;
    linesPerChunk: number;
  }
