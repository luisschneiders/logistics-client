import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const showModalCollectionClientData = (state: AppState) => state.modalReducer.isShowModalCollectionClient;
const showModalCollectionDeliveryData = (state: AppState) => state.modalReducer.isShowModalCollectionDelivery;
const showModalCollectionUserData = (state: AppState) => state.modalReducer.isShowModalCollectionUser;

export const showModalCollectionClient = createSelector(
  showModalCollectionClientData,
  (isShow: boolean) => {
    return isShow;
  }
);

export const showModalCollectionDelivery = createSelector(
  showModalCollectionDeliveryData,
  (isShow: boolean) => {
    return isShow;
  }
);

export const showModalCollectionUser = createSelector(
  showModalCollectionUserData,
  (isShow: boolean) => {
    return isShow;
  }
);
