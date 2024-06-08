import Groq from "groq-sdk";
import { z } from 'zod';
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: "sk-proj-L0GoDXdVMbcDBqaXkG8kT3BlbkFJDMLnZJm5KJWxn3HjdV1x",
});


const groq = new Groq({ apiKey: "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" });



class Output {
  content: string;
  constructor(content: string) {
    this.content = content;
  }
}

const OutputSchema = z.object({
  message: z.string(),
});


export async function completion(systemPrompt: string, prompt: string): Promise<Output> {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    // model: "llama3-8b-8192",
    // model: "llama3-70b-8192",
    model: "gpt-4o",
    max_tokens: 1000,
    temperature: 0.01,
    response_format: { type: "json_object" },
  });
  const content = response.choices[0]?.message.content;
  if (!content) throw new Error("No content in response");

  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch (error) {
    throw new Error("Failed to parse JSON content");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return new Output(parsedContent);
}

// export async function completion(systemPrompt: string, prompt: string): Promise<Output> {
//   // async function fetchCompletion(): Promise<Output> {
//     const response = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: prompt },
//       ],
//       // model: "llama3-8b-8192",
//       // model: "llama3-70b-8192",
//       model: "mixtral-8x7b-32768",
//       max_tokens: 16000,
//       temperature: 0.8,
//       stream: false,
//       response_format: { type: "json_object" },
//     });
//     const content = response.choices[0]?.message.content;
//     if (!content) throw new Error("No content in response");
  
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//     return new Output(JSON.parse(content));
//   }

//     try {
//       // Validate the response using the Zod schema
//       const parsed = OutputSchema.parse(JSON.parse(response.choices[0].message.content));
//       return new Output(parsed.message); // Use the validated 'message' as the content for the Output class
//     } catch (error) {
//       // If validation fails, log the error and retry
//       console.error("Validation failed, retrying...", error);
//       return fetchCompletion();
//     }
//   }

//   return fetchCompletion();
// }





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
