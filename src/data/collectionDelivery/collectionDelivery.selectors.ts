import { createSelector } from 'reselect';
import { CollectionDelivery, CollectionDeliveryGroup } from '../../models/CollectionDelivery';
import { groupBy } from '../../util/groupBy';
import { AppState } from '../app/app.state';

const getCollectionDeliveryData = (state: AppState) => state.collectionDeliveryReducer.collectionDeliveryList;
const isFetchingCollectionDeliveryData = (state: AppState) => state.collectionDeliveryReducer.isFetching;
const isSavingCollectionDeliveryData = (state: AppState) => state.collectionDeliveryReducer.isSaving;
const isUpdatingCollectionDeliveryData = (state: AppState) => state.collectionDeliveryReducer.isUpdating;

export const isFetchingCollectionDelivery = createSelector(
  isFetchingCollectionDeliveryData,
  (isFetching: boolean) => {
    return isFetching;
  }
);

export const isSavingCollectionDelivery = createSelector(
  isSavingCollectionDeliveryData,
  (isSaving: boolean) => {
    return isSaving;
  }
);

export const isUpdatingCollectionDelivery = createSelector(
  isUpdatingCollectionDeliveryData,
  (isUpdating: boolean) => {
    return isUpdating;
  }
);

export const getCollectionDeliveryByGroup = createSelector(
  getCollectionDeliveryData,
  (data: any) => {
    if (!data) {
      return null;
    }

    const group: CollectionDelivery[] = [];
    const customData: any = groupBy(data, 'deliverySchedule');

    Object.keys(customData).forEach((key: string) => {
      group.push(customData[key]);
    })

    const groupByItem: CollectionDeliveryGroup = Object.assign({}, {
      group,
    });

    return groupByItem;
  }
);
