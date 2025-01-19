// types.ts
export interface Budget {
    id: number;
    name: string;
    amount: string;
    icon?: string;
    createdBy: string;
  }
  
  export interface Income {
    id: number;
    name: string;
    amount: string;
    icon?: string;
    createdBy: string;
  }
  
  export interface Expense {
    id: number;     
    name: string;    
    amount: string;  
    budgetId: number; 
    createdAt: string; 
  }
  
  export interface AddExpenseProps {
    budgetId: number;
    user: {
      primaryEmailAddress?: {
        emailAddress: string;
      };
    };
    refreshData: () => void;
  }
  
  export interface ExpenseListTableProps {
    expensesList: Expense[];
    refreshData: () => void;
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