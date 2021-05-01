import { Plugins } from '@capacitor/core';
import {
  COMPANY_PROFILE,
  COMPANY_USER,
  EXPENSES_TIME_TRANSITION,
  HOME_TIME_TRANSITION,
  TRANSACTIONS_TIME_TRANSITION,
} from '../../constants/Storage';
import { CompanyType } from '../../enum/CompanyType';
import { RoleType } from '../../enum/RoleType';
import { CompanyProfile } from '../../models/CompanyProfile';
import { CompanyUser } from '../../models/CompanyUser';
import { Period } from '../../models/Period';
import { fetchCompanyProfile, fetchCompanyUser } from '../api/CollectionCompany';

const { Storage } = Plugins;

export const getStorageCompanyProfile = async (userId: string) => {
  const response: any  = await Storage.get({ key: COMPANY_PROFILE });
  const responseObj: CompanyProfile = JSON.parse(response.value);

  if (responseObj && responseObj.companyId && responseObj.companyId.length !== 0) {
    return responseObj;
  } else {
    const fetchCompany = await fetchCompanyProfileData(userId);

    if (fetchCompany && fetchCompany.companyId && fetchCompany.companyId.length !== 0) {
      const companyProfile: CompanyProfile = {
        companyId: fetchCompany.companyId,
        companyName: fetchCompany.companyName,
        companyAbnAcn: fetchCompany.companyAbnAcn,
        companyType: fetchCompany.companyType,
      }
      return companyProfile;
    } else {
      // TODO: Create a reminder in the app that there is no company associated to the user.
      const companyProfile: CompanyProfile = {
        companyId: '',
        companyName: '',
        companyAbnAcn: '',
        companyType: CompanyType.ABN,
      }
      return companyProfile;
    }
  }
}

export const getStorageCompanyUser = async (userId: string) => {
  const response: any  = await Storage.get({ key: COMPANY_USER });
  const responseObj: CompanyUser = JSON.parse(response.value);

  if (responseObj && responseObj.userId && responseObj.userId.length !== 0) {
    return responseObj;
  } else {
    const fetchCompanyUser = await fetchCompanyUserData(userId);

    if (fetchCompanyUser && fetchCompanyUser.userId && fetchCompanyUser.userId.length !== 0) {
      const companyUser: CompanyUser = {
        userId: fetchCompanyUser.userId,
        userEmail: fetchCompanyUser.userEmail,
        userName: fetchCompanyUser.userName,
        userRole: fetchCompanyUser.userRole,
        userIsActive: fetchCompanyUser.userIsActive
      }
      return companyUser;
    } else {
      const companyUser: CompanyUser = {
        userId: '',
        userEmail: '',
        userName: '',
        userRole: RoleType.USER,
        userIsActive: false,
      }
      return companyUser;
    }
  }
}

export const setStorageCompanyProfile = async (data: CompanyProfile) => {
  await Storage.set({ key: COMPANY_PROFILE, value: JSON.stringify(data)});
}

export const setStorageCompanyUser = async (data: CompanyUser) => {
  await Storage.set({ key: COMPANY_USER, value: JSON.stringify(data)});
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

export const fetchCompanyUserData = async (userId: string) => {
  const response: any = await fetchCompanyUser(userId);
  return response as CompanyUser;
}
