import { createSelector } from 'reselect';
import { CollectionUser, CollectionUserList } from '../../models/CollectionUser';
import { AppState } from '../app/app.state';

const getCollectionUserListData = (state: AppState) => state.collectionUserReducer.collectionUserList;
const getCollectionUserData = (state: AppState) => state.collectionUserReducer.collectionUser;
const isFetchingCollectionUserListData = (state: AppState) => state.collectionUserReducer.isFetching;
const isSavingCollectionUserData = (state: AppState) => state.collectionUserReducer.isSaving;
const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getCollectionUserList = createSelector(
  getCollectionUserListData,
  (collectionUserList: CollectionUserList) => {
    return collectionUserList;
  }
);

export const isFetchingCollectionUserList = createSelector(
  isFetchingCollectionUserListData,
  (isFetching: boolean) => {
    return isFetching;
  }
);

export const isSavingCollectionUser = createSelector(
  isSavingCollectionUserData,
  (isSaving: boolean) => {
    return isSaving;
  }
);

export const getCollectionUserFromList = createSelector(
  getCollectionUserListData, getIdParam,
  (collectionUserList: CollectionUserList, id: string) => {
    if (collectionUserList && collectionUserList.collectionUsers && collectionUserList.collectionUsers.length > 0) {
      return collectionUserList.collectionUsers.find((e: any) => e.userId === id);
    }
  }  
);

export const getCollectionUser = createSelector(
  getCollectionUserData,
  (collectionUsers: CollectionUser) => {
    return collectionUsers;
  }  
);
