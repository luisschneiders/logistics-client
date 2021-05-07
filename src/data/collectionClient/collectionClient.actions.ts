import { CollectionClient } from '../../models/CollectionClient';
import { CollectionClientList } from '../../models/CollectionClient';
import { ActionType } from '../../util/types';
import {
  COLLECTION_CLIENT_ADD,
  COLLECTION_CLIENT_LIST_SET,
  COLLECTION_CLIENT_IS_SAVING,
  COLLECTION_CLIENT_LIST_LOAD_MORE_SET,
  COLLECTION_CLIENT_BY_ID_SET,
  COLLECTION_CLIENT_UPDATE,
  COLLECTION_CLIENT_IS_FETCHING,
  COLLECTION_CLIENT_IS_UPDATING,
} from '../actionTypes';
import {
  addCollectionClientData,
  fetchCollectionClientByIdData,
  fetchCollectionClientData,
  fetchCollectionClientLoadMoreData,
  updateCollectionClientData
} from './data';

const addCollectionClientAction = (data: Partial<CollectionClient>) => {
  return ({
    type: COLLECTION_CLIENT_ADD,
    payload: data
  } as const);
}

const updateCollectionClientAction = (data: CollectionClient) => {
  return ({
    type: COLLECTION_CLIENT_UPDATE,
    payload: data
  } as const);
}

const setCollectionClientListAction = (data: CollectionClientList) => {
  return ({
    type: COLLECTION_CLIENT_LIST_SET,
    payload: data
  } as const);
}

const setCollectionClientListLoadMoreAction = (data: CollectionClientList) => {
  return ({
    type: COLLECTION_CLIENT_LIST_LOAD_MORE_SET,
    payload: data
  } as const);
}

const setCollectionClientByIdAction = (data: CollectionClient) => {
  return ({
    type: COLLECTION_CLIENT_BY_ID_SET,
    payload: data
  } as const);
}

const isFetchingCollectionClientAction = (isFetching: boolean) => {
  return ({
    type: COLLECTION_CLIENT_IS_FETCHING,
    payload: isFetching
  } as const);
}

const isSavingCollectionClientAction = (isSaving: boolean) => {
  return ({
    type: COLLECTION_CLIENT_IS_SAVING,
    payload: isSaving
  } as const);
}

const isUpdatingCollectionClientAction = (isUpdating: boolean) => {
  return ({
    type: COLLECTION_CLIENT_IS_UPDATING,
    payload: isUpdating
  } as const);
}

export const isFetchingCollectionClientList = (isFetching: boolean) => async () => {
  return isFetchingCollectionClientAction(isFetching);
}

export const isSavingCollectionClient = (isSaving: boolean) => async () => {
  return isSavingCollectionClientAction(isSaving);
}

export const isUpdatingCollectionClient = (isUpdating: boolean) => async () => {
  return isUpdatingCollectionClientAction(isUpdating);
}

export const setCollectionClientList = (id: string, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingCollectionClientAction(true));
  const data = await fetchCollectionClientData(id, pageSize);
  dispatch(isFetchingCollectionClientAction(false));
  return setCollectionClientListAction(data);
}

export const setCollectionClientListLoadMore = (id: string, lastVisible: any, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingCollectionClientAction(true));
  const data = await fetchCollectionClientLoadMoreData(id, lastVisible, pageSize);
  dispatch(isFetchingCollectionClientAction(false));
  return setCollectionClientListLoadMoreAction(data);
}

export const setCollectionClientById = (collectionClientId: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingCollectionClientAction(true));
  const data = await fetchCollectionClientByIdData(collectionClientId);
  dispatch(isFetchingCollectionClientAction(false));
  return setCollectionClientByIdAction(data);
}

export const addCollectionClient = (data: Partial<CollectionClient>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingCollectionClientAction(true));
  const collectionClient = await addCollectionClientData(data);
  dispatch(isSavingCollectionClientAction(false));
  return addCollectionClientAction(collectionClient);
}

export const updateCollectionClient = (data: Partial<CollectionClient>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isUpdatingCollectionClientAction(true));
  const collectionClient = await updateCollectionClientData(data);
  dispatch(isUpdatingCollectionClientAction(false));
  return updateCollectionClientAction(collectionClient);
}

export type CollectionClientAction = 
  | ActionType<typeof addCollectionClient>
  | ActionType<typeof setCollectionClientList>
  | ActionType<typeof setCollectionClientListLoadMore>
  | ActionType<typeof isFetchingCollectionClientList>
  | ActionType<typeof isSavingCollectionClient>
  | ActionType<typeof isUpdatingCollectionClient>
  | ActionType<typeof updateCollectionClient>
  | ActionType<typeof setCollectionClientById>