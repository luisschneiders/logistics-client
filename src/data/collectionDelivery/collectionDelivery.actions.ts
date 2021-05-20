import { CollectionDelivery, CollectionDeliveryList } from '../../models/CollectionDelivery';
import { Period } from '../../models/Period';
import { ActionType } from '../../util/types';
import {
  COLLECTION_DELIVERY_ADD,
  COLLECTION_DELIVERY_BY_ID_SET,
  COLLECTION_DELIVERY_IS_FETCHING,
  COLLECTION_DELIVERY_IS_SAVING,
  COLLECTION_DELIVERY_IS_UPDATING,
  COLLECTION_DELIVERY_LIST_RESET,
  COLLECTION_DELIVERY_LIST_SET,
  COLLECTION_DELIVERY_UPDATE,
} from '../actionTypes';
import {
  addCollectionDeliveryData,
  fetchCollectionDeliveryByIdData,
  fetchCollectionDeliveryData,
  updateCollectionDeliveryData
} from './data';

const resetCollectionDeliveryListAction = () => {
  return ({
    type: COLLECTION_DELIVERY_LIST_RESET,
    payload: {}
  } as const);
}

const setCollectionDeliveryListAction = (data: CollectionDeliveryList) => {
  return ({
    type: COLLECTION_DELIVERY_LIST_SET,
    payload: data
  } as const);
}

const setCollectionDeliveryByIdAction = (data: CollectionDelivery) => {
  return ({
    type: COLLECTION_DELIVERY_BY_ID_SET,
    payload: data
  } as const);
}

const addCollectionDeliveryAction = (data: Partial<CollectionDelivery>) => {
  return ({
    type: COLLECTION_DELIVERY_ADD,
    payload: data
  } as const);
}

const updateCollectionDeliveryAction = (data: CollectionDelivery) => {
  return ({
    type: COLLECTION_DELIVERY_UPDATE,
    payload: data
  } as const);
}

const isFetchingCollectionDeliveryAction = (isFeeting: boolean) => {
  return ({
    type: COLLECTION_DELIVERY_IS_FETCHING,
    payload: isFeeting
  } as const);
}

const isSavingCollectionDeliveryAction = (isSaving: boolean) => {
  return ({
    type: COLLECTION_DELIVERY_IS_SAVING,
    payload: isSaving
  } as const);
}

const isUpdatingCollectionDeliveryAction = (isUpdating: boolean) => {
  return ({
    type: COLLECTION_DELIVERY_IS_UPDATING,
    payload: isUpdating
  } as const);
}

export const resetCollectionDeliveryList = () => async () => {
  return resetCollectionDeliveryListAction();
}

export const setCollectionDeliveryList = (companyId: string, period: Period) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isFetchingCollectionDeliveryAction(true));
  const data = await fetchCollectionDeliveryData(companyId, period);
  dispatch(isFetchingCollectionDeliveryAction(false));
  return setCollectionDeliveryListAction(data);
}

export const setCollectionDeliveryById = (deliveryId: string) => async (dispatch: React.Dispatch<any>) => {
  const data = await fetchCollectionDeliveryByIdData(deliveryId);
  return setCollectionDeliveryByIdAction(data);
}

export const isFetchingCollectionDelivery = (isFetching: boolean) => async () => {
  return isFetchingCollectionDeliveryAction(isFetching);
}

export const isSavingCollectionDelivery = (isSaving: boolean) => async () => {
  return isSavingCollectionDeliveryAction(isSaving);
}

export const isUpdatingCollectionDelivery = (isUpdating: boolean) => async () => {
  return isUpdatingCollectionDeliveryAction(isUpdating);
}

export const addCollectionDelivery = (data: Partial<CollectionDelivery>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isSavingCollectionDeliveryAction(true));
  const collectionDelivery = await addCollectionDeliveryData(data);
  dispatch(isSavingCollectionDeliveryAction(false));
  return addCollectionDeliveryAction(collectionDelivery);
}

export const updateCollectionDelivery = (data: Partial<CollectionDelivery>) => async (dispatch: React.Dispatch<any>) => {
  dispatch(isUpdatingCollectionDeliveryAction(true));
  const collectionDelivery = await updateCollectionDeliveryData(data);
  dispatch(isUpdatingCollectionDeliveryAction(false));
  return updateCollectionDeliveryAction(collectionDelivery);
}

export type CollectionDeliveryAction =
  | ActionType<typeof resetCollectionDeliveryList>
  | ActionType<typeof setCollectionDeliveryById>
  | ActionType<typeof setCollectionDeliveryList>
  | ActionType<typeof addCollectionDelivery>
  | ActionType<typeof isFetchingCollectionDelivery>
  | ActionType<typeof isSavingCollectionDelivery>
  | ActionType<typeof isUpdatingCollectionDelivery>
  | ActionType<typeof updateCollectionDelivery>
