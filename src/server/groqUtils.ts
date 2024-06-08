import Groq from "groq-sdk";
const groq = new Groq({ apiKey: "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" });


const summarySchema = {
    title: "Summary",
    type: "object",
    properties: {
      content: { title: "Content", type: "string" },
      difficulty: { title: "Difficulty", type: "string" },
    },
    required: ["content"]
  };

class Output {
  constructor(content) {
    this.content = content;
  }
}
export async function summarize(currentSummary: string, transcriptChunk: string): Promise<Output> {

    const jsonSchema = JSON.stringify(summarySchema, null, 4);
    const systemPrompt = `You are a summarization tool for transcripts between a customer and call centre operator. You MUST summarise the CUSTOMERS text. You will be given the current summary, and the most recent trascript. You MUST update teh summary with the new information. You MUST output summaries in JSON. \nThe JSON object must use the schema: ${jsonSchema}`;

    const userPrompt = (summary: string, transcript_chunk: string) => `This is the current summary: ${summary}. This is the new transcript: ${transcript_chunk}. Create the new summary: `;

    const summary = await completion(systemPrompt, userPrompt(currentSummary, transcriptChunk));

    return Object.assign(
        new Output(),
        JSON.parse(summary.choices[0].message.content),
    );
}



export async function completion(systemPrompt: string, prompt: string): Promise<Output> {
  const response = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    model: "llama3-8b-8192",
    temperature: 0,
    stream: false,
    response_format: { type: "json_object" },
  });
  return new Output(response.choices[0].message.content);
}

// export async function getRecipe(recipe_name) {
//   // Pretty printing improves completion results.
//   const jsonSchema = JSON.stringify(schema, null, 4);
//   const chat_completion = await groq.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are a recipe database that outputs recipes in JSON.\n'The JSON object must use the schema: ${jsonSchema}`,
//       },
//       {
//         role: "user",
//         content: `Fetch a recipe for ${recipe_name}`,
//       },
//     ],
//     model: "llama3-8b-8192",
//     temperature: 0,
//     stream: false,
//     response_format: { type: "json_object" },
//   });
//   return Object.assign(
//     new Recipe(),
//     JSON.parse(chat_completion.choices[0].message.content),
//   );
// }

// function printRecipe(recipe) {
//   console.log("Recipe:", recipe.recipe_name);
//   console.log();

//   console.log("Ingredients:");
//   recipe.ingredients.forEach((ingredient) => {
//     console.log(
//       `- ${ingredient.name}: ${ingredient.quantity} ${
//         ingredient.quantity_unit || ""
//       }`,
//     );
//   });
//   console.log();

//   console.log("Directions:");
//   recipe.directions.forEach((direction, step) => {
//     console.log(`${step + 1}. ${direction}`);
//   });
// }

// export async function main() {
//   const recipe = await getRecipe("apple pie");
//   printRecipe(recipe);
// }
