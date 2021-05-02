import { CollectionUser } from '../../models/CollectionUser';
import { CollectionUserList } from '../../models/CollectionUser';
import { RegisterUserForm } from '../../models/RegisterUserForm';
import { ActionType } from '../../util/types';
import {
  COLLECTION_USER_ADD,
  COLLECTION_USER_LIST_SET,
  COLLECTION_USER_IS_SAVING,
  COLLECTION_USER_LIST_LOAD_MORE_SET,
  COLLECTION_USER_BY_ID_SET,
  COLLECTION_USER_UPDATE,
  COLLECTION_USER_IS_FETCHING,
} from '../actionTypes';
import {
  addCollectionUserData,
  fetchCollectionUserByIdData,
  fetchCollectionUserData,
  fetchCollectionUserLoadMoreData,
  updateCollectionUserData
} from './data';

const saveCollectionUserAction = (data: Partial<CollectionUser>) => {
  return ({
    type: COLLECTION_USER_ADD,
    payload: data
  } as const);
}

const updateCollectionUserAction = (data: CollectionUser) => {
  return ({
    type: COLLECTION_USER_UPDATE,
    payload: data
  } as const);
}

const setCollectionUserListAction = (data: CollectionUserList) => {
  return ({
    type: COLLECTION_USER_LIST_SET,
    payload: data
  } as const);
}

const setCollectionUserListLoadMoreAction = (data: CollectionUserList) => {
  return ({
    type: COLLECTION_USER_LIST_LOAD_MORE_SET,
    payload: data
  } as const);
}

const setCollectionUserByIdAction = (data: CollectionUser) => {
  return ({
    type: COLLECTION_USER_BY_ID_SET,
    payload: data
  } as const);
}

const isFetchingCollectionUserAction = (isFetching: boolean) => {
  return ({
    type: COLLECTION_USER_IS_FETCHING,
    payload: isFetching
  } as const);
}

const isSavingCollectionUserAction = (isSaving: boolean) => {
  return ({
    type: COLLECTION_USER_IS_SAVING,
    payload: isSaving
  } as const);
}

export const isFetchingCollectionUserList = (isFetching: boolean) => async () => {
  return isFetchingCollectionUserAction(isFetching);
}

export const isSavingCollectionUser = (isSaving: boolean) => async () => {
  return isSavingCollectionUserAction(isSaving);
}

export const setCollectionUserList = (id: string, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingCollectionUserAction(true));
  const data = await fetchCollectionUserData(id, pageSize);
  dispatch(isFetchingCollectionUserAction(false));
  return setCollectionUserListAction(data);
}

export const setCollectionUserListLoadMore = (id: string, lastVisible: any, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingCollectionUserAction(true));
  const data = await fetchCollectionUserLoadMoreData(id, lastVisible, pageSize);
  dispatch(isFetchingCollectionUserAction(false));
  return setCollectionUserListLoadMoreAction(data);
}

export const setCollectionUserById = (collectionUserId: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingCollectionUserAction(true));
  const data = await fetchCollectionUserByIdData(collectionUserId);
  dispatch(isFetchingCollectionUserAction(false));
  return setCollectionUserByIdAction(data);
}

export const addCollectionUser = (data: RegisterUserForm) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingCollectionUserAction(true));
  const collectionUser = await addCollectionUserData(data);
  dispatch(isSavingCollectionUserAction(false));
  return saveCollectionUserAction(collectionUser);
}

export const updateCollectionUser = (data: Partial<CollectionUser>) => async (dispatch: React.Dispatch<any>) => {
  const collectionUser = await updateCollectionUserData(data);
  return updateCollectionUserAction(collectionUser);
}

export type CollectionUserAction = 
  | ActionType<typeof addCollectionUser>
  | ActionType<typeof setCollectionUserList>
  | ActionType<typeof setCollectionUserListLoadMore>
  | ActionType<typeof isFetchingCollectionUserList>
  | ActionType<typeof isSavingCollectionUser>
  | ActionType<typeof updateCollectionUser>
  | ActionType<typeof setCollectionUserById>
