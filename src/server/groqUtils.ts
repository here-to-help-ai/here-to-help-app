import Groq from "groq-sdk";
const groq = new Groq({ apiKey: "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" });

class Output {
  content: string;
  constructor(content: string) {
    this.content = content;
  }
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

  const content = response.choices[0]?.message.content;
  if (!content) throw new Error("No content in response");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return new Output(JSON.parse(content));
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
