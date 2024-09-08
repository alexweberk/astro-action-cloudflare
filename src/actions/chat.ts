import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { defineAction } from "astro:actions";
import { z } from "zod";

export const chat = {
  generateText: defineAction({
    input: z.object({
      prompt: z.string(),
    }),
    handler: async (input, context) => {
      try {
        const anthropic = createAnthropic({
          apiKey: context.locals.runtime.env.ANTHROPIC_API_KEY,
        });

        const { text } = await generateText({
          model: anthropic("claude-3-haiku-20240307"),
          prompt: input.prompt,
          maxTokens: 128,
          temperature: 1.0,
        });
        return { text };
      } catch (error) {
        console.error("Error generating text:", error);
        throw error;
      }
    },
  }),
};
