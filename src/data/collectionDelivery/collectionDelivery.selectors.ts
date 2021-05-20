import { createSelector } from 'reselect';
import { CollectionDelivery, CollectionDeliveryGroup, CollectionDeliveryList } from '../../models/CollectionDelivery';
import { groupBy } from '../../util/groupBy';
import { AppState } from '../app/app.state';

const getCollectionDeliveryListData = (state: AppState) => state.collectionDeliveryReducer.collectionDeliveryList;
const getCollectionDeliveryData = (state: AppState) => state.collectionDeliveryReducer.collectionDelivery;
const isFetchingCollectionDeliveryData = (state: AppState) => state.collectionDeliveryReducer.isFetching;
const isSavingCollectionDeliveryData = (state: AppState) => state.collectionDeliveryReducer.isSaving;
const isUpdatingCollectionDeliveryData = (state: AppState) => state.collectionDeliveryReducer.isUpdating;
const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

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

export const getCollectionDeliveryList = createSelector(
  getCollectionDeliveryListData,
  (collectionDeliveryList: CollectionDeliveryList) => {
    return collectionDeliveryList;
  }
);

export const getCollectionDeliveryFromList = createSelector(
  getCollectionDeliveryListData, getIdParam,
  (collectionDeliveryList: CollectionDeliveryList, id: string) => {
    if (collectionDeliveryList && collectionDeliveryList.collectionDeliveries && collectionDeliveryList.collectionDeliveries.length > 0) {
      return collectionDeliveryList.collectionDeliveries.find((e: any) => e.deliveryId === id);
    }
  }
);

export const getCollectionDelivery = createSelector(
  getCollectionDeliveryData,
  (collectionDelivery: CollectionDelivery) => {
    return collectionDelivery;
  }
);

export const getCollectionDeliveryByGroup = createSelector(
  getCollectionDeliveryListData,
  (data: any) => {
    if (!data && !data.collectionDeliveries) {
      return null;
    }

    const group: CollectionDelivery[] = [];
    const customData: any = groupBy(data.collectionDeliveries, 'deliverySchedule');

    Object.keys(customData).forEach((key: string) => {
      group.push(customData[key]);
    })

    const groupByItem: CollectionDeliveryGroup = Object.assign({}, {
      group,
    });

    return groupByItem;
  }
);
