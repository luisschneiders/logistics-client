import { combineReducers } from '../combineReducers';
import { collectionUserReducer } from '../collectionUser/collectionUser.reducer';
import { sessionsReducer } from '../sessions/sessions.reducer';
import { userReducer } from '../user/user.reducer';
import { modalReducer } from '../modal/modal.reducer';
import { APP_STORE_RESET } from '../actionTypes';
import { PageListItem } from '../../enum/PageListItem';
import { CompanyType } from '../../enum/CompanyType';
import { RoleType } from '../../enum/RoleType';

export const initialState: AppState = {
  sessionsReducer: {
    menuEnabled: true,
    companyProfile: {
      companyId: '',
      companyName: '',
      companyAbnAcn: '',
      companyType: CompanyType.ABN,
      companyCreatedBy: '',
      companyEmail: '',
    },
    companyUser: {
      userId: '',
      userEmail: '',
      userName: '',
      userRole: RoleType.USER,
      userIsActive: false,
    },
    homeTimeTransition: '0',
    expensesTimeTransition: { startDate: '', endDate: '' },
    transactionsTimeTransition: { startDate: '', endDate: '' },
  },
  userReducer: {
    darkMode: false,
    hasSeenWelcome: false,
    isLoggedIn: false,
  },
  modalReducer: {
    // isShowModalBank: false,
    isShowModalCollectionUser: false,
    // isShowModalExpensesAdd: false,
    // isShowModalExpensesSearch: false,
    // isShowModalExpenseType: false,
    // isShowModalTransactionsSearch: false,
    // isShowModalTransactionType: false,
    // isShowModalUserType: false,
    // isShowModalVehicle: false,
  },
  collectionUserReducer: {
    collectionUserList: {
      collectionUsers: [],
      pagination: { page: 1, pageSize: PageListItem.ITEM_12, pageCount: 0, rowCount: 0 },
    },
    collectionUser: {
      companyId: '',
      userId: '',
      userEmail: '',
      userName: '',
      userRole: '',
      userIsActive: false,
      createdAt: '',
      updatedAt: '',
    },
    isFetching: false,
    isSaving: false,
  },
};

export const rootReducer = combineReducers({
  collectionUserReducer,
  sessionsReducer,
  userReducer,
  modalReducer,
});

export const reducers = (state: any, action: any) => {

  if (action.type === APP_STORE_RESET) {
    const { userReducer } = state;
    state = { ...initialState, userReducer };
  }

  return rootReducer(state, action)
}

export type AppState = ReturnType<typeof reducers>;
