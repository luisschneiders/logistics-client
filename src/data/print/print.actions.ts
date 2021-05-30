import { ActionType } from '../../util/types';
import {
  PRINT_COLLECTION_DELIVERY_OVERVIEW_SET,
  PRINT_COLLECTION_DELIVERY_RUN_SET,
} from '../actionTypes';

const setPrintCollectionDeliveryRunAction = (data: any[]) => {
  return ({
    type: PRINT_COLLECTION_DELIVERY_RUN_SET,
    payload: data
  } as const);
}

const setPrintCollectionDeliveryOverviewAction = (data: any[]) => {
  return ({
    type: PRINT_COLLECTION_DELIVERY_OVERVIEW_SET,
    payload: data
  } as const);
}

export const setPrintCollectionDeliveryRun = (data: any[]) => async () => {
  return setPrintCollectionDeliveryRunAction(data);
}

export const setPrintCollectionDeliveryOverview = (data: any[]) => async () => {
  return setPrintCollectionDeliveryOverviewAction(data);
}

export type PrintAction = 
  | ActionType<typeof setPrintCollectionDeliveryRun>
  | ActionType<typeof setPrintCollectionDeliveryOverview>
