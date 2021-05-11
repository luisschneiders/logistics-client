import { combineReducers } from '../combineReducers';
import { collectionClientReducer } from '../collectionClient/collectionClient.reducer';
import { collectionUserReducer } from '../collectionUser/collectionUser.reducer';
import { sessionsReducer } from '../sessions/sessions.reducer';
import { userReducer } from '../user/user.reducer';
import { modalReducer } from '../modal/modal.reducer';
import { fetchReducer } from '../fetch/fetch.reducer';
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
    isShowModalCollectionClient: false,
    isShowModalCollectionUser: false,
  },
  fetchReducer: {
    isFetchingCollectionClientList: false,
    isFetchingCollectionClientView: false,
    isFetchingCollectionUserList: false,
  },
  collectionClientReducer: {
    collectionClientList: {
      collectionClients: [],
      pagination: { page: 1, pageSize: PageListItem.ITEM_100, pageCount: 0, rowCount: 0 },
    },
    collectionClient: {
      companyId: '',
      clientId: '',
      clientName: '',
      clientAddress: {
        address: '',
        lat: undefined,
        lng: undefined,
        suburb: '',
        postcode: 0,
        state: ''
      },
      clientPhone: '',
      companyAbnAcn: '',
      clientEmployee: [],
      clientIsActive: false,
      createdAt: '',
      updatedAt: '',
    },
    isFetchingList: false,
    isSaving: false,
    isUpdating: false,
  },
  collectionUserReducer: {
    collectionUserList: {
      collectionUsers: [],
      pagination: { page: 1, pageSize: PageListItem.ITEM_100, pageCount: 0, rowCount: 0 },
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
    isUpdating: false,
  },
};

export const rootReducer = combineReducers({
  collectionUserReducer,
  collectionClientReducer,
  sessionsReducer,
  userReducer,
  modalReducer,
  fetchReducer,
});

export const reducers = (state: any, action: any) => {

  if (action.type === APP_STORE_RESET) {
    const { userReducer } = state;
    state = { ...initialState, userReducer };
  }

  return rootReducer(state, action)
}

export type AppState = ReturnType<typeof reducers>;
