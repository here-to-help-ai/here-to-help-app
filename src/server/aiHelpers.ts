import { completion } from "./groqUtils";

class Output {
  content: string;
  constructor(content: string) {
    this.content = content;
  }
}

const summarySchema = {
  title: "Summary",
  type: "object",
  properties: {
    content: { title: "Content", type: "string" },
  },
  required: ["content"]
};
const emotionalStateSchema = {
  title: "Emotional State",
  type: "object",
  properties: {
    content: { title: "Content", type: "string" },
  },
  required: ["content"]
};

const riskLevelSchema = {
  title: "Risk Level",
  type: "object",
  properties: {
    content: { title: "Content", type: "string" },
  },
  required: ["content"]
};

const issuesSchema = {
  title: "Detected Issues",
  type: "object",
  properties: {
    content: { title: "Content", type: "string" },
  },
  required: ["content"]
};

const responseScriptsSchema = {
  title: "Response Scripts",
  type: "object",
  properties: {
    content: { title: "Content", type: "string" },
  },
  required: ["content"]
};

const actionstepSchema = {
  title: "Action step",
  type: "object",
  properties: {
    content: { title: "Content", type: "string" },
  },
  required: ["content"]
};

export async function summarize(currentSummary: string, transcriptChunk: string): Promise<Output> {

  const jsonSchema = JSON.stringify(summarySchema, null, 4);
  const systemPrompt = `You are an expert and genius summarization tool for transcripts between a customer and call centre operator. You MUST summarise ONLY the CUSTOMERS text. You will be given the current summary, and the most recent transcript. Your summary MUST BE ENTITY DENSE AND THOROUGH. You MUST update the summary to include the new information from the most recent transcript. You MUST MAINTAIN THE CONTEXT FROM THE CURRENT SUMMARY. You MUST output summaries in JSON. Think things through step by step. \nThe JSON object must use the schema: ${jsonSchema}`;

  const userPrompt = (summary: string, transcript_chunk: string) => `This is the current summary YOU MUST EXTEND: ${summary}. This is the new transcript: ${transcript_chunk}. Create the updated summary: `;

  const summary = await completion(systemPrompt, userPrompt(currentSummary, transcriptChunk));

  return summary; 
}

export const emotionalState = async (currentEmotion: string, conversationBuffer: string, chunk: string): Promise<{ state: string }> => {

  const jsonSchema = JSON.stringify(emotionalStateSchema, null, 4);
  const systemPrompt = `You are an expert and genius tool for analyzing and summarizing the emotional state from conversation transcripts between a customer and call center operator. You MUST accurately identitfy the CUSTOMER'S emotional state from the conversation. Your identification MUST BE ENTITY DENSE AND SPECIFIC, capturing primary emotions such as anxiety, sadness, or anger. You MUST update the identification to include any new emotional information from the most recent transcript. You MUST ONLY output a single set of descriptive words (e.g. "anxious, sad, angry") that accurately describe the emotional state of the customer.You MUST output the emotional state identification in JSON. Think things through step by step. \nThe JSON object must use the schema: ${jsonSchema}`;
  
  const userPrompt = (currentEmotion: string, conversationBuffer: string, transcript_chunk: string) => `This is the current emotional state: ${currentEmotion}. This is the conversation buffer of previous conversation: ${conversationBuffer}. This is the new transcript: ${transcript_chunk}. Identify the new emotional state detected: `;

  const emotionalState = await completion(systemPrompt, userPrompt(currentEmotion, conversationBuffer, chunk));

  return emotionalState;
};

