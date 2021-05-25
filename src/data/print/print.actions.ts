import { ActionType } from '../../util/types';
import {
  PRINT_COLLECTION_DELIVERY_SET,
} from '../actionTypes';

const setPrintCollectionDeliveryAction = (data: any[]) => {
  return ({
    type: PRINT_COLLECTION_DELIVERY_SET,
    payload: data
  } as const);
}

export const setPrintCollectionDelivery = (data: any[]) => async () => {
  return setPrintCollectionDeliveryAction(data);
}

export type PrintAction = 
  | ActionType<typeof setPrintCollectionDelivery>
