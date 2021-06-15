import { createSelector } from 'reselect';
import { CollectionClient, CollectionClientList, CollectionClientListActive } from '../../models/CollectionClient';
import { AppState } from '../app/app.state';

const getCollectionClientListData = (state: AppState) => state.collectionClientReducer.collectionClientList;
const getCollectionClientListActiveData = (state: AppState) => state.collectionClientReducer.collectionClientListActive;
const getCollectionClientData = (state: AppState) => state.collectionClientReducer.collectionClient;
const isFetchingCollectionClientListData = (state: AppState) => state.collectionClientReducer.isFetchingList;
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

export const getCollectionClientView = createSelector(
  getCollectionClientListData,
  (collectionClientList: CollectionClientList) => {
    const collectionClientViewFiltered: CollectionClientList = {
      ...collectionClientList,
      collectionClients: collectionClientList.collectionClients.filter((e: CollectionClient) => e.clientIsActive === true),
    }
    return collectionClientViewFiltered;
  }
);

export const getCollectionClientListActive = createSelector(
  getCollectionClientListActiveData,
  (data: CollectionClientListActive) => {
    return data;
  }
);

export const isFetchingCollectionClientList = createSelector(
  isFetchingCollectionClientListData,
  (isFetchingList: boolean) => {
    return isFetchingList;
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

export const getCollectionClientActiveFromList = createSelector(
  getCollectionClientListActiveData, getIdParam,
  (collectionClientList: CollectionClientListActive, id: string) => {
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
