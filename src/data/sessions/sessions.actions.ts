import { CompanyProfile } from '../../models/CompanyProfile';
import { Period } from '../../models/Period';
import { ActionType } from '../../util/types';
import {
  SESSION_COMPANY_PROFILE_SET,
  SESSION_EXPENSES_TIME_TRANSITON_SET,
  SESSION_HOME_TIME_TRANSITON_SET,
  SESSION_MENU_ENABLED_SET,
  SESSION_TRANSACTIONS_TIME_TRANSITON_SET,
} from '../actionTypes';
import {
  getStorageHomeTimeTransition,
  setStorageCompanyProfile,
  setStorageExpensesTimeTransition,
  setStorageHomeTimeTransition,
  setStorageTransactionsTimeTransition,
} from '../sessions/data';

const companyProfileAction = (data: CompanyProfile) => {
  return ({
    type: SESSION_COMPANY_PROFILE_SET,
    payload: data
  } as const);
}

const homeTimeTransitionAction = (homeTimeTransition: string) => {
  return ({
    type: SESSION_HOME_TIME_TRANSITON_SET,
    homeTimeTransition
  } as const);
}

const expensesTimeTransitionAction = (expensesTimeTransition: Period) => {
  return ({
    type: SESSION_EXPENSES_TIME_TRANSITON_SET,
    expensesTimeTransition
  } as const);
}

const transactionsTimeTransitionAction = (transactionsTimeTransition: Period) => {
  return ({
    type: SESSION_TRANSACTIONS_TIME_TRANSITON_SET,
    transactionsTimeTransition
  } as const);
}

export const setCompanyProfile = (companyProfile: CompanyProfile) => async () => {
  await setStorageCompanyProfile(companyProfile);
  return companyProfileAction(companyProfile);
}

export const setMenuEnabled = (menuEnabled: boolean) => ({
  type: SESSION_MENU_ENABLED_SET,
  menuEnabled
} as const);

export const setHomeTimeTransition = (homeTimeTransition: string) => async () => {
  await setStorageHomeTimeTransition(homeTimeTransition);
  return homeTimeTransitionAction(homeTimeTransition);
}

export const getHomeTimeTransition = () => async (dispatch: React.Dispatch<any>) => {
  const homeTimeTransition: string = await getStorageHomeTimeTransition();
  dispatch(homeTimeTransitionAction(homeTimeTransition));
}

export const setExpensesTimeTransition = (expensesTimeTransition: Period) => async () => {
  await setStorageExpensesTimeTransition(expensesTimeTransition);
  return expensesTimeTransitionAction(expensesTimeTransition);
}

export const setTransactionsTimeTransition = (transactionsTimeTransition: Period) => async () => {
  await setStorageTransactionsTimeTransition(transactionsTimeTransition);
  return transactionsTimeTransitionAction(transactionsTimeTransition);
}


export type SessionsActions =
  | ActionType<typeof setCompanyProfile>
  | ActionType<typeof setMenuEnabled>
  // TODO: review the need of this actions
  | ActionType<typeof setHomeTimeTransition>
  | ActionType<typeof setExpensesTimeTransition>
  | ActionType<typeof setTransactionsTimeTransition>
