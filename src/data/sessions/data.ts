import { Plugins } from '@capacitor/core';
import {
  COMPANY_PROFILE,
  EXPENSES_TIME_TRANSITION,
  HOME_TIME_TRANSITION,
  TRANSACTIONS_TIME_TRANSITION,
} from '../../constants/Storage';
import { CompanyProfile } from '../../models/CompanyProfile';
import { Period } from '../../models/Period';
import { fetchCompanyProfile } from '../api/CollectionCompany';

const { Storage } = Plugins;

export const getStorageCompanyProfile = async () => {
  const response: any  = await Storage.get({ key: COMPANY_PROFILE });
  const responseObj: any = JSON.parse(response.value);
  return responseObj;
}

export const setStorageCompanyProfile = async (data: CompanyProfile) => {
  await Storage.set({ key: COMPANY_PROFILE, value: JSON.stringify(data)});
}

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

export const fetchCompanyProfileData = async (userId: string) => {
  const response: any = await fetchCompanyProfile(userId);
  return response as CompanyProfile;
}
