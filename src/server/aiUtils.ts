import { summarize, emotionalState, riskLevel, detectedIssues, recommendations, actionSteps } from './aiHelpers'; // Adjust the import path as necessary
import { type Results, type ProcessTranscriptInput } from '@/server/types'; // Adjust the import path for types

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

      // ok from the chunk there will be multiple occurrences of the following pattern
      //  Time-stamp: 1.12 - 6.18
      // we wannt to extract all the numbers, then get the min and max

      const timeStamps = chunk.match(/Time-stamp: (\d+\.\d+) - (\d+\.\d+)/g);
      const startTime = Number(timeStamps[0].match(/Time-stamp: (\d+\.\d+) - (\d+\.\d+)/)[1]);
      const endTime = Number(timeStamps[timeStamps.length - 1].match(/Time-stamp: (\d+\.\d+) - (\d+\.\d+)/)[2]);
  
      results[`${startTime}_${endTime}`] = {
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

// await processTranscript({ transcript, linesPerChunk: 2 });



//  use zod scehema and json parse to retry 
