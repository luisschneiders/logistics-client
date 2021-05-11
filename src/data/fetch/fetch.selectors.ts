import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const isFetchingCollectionClientListData = (state: AppState) => state.fetchReducer.isFetchingCollectionClientList;
const isFetchingCollectionClientViewData = (state: AppState) => state.fetchReducer.isFetchingCollectionClientView;

export const isFetchingCollectionClientList = createSelector(
  isFetchingCollectionClientListData,
  (isFetchingCollectionClientList: boolean) => {
    return isFetchingCollectionClientList;
  }
);

export const isFetchingCollectionClientView = createSelector(
  isFetchingCollectionClientViewData,
  (isFetchingCollectionClientView: boolean) => {
    return isFetchingCollectionClientView;
  }
);
