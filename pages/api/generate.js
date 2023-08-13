import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generateRecipeSuggestions(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const ingredients = req.body.ingredients || [];
  const tools = req.body.tools || [];

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(ingredients, tools),
      temperature: 1,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["{}"],
    });

    const generatedText = completion.data.choices.map((choice) => choice.text);
    res.status(200).json({ result: generatedText });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(ingredients, tools) {
  const ingredientPrompt = ingredients.map((ingredient) => `- ${ingredient}`).join("\n");
  const toolPrompt = tools.map((tool) => `- ${tool}`).join("\n");

  return `Name the recipe and List out the steps in max 50 words to the recipe given these ingredients and tools:

Ingredients:
${ingredientPrompt}

Tools:
${toolPrompt}

Q: Can you suggest a recipe based on these ingredients and tools?
A:`;
}

