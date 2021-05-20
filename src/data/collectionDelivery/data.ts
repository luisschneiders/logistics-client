import {
  CollectionDelivery, CollectionDeliveryList,
} from '../../models/CollectionDelivery';
import { Period } from '../../models/Period';
import {
  addCollectionDelivery,
  fetchCollectionDeliveryById,
  fetchCollectionDeliveryList,
  updateCollectionDelivery
} from '../api/CollectionDelivery';

export const fetchCollectionDeliveryData = async (companyId: string, period: Period) => {
  const response: any = await fetchCollectionDeliveryList(companyId, period);
  return response as CollectionDeliveryList;
}

export const fetchCollectionDeliveryByIdData = async (deliveryId: string) => {
  const response: any = await fetchCollectionDeliveryById(deliveryId);
  return response as CollectionDelivery;
}

export const addCollectionDeliveryData = async (data: Partial<CollectionDelivery>) => {
  const response: any = await addCollectionDelivery(data);
  return response as CollectionDelivery;
}

export const updateCollectionDeliveryData = async (data: Partial<CollectionDelivery>) => {
  const response: any = await updateCollectionDelivery(data);
  return response as CollectionDelivery;
}
