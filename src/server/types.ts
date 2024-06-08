export interface Results {
    [key: string]: {
      summary: string;
      // analysis: { state: string };
      // riskLevel: { level: string };
      // detectedIssues: { issues: string };
      // recommendations: { recommendation: string };
      // actionSteps: { steps: string };
    };
  }
  
export interface ProcessTranscriptInput {
    transcript: string;
    linesPerChunk: number;
  }
