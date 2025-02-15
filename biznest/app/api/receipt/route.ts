import { VertexAI } from '@google-cloud/vertexai';
import pdfParse from 'pdf-parse';

// Инициализируем Vertex AI
const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT || 'YOUR_GOOGLE_CLOUD_PROJECT',
    location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});

const model = vertexAI.getGenerativeModel({
    model: 'gemini-1.5-pro-001',
    generation_config: {
        maxOutputTokens: 2048,
        temperature: 0.4,
        topP: 1,
    },
    safety_settings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
});

// Запрос в Gemini
const PROMPT = `Extract the following information from the receipt PDF in a valid JSON format:
- Total Amount (e.g., "123.45").
- Merchant Name (e.g., "Starbucks").
Output format: {"amount": "amount_value", "name": "merchant_name"}`;

// Основная функция
export const Gemini = {
    processReceipt: async (pdfBuffer: Buffer): Promise<{ amount: string; name: string } | null> => {
        try {
            // Извлекаем текст из PDF
            const pdfData = await pdfParse(pdfBuffer);
            const text = pdfData.text;

            // Запрашиваем Gemini
            const streamingResp = await model.generateContentStream({
                contents: [{ role: "user", parts: [{ text: PROMPT + "\n\n" + text }] }],
            });

            let geminiResponseText = "";
            for await (const chunk of streamingResp.stream) {
                geminiResponseText += chunk.candidates[0]?.content?.parts[0]?.text || "";
            }

            // Парсим JSON-ответ
            return JSON.parse(geminiResponseText);
        } catch (error) {
            console.error('Gemini API error:', error);
            return null;
        }
    },
};
