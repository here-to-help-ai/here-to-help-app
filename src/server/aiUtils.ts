import { summarize, emotionalState, riskLevel, detectedIssues, recommendations, actionSteps } from './aiHelpers'; // Adjust the import path as necessary
import { type Results, type ProcessTranscriptInput } from '@/server/types'; // Adjust the import path for types

const transcript = `
Operator: It's important to remember that your feelings and experiences are valid, and it's okay to seek support from those around you. Sometimes just sharing can make a big difference. Have you considered talking to a mental health professional, like a therapist or counselor?
Customer: I have, but I'm not sure where to start. It feels like such a huge step, and I'm scared they won't understand or be able to help.
Operator: Starting therapy can feel daunting, but it's a positive step towards feeling better. Therapists are trained to help with exactly what you're going through, and there are many different types of support available. I can help you find resources or connect you with services that specialize in mental health support. Would that be helpful?
Customer: Maybe, yes. I just want to feel like myself again, but I don't know if it's possible.
Operator: It's definitely possible, and reaching out like this is the first step. You don't have to go through this alone. Let's take it one step at a time. I can provide you with some resources and help you plan the next steps towards getting the support you need.
Customer: Thank you. That sounds like a good place to start. I appreciate you listening and not judging me.
Operator: Of course. I'm here to support you, and there's absolutely no judgment. You're doing the right thing by seeking help. Let's work together to find the best path forward for you.
`;

const BUFFER_SIZE = 2;
export const processTranscript = async (input: ProcessTranscriptInput): Promise<Results> => {
    const { transcript, linesPerChunk } = input;
    const lines = transcript.split('\n');
    let chunks: string[] = [];
    for (let i = 0; i < lines.length; i += linesPerChunk) {
      chunks.push(lines.slice(i, i + linesPerChunk).join('\n'));
    }
    // console.log(chunks);
    let results: Results = {};
    let conversationBuffer = "";
    let summaryResult = "";
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const summaryResult = await summarize(chunk);
      const summaryText = summaryResult?.summary || "";
      const analysisResult = await emotionalState(summaryText, conversationBuffer, chunk);
      const riskLevelResult = await riskLevel(summaryText, conversationBuffer, chunk);
      const detectedIssuesResult = await detectedIssues(summaryText, conversationBuffer, chunk);
      const recommendationsResult = await recommendations(summaryText, conversationBuffer, chunk);
      const actionStepsResult = await actionSteps(summaryText, conversationBuffer, chunk);
  
      conversationBuffer += chunk + "\n";
      let bufferLines = conversationBuffer.split('\n');
      if (bufferLines.length > BUFFER_SIZE * linesPerChunk) {
        conversationBuffer = bufferLines.slice(bufferLines.length - BUFFER_SIZE * linesPerChunk).join('\n');
      }
  
      results[`chunk_${i + 1}`] = {
        analysis: analysisResult,
        riskLevel: riskLevelResult,
        detectedIssues: detectedIssuesResult,
        recommendations: recommendationsResult,
        actionSteps: actionStepsResult,
      };
    }
  
    // console.log(results);
    return results;
  };

await processTranscript({ transcript, linesPerChunk: 2 });



//  use zod scehema and json parse to retry 
