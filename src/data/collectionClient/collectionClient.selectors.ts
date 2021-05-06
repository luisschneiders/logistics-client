import { createSelector } from 'reselect';
import { CollectionClient, CollectionClientList } from '../../models/CollectionClient';
import { AppState } from '../app/app.state';

const getCollectionClientListData = (state: AppState) => state.collectionClientReducer.collectionClientList;
const getCollectionClientData = (state: AppState) => state.collectionClientReducer.collectionClient;
const isFetchingCollectionClientListData = (state: AppState) => state.collectionClientReducer.isFetching;
const isSavingCollectionClientData = (state: AppState) => state.collectionClientReducer.isSaving;
const isUpdatingCollectionClientData = (state: AppState) => state.collectionClientReducer.isUpdating;
const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getCollectionClientList = createSelector(
  getCollectionClientListData,
  (collectionClientList: CollectionClientList) => {
    return collectionClientList;
  }
);

export const isFetchingCollectionClientList = createSelector(
  isFetchingCollectionClientListData,
  (isFetching: boolean) => {
    return isFetching;
  }
);

export const isSavingCollectionClient = createSelector(
  isSavingCollectionClientData,
  (isSaving: boolean) => {
    return isSaving;
  }
);

export const isUpdatingCollectionClient = createSelector(
  isUpdatingCollectionClientData,
  (isUpdating: boolean) => {
    return isUpdating;
  }
);

export const getCollectionClientFromList = createSelector(
  getCollectionClientListData, getIdParam,
  (collectionClientList: CollectionClientList, id: string) => {
    if (collectionClientList && collectionClientList.collectionClients && collectionClientList.collectionClients.length > 0) {
      return collectionClientList.collectionClients.find((e: any) => e.clientId === id);
    }
  }  
);

export const getCollectionClient = createSelector(
  getCollectionClientData,
  (collectionClients: CollectionClient) => {
    return collectionClients;
  }  
);
