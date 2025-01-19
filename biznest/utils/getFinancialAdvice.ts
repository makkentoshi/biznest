// utils/getFinancialAdvice.ts
export const getFinancialAdvice = async (
    totalBudget: number,
    totalIncome: number,
    totalSpend: number
  ): Promise<string> => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error("DeepSeek API key is missing. Please set DEEPSEEK_API_KEY in your environment variables.");
    }
  
    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} USD 
      - Expenses: ${totalSpend} USD 
      - Incomes: ${totalIncome} USD
      Provide detailed financial advice in 2 sentences to help the user manage their finances more effectively.
    `;
  
    try {
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat", // Уточните модель в документации DeepSeek
          messages: [
            {
              role: "user",
              content: userPrompt,
            },
          ],
          max_tokens: 100, // Ограничение длины ответа
        }),
      });
  
      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const advice = data.choices[0].message.content;
  
      console.log(advice);
      return advice;
    } catch (error) {
      console.error("Error fetching financial advice:", error);
      return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
    }
  };
  
  export default getFinancialAdvice;