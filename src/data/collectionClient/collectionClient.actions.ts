import { CollectionClient, CollectionClientListActive } from '../../models/CollectionClient';
import { CollectionClientList } from '../../models/CollectionClient';
import { ActionType } from '../../util/types';
import {
  COLLECTION_CLIENT_ADD,
  COLLECTION_CLIENT_LIST_SET,
  COLLECTION_CLIENT_IS_SAVING,
  COLLECTION_CLIENT_LIST_LOAD_MORE_SET,
  COLLECTION_CLIENT_BY_ID_SET,
  COLLECTION_CLIENT_UPDATE,
  COLLECTION_CLIENT_IS_UPDATING,
  COLLECTION_CLIENT_IS_FETCHING_LIST,
  COLLECTION_CLIENT_LIST_RESET,
  COLLECTION_CLIENT_LIST_ACTIVE_SET,
  COLLECTION_CLIENT_LIST_ACTIVE_RESET,
} from '../actionTypes';
import {
  addCollectionClientData,
  fetchCollectionClientByIdData,
  fetchCollectionClientData,
  fetchCollectionClientListActiveData,
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

const resetCollectionClientListAction = () => {
  return ({
    type: COLLECTION_CLIENT_LIST_RESET,
    payload: {}
  } as const);
}

const resetCollectionClientListActiveAction = () => {
  return ({
    type: COLLECTION_CLIENT_LIST_ACTIVE_RESET,
    payload: {}
  } as const);
}

const setCollectionClientListAction = (data: CollectionClientList) => {
  return ({
    type: COLLECTION_CLIENT_LIST_SET,
    payload: data
  } as const);
}

const setCollectionClientListActiveAction = (data: CollectionClientListActive) => {
  return ({
    type: COLLECTION_CLIENT_LIST_ACTIVE_SET,
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

const isFetchingListCollectionClientAction = (isFetchingList: boolean) => {
  return ({
    type: COLLECTION_CLIENT_IS_FETCHING_LIST,
    payload: isFetchingList
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

export const isFetchingCollectionClientList = (isFetchingList: boolean) => async () => {
  return isFetchingListCollectionClientAction(isFetchingList);
}

export const isSavingCollectionClient = (isSaving: boolean) => async () => {
  return isSavingCollectionClientAction(isSaving);
}

export const isUpdatingCollectionClient = (isUpdating: boolean) => async () => {
  return isUpdatingCollectionClientAction(isUpdating);
}

export const resetCollectionClientList = () => async () => {
  return resetCollectionClientListAction();
}

export const resetCollectionClientListActive = () => async () => {
  return resetCollectionClientListActiveAction();
}

export const setCollectionClientList = (id: string, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingListCollectionClientAction(true));
  const data = await fetchCollectionClientData(id, pageSize);
  dispatch(isFetchingListCollectionClientAction(false));
  return setCollectionClientListAction(data);
}

export const setCollectionClientListActive = (companyId: string) => async () => {
  const data = await fetchCollectionClientListActiveData(companyId);
  return setCollectionClientListActiveAction(data)
}

export const setCollectionClientListLoadMore = (id: string, lastVisible: any, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingListCollectionClientAction(true));
  const data = await fetchCollectionClientLoadMoreData(id, lastVisible, pageSize);
  dispatch(isFetchingListCollectionClientAction(false));
  return setCollectionClientListLoadMoreAction(data);
}

export const setCollectionClientById = (collectionClientId: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingListCollectionClientAction(true));
  const data = await fetchCollectionClientByIdData(collectionClientId);
  dispatch(isFetchingListCollectionClientAction(false));
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
  | ActionType<typeof resetCollectionClientList>
  | ActionType<typeof resetCollectionClientListActive>
  | ActionType<typeof setCollectionClientList>
  | ActionType<typeof setCollectionClientListActive>
  | ActionType<typeof setCollectionClientListLoadMore>
  | ActionType<typeof isFetchingCollectionClientList>
  | ActionType<typeof isSavingCollectionClient>
  | ActionType<typeof isUpdatingCollectionClient>
  | ActionType<typeof updateCollectionClient>
  | ActionType<typeof setCollectionClientById>