export const riskLevel = async (currentRiskLevel: string, conversationBuffer: string, chunk: string): Promise<{ level: string }> => {
  const jsonSchema = JSON.stringify(riskLevelSchema, null, 4);
  const systemPrompt = `You are an expert and genius tool for assessing risk levels based on conversation transcripts between a customer and call centre operator. You MUST evaluate and update the risk level based on the emotional state and detected issues from the most recent transcript. Your evaluation MUST BE THOROUGH AND JUSTIFIED. You MUST maintain consistency with the current risk assessment. You MUST ONLY output a single set of descriptive words (e.g. "high, medium, low") that accurately describe the risk level of the customer. You MUST output the risk level in JSON. Think things through step by step. \nThe JSON object must use the schema: ${jsonSchema}`;
  
  const userPrompt = (currentRiskLevel: string, conversationBuffer: string, transcript_chunk: string) => `This is the current risk level YOU MUST UPDATE: ${currentRiskLevel}. This is the conversation buffer of previous conversation: ${conversationBuffer}. This is the new transcript: ${transcript_chunk}. Update the risk level based on new insights: `;
  
  const riskLevel = await completion(systemPrompt, userPrompt(currentRiskLevel, conversationBuffer, chunk));

  return riskLevel;
};

export const detectedIssues = async (currentIssues: string, conversationBuffer: string, chunk: string): Promise<{ issues: string }> => {
  const jsonSchema = JSON.stringify(issuesSchema, null, 4);
  const systemPrompt = `You are an expert and genius tool for identifying specific mental health and emotional issues from conversation transcripts between a customer and a call centre operator. You MUST identify and list new issues from the most recent transcript, updating the existing list of detected issues. Your identification MUST BE ACCURATE AND DETAILED. You MUST ONLY output a single, either a single word or phrase, that accurately describe the issues the customer is experiencing. You MUST output the updated issue in JSON. Think things through step by step. \nThe JSON object must use the schema: ${jsonSchema}`;

  const userPrompt = (currentIssues: string, conversationBuffer: string, transcript_chunk: string) => `These are the currently detected issues YOU MUST EXTEND: ${currentIssues}. This is the conversation buffer of previous conversations: ${conversationBuffer}. This is the new transcript: ${transcript_chunk}. Update the detected issue: `;

  const issues = await completion(systemPrompt, userPrompt(currentIssues, conversationBuffer, chunk));

  return issues;
};


export const responseScripts = async (currentScripts: string, conversationBuffer: string, chunk: string): Promise<{ scripts: string }> => {
  const jsonSchema = JSON.stringify(responseScriptsSchema, null, 4);
  const systemPrompt = `You are an expert and genius tool for creating response scripts for call centre operators based on the conversation transcripts with a customer. You MUST develop a response script based on the updated emotional state and risk assessments. Your script MUST BE APPROPRIATE AND TARGETED. You MUST OUTPUT only A SINGLE response script. It must be a VERY SHORT SENTENCE.
  <example>
  Response Scripts: I understand you're feeling overwhelmed right now, but I'm here to help you. Let's talk about what's going on, and we can figure out the best step forward together.
  </example>
  You MUST output the script in JSON. Think things through step by step. \nThe JSON object must use the schema: ${jsonSchema}`;

  const userPrompt = (currentScripts: string, conversationBuffer: string, transcript_chunk: string) => `These are the current response scripts YOU MUST EXTEND: ${currentScripts}. This is the conversation buffer of previous conversations: ${conversationBuffer}. This is the new transcript: ${transcript_chunk}. Generate updated response script: `;

  const scripts = await completion(systemPrompt, userPrompt(currentScripts, conversationBuffer, chunk));

  return scripts;
};


