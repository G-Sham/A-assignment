'use server';
/**
 * @fileOverview A Genkit flow for generating a comprehensive, SEO-optimized blog post.
 *
 * - generateSeoBlogPost - A function that handles the generation of an SEO blog post.
 * - GenerateSeoBlogPostInput - The input type for the generateSeoBlogPost function.
 * - GenerateSeoBlogPostOutput - The return type for the generateSeoBlogPost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const GenerateSeoBlogPostInputSchema = z.object({
  blogTopic: z.string().describe('The main topic for the blog post.'),
  keywords: z.string().describe('Comma-separated keywords to optimize the blog post for.'),
  tone: z.string().describe('The desired tone of the blog post (e.g., "informational", "persuasive", "friendly", "professional").'),
  blogLength: z.enum(['short', 'medium', 'long']).describe('Desired length of the blog post. "short" (~500 words), "medium" (~1000 words), "long" (~1500+ words).'),
  audience: z.string().describe('The target audience for the blog post.'),
  language: z.string().describe('The language in which the blog post should be written (e.g., "English", "Spanish").'),
});

export type GenerateSeoBlogPostInput = z.infer<typeof GenerateSeoBlogPostInputSchema>;

// Output Schema
const FaqSchema = z.object({
  question: z.string().describe('A frequently asked question related to the blog topic.'),
  answer: z.string().describe('The answer to the frequently asked question.'),
});

const SectionSchema = z.object({
  heading: z.string().describe('The main heading for this section (e.g., "Introduction to X", "Benefits of Y").'),
  content: z.string().describe('The detailed content for this section, including paragraphs and bullet points (use markdown for bullet points like `- item`).'),
});

const GenerateSeoBlogPostOutputSchema = z.object({
  seoTitle: z.string().describe('An SEO-optimized title for the blog post (under 60 characters).'),
  metaDescription: z.string().describe('A concise, SEO-friendly meta description for the blog post (under 160 characters).'),
  introduction: z.string().describe('An engaging introduction to the blog post, setting the stage for the topic.'),
  sections: z.array(SectionSchema).describe('An array of main content sections, each with a heading and detailed content. Content should include paragraphs and can use markdown for bullet points.'),
  faqs: z.array(FaqSchema).describe('An array of frequently asked questions and their answers related to the blog topic.'),
  callToAction: z.string().describe('A clear and concise call to action for the reader at the end of the blog post.'),
  conclusion: z.string().describe('A summary of the blog post, reiterating key takeaways and providing a strong closing statement.'),
});

export type GenerateSeoBlogPostOutput = z.infer<typeof GenerateSeoBlogPostOutputSchema>;

// Wrapper function
export async function generateSeoBlogPost(input: GenerateSeoBlogPostInput): Promise<GenerateSeoBlogPostOutput> {
  return generateSeoBlogPostFlow(input);
}

// Prompt definition
const generateSeoBlogPrompt = ai.definePrompt({
  name: 'generateSeoBlogPrompt',
  input: { schema: GenerateSeoBlogPostInputSchema },
  output: { schema: GenerateSeoBlogPostOutputSchema },
  prompt: `You are an expert SEO content strategist and a highly skilled copywriter for ContentForge AI. Your goal is to generate a comprehensive, SEO-optimized, human-like blog post based on the user's input.

Follow these steps to generate the blog post:
1.  **Keyword Analysis & SEO Optimization**: Thoroughly analyze the provided keywords and integrate them naturally throughout the blog post, including the title, meta description, headings, and content, to maximize SEO potential. Ensure optimal keyword density without keyword stuffing.
2.  **Outline Generation**: Create a logical and engaging blog post structure with an introduction, several main sections (each with a clear heading), frequently asked questions, a call to action, and a conclusion.
3.  **Content Generation (Human-like Prose)**: Write high-quality, engaging, and human-like content for each section. Avoid robotic or stiff AI language. Use an appropriate tone, considering the target audience.
4.  **Formatting**: Use clear paragraphs. For lists, use markdown bullet points (\`- item\`).
5.  **Length Consideration**: Adjust the detail and number of sections based on the requested blog length.
    -   "short": Approximately 500 words.
    -   "medium": Approximately 1000 words.
    -   "long": Approximately 1500+ words.
6.  **FAQ + CTA Generation**: Develop relevant frequently asked questions with concise answers and craft a compelling call to action that encourages reader engagement.

**Blog Post Requirements:**
-   **Blog Topic**: {{{blogTopic}}}
-   **Keywords**: {{{keywords}}}
-   **Tone**: {{{tone}}}
-   **Desired Length**: {{{blogLength}}}
-   **Audience**: {{{audience}}}
-   **Language**: {{{language}}}

Ensure the entire output strictly adheres to the JSON schema provided. Do not include any additional text or formatting outside of the JSON object.`,
});

// Flow definition
const generateSeoBlogPostFlow = ai.defineFlow(
  {
    name: 'generateSeoBlogPostFlow',
    inputSchema: GenerateSeoBlogPostInputSchema,
    outputSchema: GenerateSeoBlogPostOutputSchema,
  },
  async (input) => {
    const { output } = await generateSeoBlogPrompt(input);
    if (!output) {
      throw new Error('Failed to generate SEO blog post output.');
    }
    return output;
  }
);
