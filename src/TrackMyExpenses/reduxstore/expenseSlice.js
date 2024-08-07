
import { createSlice } from '@reduxjs/toolkit';

const initialExpensesState = {
  expenses: [],
  totalExpenses: 0,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: initialExpensesState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
      state.totalExpenses = action.payload.reduce((sum, expense) => sum + parseFloat(expense.money), 0);
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.totalExpenses += parseFloat(action.payload.money);
    },
    updateExpense(state, action) {
      const existingExpenseIndex = state.expenses.findIndex(expense => expense.id === action.payload.id);
      if (existingExpenseIndex >= 0) {
        state.expenses[existingExpenseIndex] = action.payload;
        state.totalExpenses = state.expenses.reduce((sum, expense) => sum + parseFloat(expense.money), 0);
      }
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
      state.totalExpenses = state.expenses.reduce((sum, expense) => sum + parseFloat(expense.money), 0);
    },
  },
});

export const expensesActions = expenseSlice.actions;
export default expenseSlice.reducer;