export const actionstep = async (currentActions: string, riskLevel: string, detectedIssues: string, conversationBuffer: string, chunk: string): Promise<{ actions: string }> => {
  const jsonSchema = JSON.stringify(actionstepSchema, null, 4);
  const systemPrompt = `You are an expert and genius tool for suggesting practical step for call center operators based on the risk level and detected issues from conversation transcripts with a customer. You MUST provide specific, actionable recommendations that are justified by the updated risk level and newly detected issues. Your recommendations MUST BE TARGETED AND PRACTICAL. You MUST maintain consistency with the previous action step.
  <examples>
  Current Risk Level: High
  Current Issues: Anxious, Sad, Angry
  Current Action step: Validate the customer's feelings and provide reassurance.
  Suggested action step: Offer to provide resources for coping with anxiety and sadness.
  Current Risk Level: Low
  Current Issues: Anxious, Sad, Angry
  Current Action step: Validate the customer's feelings and provide reassurance.
  Suggested action step: Remind the customer of available support options and suggest scheduling a follow-up call to reassess their situation.
  Current Risk Level: High
  Current Issues: Anxious, Sad, Angry
  Current Action step: Validate the customer's feelings and provide reassurance.
  Suggested action step: Offer to provide resources for coping with anxiety and sadness.
  Current Risk Level: Medium
  Current Issues: Anxious, Sad, Angry
  Current Action step: Validate the customer's feelings and provide reassurance.
  Suggested action step: Remind the customer of available support options and suggest scheduling a follow-up call to reassess their situation.
  Offer to transfer them immediately to a mental health crisis intervention if they feel overwhelmed.
  </examples>
  You MUST output the action step in JSON. Think things through step by step. \nThe JSON object must use the schema: ${jsonSchema}`;

  const userPrompt = (currentActions: string, riskLevel: string, detectedIssues: string, conversationBuffer: string, transcript_chunk: string) => `These are the current action step YOU MUST EXTEND: ${currentActions}. Given the updated risk level: ${riskLevel}, and newly detected issues: ${detectedIssues}, this is the conversation buffer of previous conversations: ${conversationBuffer}. This is the new transcript: ${transcript_chunk}. Suggest updated action step based on these insights: `;

  const actions = await completion(systemPrompt, userPrompt(currentActions, riskLevel, detectedIssues, conversationBuffer, chunk));

  return actions;
};


// async function testSummarize() {
//   const dummyCurrentSummary = "The conversation involves an operator encouraging a customer to consider therapy as a positive step towards mental health improvement. The customer expresses hesitation and fear about starting therapy, but shows openness after reassurance from the operator. The operator offers to provide resources and support to help the customer begin their journey towards feeling better, emphasizing a non-judgmental and supportive approach.";
//   const dummyTranscriptChunk = `Customer: What kind of resources are available? I'm worried about costs and finding the right therapist.
//   Operator: There are a variety of resources, including some that are low-cost or even free. I can guide you through different options and help you find therapists who specialize in areas you're concerned about. It's all about finding the right fit for you.
//   Customer: That would be great. I'm also concerned about the time commitment.
//   Operator: Therapy can be very flexible. There are options for different session lengths and frequencies that can fit your schedule. It's important that it works for you.
//   Customer: I also have some anxiety about talking to someone new about my problems.
//   Operator: That's completely normal. It's okay to feel anxious about starting therapy. Therapists are trained to help you ease into the process comfortably at your own pace.
//   Customer: Thank you for understanding. I feel a bit more confident about taking this step now.
//   Operator: You're welcome! It's normal to have these feelings, and I'm here to support you through each step. Whenever you're ready, we can start looking into options together.
//   `;

//   try {
//     const summaryOutput = await summarize(dummyCurrentSummary, dummyTranscriptChunk);
//     console.log("Test Summary Output:", summaryOutput.content);

//     const emotionalStateOutput = await emotionalState("", "", dummyTranscriptChunk);
//     console.log("Test Emotional State Output:", emotionalStateOutput.content);

//     const riskLevelOutput = await riskLevel("", "", dummyTranscriptChunk);
//     console.log("Test Risk Level Output:", riskLevelOutput.content);

//     const detectedIssuesOutput = await detectedIssues("", "", dummyTranscriptChunk);
//     console.log("Test Detected Issues Output:", detectedIssuesOutput.content);

//     const responseScriptsOutput = await responseScripts("", "", dummyTranscriptChunk);
//     console.log("Test Response Scripts Output:", responseScriptsOutput.content);

//     const actionstepOutput = await actionstep("", "", "", "", dummyTranscriptChunk);
//     console.log("Test Action step Output:", actionstepOutput.content);
//   } catch (error) {
//     console.error("Error during test:", error);
//   }
// }
// testSummarize();

