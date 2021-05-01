import { CollectionUser } from '../../models/CollectionUser';
import { CollectionUserList } from '../../models/CollectionUser';
import { RegisterUserForm } from '../../models/RegisterUserForm';
// import { UserType, UserTypeList } from '../../models/UserType';
import { ActionType } from '../../util/types';
import {
  // USER_TYPE_LIST_SET,
  // USER_TYPE_LIST_IS_FETCHING,
  // USER_TYPE_IS_SAVING,
  // USER_TYPE_UPDATE,
  // USER_TYPE_BY_ID_SET,
  COLLECTION_USER_ADD,
  COLLECTION_USER_LIST_SET,
  COLLECTION_USER_LIST_IS_FETCHING,
  COLLECTION_USER_IS_SAVING,
  COLLECTION_USER_LIST_LOAD_MORE_SET,
} from '../actionTypes';
import {
  // updateUserTypeData,
  // fetchUserTypeByIdData,
  addCollectionUserData,
  fetchCollectionUserData,
  fetchCollectionUserLoadMoreData
} from './data';

const saveCollectionUserAction = (data: Partial<CollectionUser>) => {
  return ({
    type: COLLECTION_USER_ADD,
    payload: data
  } as const);
}

// const updateUserTypeAction = (data: UserType) => {
//   return ({
//     type: USER_TYPE_UPDATE,
//     payload: data
//   } as const);
// }

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

// const setUserTypeByIdAction = (data: UserType) => {
//   return ({
//     type: USER_TYPE_BY_ID_SET,
//     payload: data
//   } as const);
// }

const isFetchingCollectionUserListAction = (isFetching: boolean) => {
  return ({
    type: COLLECTION_USER_LIST_IS_FETCHING,
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
  return isFetchingCollectionUserListAction(isFetching);
}

export const isSavingCollectionUser = (isSaving: boolean) => async () => {
  return isSavingCollectionUserAction(isSaving);
}

export const setCollectionUserList = (id: string, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingCollectionUserListAction(true));
  const data = await fetchCollectionUserData(id, pageSize);
  dispatch(isFetchingCollectionUserListAction(false));
  return setCollectionUserListAction(data);
}

export const setCollectionUserListLoadMore = (id: string, lastVisible: any, pageSize: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingCollectionUserListAction(true));
  const data = await fetchCollectionUserLoadMoreData(id, lastVisible, pageSize);
  dispatch(isFetchingCollectionUserListAction(false));
  return setCollectionUserListLoadMoreAction(data);
}

// export const setUserTypeById = (userId: number, userTypeId: number) => async (dispatch: React.Dispatch<any>) => {

//   const data = await fetchUserTypeByIdData(userId, userTypeId);

//   return setUserTypeByIdAction(data);
// }

export const addCollectionUser = (data: RegisterUserForm) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingCollectionUserAction(true));
  const collectionUser = await addCollectionUserData(data);
  dispatch(isSavingCollectionUserAction(false));
  return saveCollectionUserAction(collectionUser);
}

// export const updateUserType = (data: Partial<UserType>) => async (dispatch: React.Dispatch<any>) => {
//   const userType = await updateUserTypeData(data);
//   return updateUserTypeAction(userType);
// }

export type CollectionUserAction = 
  | ActionType<typeof addCollectionUser>
  | ActionType<typeof setCollectionUserList>
  | ActionType<typeof setCollectionUserListLoadMore>
  | ActionType<typeof isFetchingCollectionUserList>
  | ActionType<typeof isSavingCollectionUser>
  // | ActionType<typeof updateUserType>
  // | ActionType<typeof setUserTypeById>
