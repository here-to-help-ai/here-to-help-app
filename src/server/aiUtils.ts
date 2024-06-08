import { summarize, emotionalState, riskLevel, detectedIssues, responseScripts, actionSteps } from './aiHelpers'; // Adjust the import path as necessary
import { Results, ProcessTranscriptInput } from '@/server/types'; // Adjust the import path for types

const transcript = `
Operator: It's important to remember that your feelings and experiences are valid, and it's okay to seek support from those around you. Sometimes just sharing can make a big difference. Have you considered talking to a mental health professional, like a therapist or counselor?\n
Customer: I have, but I'm not sure where to start. It feels like such a huge step, and I'm scared they won't understand or be able to help.\n
Operator: Starting therapy can feel daunting, but it's a positive step towards feeling better. Therapists are trained to help with exactly what you're going through, and there are many different types of support available. I can help you find resources or connect you with services that specialize in mental health support. Would that be helpful?\n
Customer: Maybe, yes. I just want to feel like myself again, but I don't know if it's possible.\n
Operator: It's definitely possible, and reaching out like this is the first step. You don't have to go through this alone. Let's take it one step at a time. I can provide you with some resources and help you plan the next steps towards getting the support you need.\n
Customer: Thank you. That sounds like a good place to start. I appreciate you listening and not judging me.\n
Operator: Of course. I'm here to support you, and there's absolutely no judgment. You're doing the right thing by seeking help. Let's work together to find the best path forward for you.\n
Customer: What kind of resources are available? I'm worried about costs and finding the right therapist.\n
Operator: There are a variety of resources, including some that are low-cost or even free. I can guide you through different options and help you find therapists who specialize in areas you're concerned about. It's all about finding the right fit for you.\n
Customer: That would be great. I'm also concerned about the time commitment.\n
Operator: Therapy can be very flexible. There are options for different session lengths and frequencies that can fit your schedule. It's important that it works for you.\n
Customer: I also have some anxiety about talking to someone new about my problems.\n
Operator: That's completely normal. It's okay to feel anxious about starting therapy. Therapists are trained to help you ease into the process comfortably at your own pace.\n
Customer: Thank you for understanding. I feel a bit more confident about taking this step now.\n
Operator: You're welcome! It's normal to have these feelings, and I'm here to support you through each step. Whenever you're ready, we can start looking into options together.\n
`;

// interface ResultDetails {
//     analysis: { state: string };
//     riskLevel: { level: string };
//     detectedIssues: { issues: string };
//     recommendations: { recommendation: string };
//     actionSteps: { steps: string };
//   }

//   type Results = Record<string, ResultDetails>;

interface TranscriptInput {
    transcript: string;
    linesPerChunk: number;
  }


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
    let accumulatedSummary = "";  // This will hold the accumulating summary text as a string.
    let currentEmotion = ""; // Initialize empty variable for emotional state
    let currentRiskLevel = ""; // Initialize empty variable for risk level
    let currentDetectedIssues = ""; // Initialize empty variable for detected issues
    let currentRecommendations = ""; // Initialize empty variable for recommendations
    let currentActionSteps = ""; // Initialize empty variable for action steps


    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      // console.log("Processing Chunk:", i + 1);
      // console.log("Current Chunk Content:\n", chunk);
      // console.log("Current Accumulated Summary Before Processing:", accumulatedSummary);
    
      const summaryResult = await summarize(accumulatedSummary, chunk);  // Pass the current accumulated summary.
      const summaryText = summaryResult?.content || "";  // Extract content from the Output object.
      accumulatedSummary = summaryText;  // Update the accumulated summary with the new summary text.
    
      // console.log("New Summary After Processing:", accumulatedSummary);
      // console.log("--------------------------------------------------\n");
     // Update the accumulated summary with the new summary text.
     const emotionResult = await emotionalState(currentEmotion, conversationBuffer, chunk);
     currentEmotion = emotionResult.content;

     const riskResult = await riskLevel(currentRiskLevel, conversationBuffer, chunk);
     currentRiskLevel = riskResult.content;

     const issuesResult = await detectedIssues(currentDetectedIssues, conversationBuffer, chunk);
     currentDetectedIssues = issuesResult.content;

     const recommendationsResult = await responseScripts(currentRecommendations, conversationBuffer, chunk);
     currentRecommendations = recommendationsResult.content;

     const actionStepsResult = await actionSteps(currentActionSteps, currentRiskLevel, currentDetectedIssues, conversationBuffer, chunk);
     currentActionSteps = actionStepsResult.content;
  
      conversationBuffer += chunk + "\n";
      let bufferLines = conversationBuffer.split('\n');
      if (bufferLines.length > BUFFER_SIZE * linesPerChunk) {
        conversationBuffer = bufferLines.slice(bufferLines.length - BUFFER_SIZE * linesPerChunk).join('\n');
      }
  
      results[`chunk_${i + 1}`] = {
        summary: accumulatedSummary,
        analysis: currentEmotion,
        riskLevel: currentRiskLevel,
        detectedIssues: currentDetectedIssues,
        recommendations: currentRecommendations,
        actionSteps: currentActionSteps,
      };
    }
  

    return results;
  };

const testResults = await processTranscript({ transcript, linesPerChunk: 5 });
console.log("Test Results:", testResults);

//  use zod scehema and json parse to retry 
