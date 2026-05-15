'use server';
/**
 * @fileOverview This file implements a Genkit flow for optimizing sections of a blog post.
 *
 * - optimizeContentSections - A function to perform various optimizations on blog content.
 * - OptimizeContentSectionsInput - The input type for the optimizeContentSections function.
 * - OptimizeContentSectionsOutput - The return type for the optimizeContentSections function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OptimizeContentSectionsInputSchema = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('rewrite').describe('Rewrite the provided content.'),
    content: z.string().describe('The specific section of the blog post to rewrite.'),
    blogTopic: z.string().optional().describe('Optional. The overall topic of the blog post for better context.'),
    keywords: z.array(z.string()).optional().describe('Optional. Keywords relevant to the content for better SEO optimization.'),
  }),
  z.object({
    action: z.literal('change_tone').describe('Change the tone of the provided content.'),
    content: z.string().describe('The specific section of the blog post to change the tone of.'),
    newTone: z.string().describe('The desired new tone for the content (e.g., "professional", "casual", "humorous").'),
    blogTopic: z.string().optional().describe('Optional. The overall topic of the blog post for better context.'),
    keywords: z.array(z.string()).optional().describe('Optional. Keywords relevant to the content for better SEO optimization.'),
  }),
  z.object({
    action: z.literal('generate_captions').describe('Generate social media captions for the provided content.'),
    content: z.string().describe('The specific section of the blog post to generate captions for.'),
    blogTopic: z.string().optional().describe('Optional. The overall topic of the blog post for better context.'),
    keywords: z.array(z.string()).optional().describe('Optional. Keywords relevant to the content for better SEO optimization.'),
  }),
  z.object({
    action: z.literal('generate_titles').describe('Generate alternative titles for the provided content.'),
    content: z.string().describe('The specific section of the blog post to generate titles for.'),
    blogTopic: z.string().optional().describe('Optional. The overall topic of the blog post for better context.'),
    keywords: z.array(z.string()).optional().describe('Optional. Keywords relevant to the content for better SEO optimization.'),
  }),
]);

export type OptimizeContentSectionsInput = z.infer<typeof OptimizeContentSectionsInputSchema>;

const OptimizeContentSectionsOutputSchema = z.object({
  optimizedContent: z.string().optional().describe('The rewritten or tone-adjusted content.'),
  socialMediaCaptions: z.array(z.string()).optional().describe('A list of generated social media captions.'),
  generatedTitles: z.array(z.string()).optional().describe('A list of generated alternative titles.'),
});

export type OptimizeContentSectionsOutput = z.infer<typeof OptimizeContentSectionsOutputSchema>;

export async function optimizeContentSections(input: OptimizeContentSectionsInput): Promise<OptimizeContentSectionsOutput> {
  return optimizeContentSectionsFlow(input);
}

const optimizeContentSectionsPrompt = ai.definePrompt({
  name: 'optimizeContentSectionsPrompt',
  input: { schema: OptimizeContentSectionsInputSchema },
  output: { schema: OptimizeContentSectionsOutputSchema },
  prompt: `You are an AI assistant specialized in SEO content optimization. Your task is to perform various optimizations on a given section of a blog post.

You will receive content and a specific action to perform. Follow the instructions precisely and provide your output in a JSON format matching the specified schema.

Input Content:
\`\`\`
{{{content}}}
\`\`\`

{{#if blogTopic}}
Overall Blog Topic: {{{blogTopic}}}
{{/if}}

{{#if keywords}}
Relevant Keywords: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

{{#if (eq action "rewrite")}}
Action: Rewrite
Task: Rewrite the above content to improve clarity, engagement, and SEO while maintaining its original meaning. Make sure it reads naturally and avoids robotic AI phrasing.
Expected Output Field: \`optimizedContent\`
{{/if}}

{{#if (eq action "change_tone")}}
Action: Change Tone
Desired Tone: {{{newTone}}}
Task: Rewrite the above content to match a {{{newTone}}} tone. Ensure the core message remains the same but the style reflects the desired tone.
Expected Output Field: \`optimizedContent\`
{{/if}}

{{#if (eq action "generate_captions")}}
Action: Generate Social Media Captions
Task: Generate 3-5 short, engaging social media captions for the above content, suitable for platforms like Twitter or LinkedIn. Incorporate relevant keywords if provided. Each caption should be a distinct string in a JSON array.
Expected Output Field: \`socialMediaCaptions\`
{{/if}}

{{#if (eq action "generate_titles")}}
Action: Generate Alternative Titles
Task: Generate 3-5 catchy, SEO-friendly alternative titles for the above content section. Incorporate relevant keywords if provided. Each title should be a distinct string in a JSON array.
Expected Output Field: \`generatedTitles\`
{{/if}}
`,
});

const optimizeContentSectionsFlow = ai.defineFlow(
  {
    name: 'optimizeContentSectionsFlow',
    inputSchema: OptimizeContentSectionsInputSchema,
    outputSchema: OptimizeContentSectionsOutputSchema,
  },
  async (input) => {
    const { output } = await optimizeContentSectionsPrompt(input);
    return output!;
  }
);
