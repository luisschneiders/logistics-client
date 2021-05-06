import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const showModalCollectionClientData = (state: AppState) => state.modalReducer.isShowModalCollectionClient;
const showModalCollectionUserData = (state: AppState) => state.modalReducer.isShowModalCollectionUser;

export const showModalCollectionClient = createSelector(
  showModalCollectionClientData,
  (isShowModalCollectionClient: boolean) => {
    return isShowModalCollectionClient;
  }
);

export const showModalCollectionUser = createSelector(
  showModalCollectionUserData,
  (isShowModalCollectionUser: boolean) => {
    return isShowModalCollectionUser;
  }
);
