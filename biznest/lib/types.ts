// types.ts
export interface Budget {
    id: number;
    name: string;
    amount: string;
    icon?: string;
    createdby: string;
  }
  
  export interface Income {
    id: number;
    name: string;
    amount: string;
    icon?: string;
    createdby: string;
  }
  
  export interface AddExpenseProps {
    expenseInfo: {
      name: string;
      amount: string;
      budgetid: number; // Связь с бюджетом
    };
    user: any; // Можем использовать типизацию для пользователя, например, от вашего контекста
    refreshData: () => void;
  }

  export interface ExpenseItemProps {
    expense: {
      id: number;
      description: string;
      amount: number;
      date: string;
      budgetid: number; // Для связи с бюджетом
    };
  }
  

  export interface EditBudgetProps {
    budgetInfo: {
      id: number;
      name: string;
      amount: string;
      icon: string;
    };
    refreshData: () => void;
  }

  export interface BudgetItemProps {
    budget: {
      id: number;
      name: string;
      amount: number;
      icon: string;
      totalSpend: number;
      totalItem: number;
    };
  }

  export interface CardInfoProps {
    budgetList: Budget[];
    incomeList: Income[];
  }

  export interface BarChartDashboardProps {
    budgetList: Budget[];
  }