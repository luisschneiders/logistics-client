import { CollectionUser, CollectionUserList } from '../../models/CollectionUser';
import { RegisterUserForm } from '../../models/RegisterUserForm';
// import {
//   UserType,
// } from '../../models/UserType';
import {
  addCollectionUser,
  fetchCollectionUserById,
  fetchCollectionUserList,
  fetchCollectionUserListLoadMore,
  updateCollectionUser
} from '../api/CollectionUser';

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

export const fetchCollectionUserByIdData = async (collectionUserId: string) => {
  const response: any = await fetchCollectionUserById(collectionUserId);
  return response as CollectionUser;
}

export const addCollectionUserData = async (data: RegisterUserForm) => {
  const response: any = await addCollectionUser(data);
  return response as RegisterUserForm;
}

export const updateCollectionUserData = async (data: Partial<CollectionUser>) => {
  const response: any = await updateCollectionUser(data);
  return response as CollectionUser;
}
