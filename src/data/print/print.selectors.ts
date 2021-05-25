import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const printCollectionDeliveryData = (state: AppState) => state.printReducer.collectionDelivery;

export const printCollectionDelivery = createSelector(
  printCollectionDeliveryData,
  (data: any[]) => {
    return data;
  }
);
