export const getFinancialAdvice = async (
    totalBudget: number,
    totalIncome: number,
    totalSpend: number
  ): Promise<string> => {
    try {
      const response = await fetch("/api/financial-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalBudget,
          totalIncome,
          totalSpend,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.advice;
    } catch (error) {
      console.error("Error fetching financial advice:", error);
      return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
    }
  };
  
  export default getFinancialAdvice;