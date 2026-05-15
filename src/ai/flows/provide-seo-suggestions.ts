'use server';
/**
 * @fileOverview A Genkit flow for providing AI-powered SEO suggestions for a given blog post.
 *
 * - provideSeoSuggestions - A function that handles the SEO suggestions process.
 * - ProvideSeoSuggestionsInput - The input type for the provideSeoSuggestions function.
 * - ProvideSeoSuggestionsOutput - The return type for the provideSeoSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideSeoSuggestionsInputSchema = z.object({
  blogContent: z.string().describe('The full content of the blog post to analyze.'),
  keywords: z.array(z.string()).describe('A list of target keywords for the blog post.'),
});
export type ProvideSeoSuggestionsInput = z.infer<typeof ProvideSeoSuggestionsInputSchema>;

const ProvideSeoSuggestionsOutputSchema = z.object({
  seoScore: z.number().describe('An overall numerical SEO score (0-100) for the blog post.'),
  readabilityScore: z.object({
    fleschReadingEase: z.number().describe('Flesch Reading Ease score.'),
    gradeLevel: z.number().describe('Estimated Flesch-Kincaid Grade Level.'),
  }).describe('Readability scores for the blog post.'),
  keywordDensityAnalysis: z.array(z.object({
    keyword: z.string().describe('The target keyword.'),
    density: z.number().describe('The density of the keyword in percentage (e.g., 1.5 for 1.5%).'),
    suggestions: z.string().describe('Suggestions to improve the usage or density of this keyword.'),
  })).describe('Analysis of keyword density for target keywords.'),
  overallSuggestions: z.array(z.string()).describe('General suggestions to improve the blog post\'s SEO and readability.'),
  titleSuggestions: z.array(z.string()).describe('Several alternative SEO-optimized title suggestions.'),
  metaDescriptionSuggestions: z.array(z.string()).describe('Several alternative SEO-optimized meta description suggestions.'),
});
export type ProvideSeoSuggestionsOutput = z.infer<typeof ProvideSeoSuggestionsOutputSchema>;

export async function provideSeoSuggestions(input: ProvideSeoSuggestionsInput): Promise<ProvideSeoSuggestionsOutput> {
  return provideSeoSuggestionsFlow(input);
}

const seoSuggestionsPrompt = ai.definePrompt({
  name: 'seoSuggestionsPrompt',
  input: { schema: ProvideSeoSuggestionsInputSchema },
  output: { schema: ProvideSeoSuggestionsOutputSchema },
  prompt: `You are an expert SEO content strategist and editor for ContentForge AI. Your goal is to analyze a given blog post content, focusing on SEO, readability, and keyword density, and provide actionable suggestions for improvement.

Analyze the following blog post content based on the provided target keywords:

Blog Post Content:
---
{{{blogContent}}}
---

Target Keywords: {{{keywords.join(', ')}}}

Based on your analysis, provide the following:

1.  **seoScore**: An overall numerical SEO score from 0-100. Higher is better.
2.  **readabilityScore**: Two scores for readability:
    *   **fleschReadingEase**: The Flesch Reading Ease score (typically 0-100, higher is easier).
    *   **gradeLevel**: The Flesch-Kincaid Grade Level (U.S. grade levels).
3.  **keywordDensityAnalysis**: For each target keyword, provide its density as a percentage and specific suggestions to improve its usage or natural integration into the text if needed. If a keyword is not present, note that.
4.  **overallSuggestions**: A list of general, actionable suggestions to improve the blog post's SEO and readability, covering areas like structure, flow, clarity, and engagement.
5.  **titleSuggestions**: Provide at least 3 alternative SEO-optimized titles that are compelling and keyword-rich, suitable for search engines.
6.  **metaDescriptionSuggestions**: Provide at least 3 alternative SEO-optimized meta descriptions (each under 160 characters) that encourage clicks and accurately summarize the content.

Ensure all scores and suggestions are precise and directly related to the provided content and keywords.
`,
});

const provideSeoSuggestionsFlow = ai.defineFlow(
  {
    name: 'provideSeoSuggestionsFlow',
    inputSchema: ProvideSeoSuggestionsInputSchema,
    outputSchema: ProvideSeoSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await seoSuggestionsPrompt(input);
    return output!;
  }
);
