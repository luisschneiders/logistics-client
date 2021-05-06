import {
  CollectionClient,
  CollectionClientList
} from '../../models/CollectionClient';
import {
  addCollectionClient,
  fetchCollectionClientById,
  fetchCollectionClientList,
  fetchCollectionClientListLoadMore,
  updateCollectionClient
} from '../api/CollectionClient';

export const fetchCollectionClientData = async (id: string, pageSize: number) => {
  const response: any = await fetchCollectionClientList(id, pageSize);
  return response as CollectionClientList;
}

export const fetchCollectionClientLoadMoreData = async (id: string, lastVisible: any, pageSize: number) => {
  const response: any = await fetchCollectionClientListLoadMore(id, lastVisible, pageSize);
  return response as CollectionClientList;
}

export const fetchCollectionClientByIdData = async (collectionClientId: string) => {
  const response: any = await fetchCollectionClientById(collectionClientId);
  return response as CollectionClient;
}

export const addCollectionClientData = async (data: Partial<CollectionClient>) => {
  const response: any = await addCollectionClient(data);
  return response as CollectionClient;
}

export const updateCollectionClientData = async (data: Partial<CollectionClient>) => {
  const response: any = await updateCollectionClient(data);
  return response as CollectionClient;
}
