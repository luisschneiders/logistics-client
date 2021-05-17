import {
  COLLECTION_DELIVERY_IS_UPDATING,
  COLLECTION_DELIVERY_IS_SAVING,
  COLLECTION_DELIVERY_UPDATE,
  COLLECTION_DELIVERY_ADD,
  COLLECTION_DELIVERY_IS_FETCHING,
  COLLECTION_DELIVERY_LIST_SET,
  COLLECTION_DELIVERY_LIST_RESET,
} from '../actionTypes';
import { CollectionDeliveryAction } from './collectionDelivery.actions';
import { CollectionDeliveryState } from './collectionDelivery.state';

export const collectionDeliveryReducer = (state: CollectionDeliveryState, action: CollectionDeliveryAction) : CollectionDeliveryState => {
  switch (action.type) {
    case COLLECTION_DELIVERY_LIST_RESET:
      return {
        ...state,
        collectionDeliveryList: []
      }
    case COLLECTION_DELIVERY_LIST_SET:
      return {
        ...state,
        collectionDeliveryList: [...state.collectionDeliveryList, ...action.payload.collectionDeliveries],
      }
    case COLLECTION_DELIVERY_ADD:
      const collectionDeliveries: any[] = (
        state.collectionDeliveryList
      );

      return {
        ...state,
        collectionDeliveryList: [action.payload, ...collectionDeliveries],
      };
    case COLLECTION_DELIVERY_UPDATE:
      const index = action.payload.deliveryId;
      const newState = { ...state };
      newState.collectionDeliveryList.map((item) => {
        if (item.deliveryId !== index) {
          return item;
        }
        return {
          ...item,
          ...action.payload,
        }
      })
      return {
        ...state,
        ...newState,
      };
    case COLLECTION_DELIVERY_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case COLLECTION_DELIVERY_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      }
    case COLLECTION_DELIVERY_IS_UPDATING:
      return {
        ...state,
        isUpdating: action.payload
      }
  }
}
