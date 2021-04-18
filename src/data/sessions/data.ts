import { Plugins } from '@capacitor/core';
import {
  EXPENSES_TIME_TRANSITION,
  HOME_TIME_TRANSITION,
  TRANSACTIONS_TIME_TRANSITION,
} from '../../constants/Storage';
import { Period } from '../../models/Period';

const { Storage } = Plugins;

export const getStorageHomeTimeTransition = async () => {
  const response: any = await Storage.get({ key: HOME_TIME_TRANSITION });
  return response.value;
}

export const setStorageHomeTimeTransition = async (homeTimeTransition: string) => {
  await Storage.set({ key: HOME_TIME_TRANSITION, value: JSON.stringify(homeTimeTransition)});
}

export const setStorageExpensesTimeTransition = async (expensesTimeTransition: Period) => {
  await Storage.set({ key: EXPENSES_TIME_TRANSITION, value: JSON.stringify(expensesTimeTransition)});
}
export const setStorageTransactionsTimeTransition = async (transactionsTimeTransition: Period) => {
  await Storage.set({ key: TRANSACTIONS_TIME_TRANSITION, value: JSON.stringify(transactionsTimeTransition)});
}
