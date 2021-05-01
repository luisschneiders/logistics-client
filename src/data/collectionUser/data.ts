import { CollectionUserList } from '../../models/CollectionUser';
import { RegisterUserForm } from '../../models/RegisterUserForm';
// import {
//   UserType,
// } from '../../models/UserType';
import { addCollectionUser, fetchCollectionUserList, fetchCollectionUserListLoadMore } from '../api/CollectionUser';

// import {
//   updateUserType,
//   fetchUserTypeById,
// } from '../api/UserType';

export const fetchCollectionUserData = async (id: string, pageSize: number) => {
  const response: any = await fetchCollectionUserList(id, pageSize);
  return response as CollectionUserList;
}

export const fetchCollectionUserLoadMoreData = async (id: string, lastVisible: any, pageSize: number) => {
  const response: any = await fetchCollectionUserListLoadMore(id, lastVisible, pageSize);
  return response as CollectionUserList;
}

// export const fetchUserTypeByIdData = async (userId: number, userTypeId: number) => {
//   const response: any = await fetchUserTypeById(userId, userTypeId);
//   return response as UserType;
// }

export const addCollectionUserData = async (data: RegisterUserForm) => {
  const response: any = await addCollectionUser(data);
  return response as RegisterUserForm;
}

// export const updateUserTypeData = async (data: Partial<UserType>) => {
//   const response: any = await updateUserType(data);
//   return response as UserType;
// }
