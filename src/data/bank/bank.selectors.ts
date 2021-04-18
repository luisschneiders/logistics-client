import { createSelector } from 'reselect';
import { Bank, BankList, BankStatusActive } from '../../models/Bank';
import { AppState } from '../app/app.state';

const getBankListData = (state: AppState) => state.bankReducer.bankList;
const getBankStatusActiveData = (state: AppState) => state.bankReducer.bankStatusActive;
const getBankData = (state: AppState) => state.bankReducer.bank;
const isFetchingBankListData = (state: AppState) => state.bankReducer.isFetching;
const isSavingBankData = (state: AppState) => state.bankReducer.isSaving;
const showBankModalData = (state: AppState) => state.bankReducer.showBankModal;
const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getBankList = createSelector(
  getBankListData,
  (bankList: BankList) => {
    return bankList;
  }
);

export const getBankStatusActive = createSelector(
  getBankStatusActiveData,
  (bankStatusActive: BankStatusActive) => {
    return bankStatusActive;
  }
);

export const isFetchingBankList = createSelector(
  isFetchingBankListData,
  (isFetching: boolean) => {
    return isFetching;
  }
);

export const isSavingBank = createSelector(
  isSavingBankData,
  (isSaving: boolean) => {
    return isSaving;
  }
);

export const showBankModal = createSelector(
  showBankModalData,
  (showBankModal: boolean) => {
    return showBankModal;
  }
);

export const getBankFromList = createSelector(
  getBankListData, getIdParam,
  (bankList: BankList, id: number) => {
    if (bankList && bankList.banks && bankList.banks.length > 0) {
      return bankList.banks.find((e: any) => e.bankId.toString() === id);
    }
  }
);

export const getBank = createSelector(
  getBankData,
  (banks: Bank) => {
    return banks;
  }
);
