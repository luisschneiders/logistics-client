import { createSelector } from 'reselect';
import { Period } from '../../models/Period';
import { AppState } from '../app/app.state';

const getHomeTimeTransitionData = (state: AppState) => state.sessionsReducer.homeTimeTransition;
const getExpensesTimeTransitionData = (state: AppState) => state.sessionsReducer.expensesTimeTransition;
const getTransactionsTimeTransitionData = (state: AppState) => state.sessionsReducer.transactionsTimeTransition;

export const getHomeTimeTransition = createSelector(
  getHomeTimeTransitionData,
  (homeTimeTransition: string) => {
    return homeTimeTransition;
  }
);

export const getExpensesTimeTransition = createSelector(
  getExpensesTimeTransitionData,
  (expensesTimeTransition: Period) => {
    return expensesTimeTransition;
  }
);

export const getTransactionsTimeTransition = createSelector(
  getTransactionsTimeTransitionData,
  (transactionsTimeTransition: Period) => {
    return transactionsTimeTransition;
  }
);
