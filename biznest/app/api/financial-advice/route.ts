import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { totalBudget, totalIncome, totalSpend } = await request.json();

  const userPrompt = `
    На основе следующих финансовых данных:
    - Общий бюджет: ${totalBudget} TENGE 
    - Расходы: ${totalSpend} TENGE 
    - Доходы: ${totalIncome} TENGE
    Дайте подробный финансовый совет в 2 предложениях, чтобы помочь пользователю более эффективно управлять своими финансами.
  `;

  try {
    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: userPrompt,
            },
          ],
          max_tokens: 100,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const advice = data.choices[0].message.content;

    return NextResponse.json({ advice });
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return NextResponse.json(
      { error: "Failed to fetch financial advice" },
      { status: 500 }
    );
  }
}
