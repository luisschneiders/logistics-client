import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const printCollectionDeliveryRunData = (state: AppState) => state.printReducer.collectionDeliveryRun;
const printCollectionDeliveryOverviewData = (state: AppState) => state.printReducer.collectionDeliveryOverview;

export const printCollectionDeliveryRun = createSelector(
  printCollectionDeliveryRunData,
  (data: any[]) => {
    return data;
  }
);

export const printCollectionDeliveryOverview = createSelector(
  printCollectionDeliveryOverviewData,
  (data: any[]) => {
    return data;
  }
);
