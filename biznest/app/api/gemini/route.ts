// api/gemini/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import pdf from 'pdf-parse';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store your API key in environment variables
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro-vision:generateContent?key=${GEMINI_API_KEY}`;

async function generateContent(prompt: string) {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return null;
    }

    if (!data.candidates || data.candidates.length === 0) {
      console.warn('No candidate responses from Gemini.');
      return null;
    }

    const content = data.candidates[0].content;

    if (!content.parts || content.parts.length === 0) {
      console.warn('No parts in the content response from Gemini.');
      return null;
    }

    const text = content.parts[0].text;
    return text;
  } catch (error: any) {
    console.error('Error generating content with Gemini:', error);
    return null;
  }
}

async function processReceipt(fileBuffer: Buffer): Promise<{ amount: string; name: string } | null> {
  try {
    const pdfData = await pdf(fileBuffer);
    const text = pdfData.text;

    const prompt = `Extract the total amount and merchant name from this receipt: ${text}.
                  Return a JSON object with "amount" and "name" keys.`;

    const geminiResponse = await generateContent(prompt);

    if (geminiResponse) {
      try {
        const parsedResponse = JSON.parse(geminiResponse);
        return parsedResponse;
      } catch (parseError) {
        console.error('Error parsing Gemini response as JSON:', parseError);
        return null;
      }
    } else {
      console.warn('Gemini did not return a valid response.');
      return null;
    }
  } catch (error: any) {
    console.error('Error processing PDF:', error);
    return null;
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const geminiResponse = await generateContent(prompt);

    if (geminiResponse) {
      return NextResponse.json({ result: geminiResponse });
    } else {
      return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error in Gemini POST handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const Gemini = { generateContent, processReceipt };