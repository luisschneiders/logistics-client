import {
  COLLECTION_DELIVERY_IS_UPDATING,
  COLLECTION_DELIVERY_IS_SAVING,
  COLLECTION_DELIVERY_UPDATE,
  COLLECTION_DELIVERY_ADD,
  COLLECTION_DELIVERY_IS_FETCHING,
  COLLECTION_DELIVERY_LIST_SET,
  COLLECTION_DELIVERY_LIST_RESET,
  COLLECTION_DELIVERY_BY_ID_SET,
} from '../actionTypes';
import { CollectionDeliveryAction } from './collectionDelivery.actions';
import { CollectionDeliveryState } from './collectionDelivery.state';

export const collectionDeliveryReducer = (state: CollectionDeliveryState, action: CollectionDeliveryAction) : CollectionDeliveryState => {
  switch (action.type) {
    case COLLECTION_DELIVERY_LIST_RESET:
      return {
        ...state,
        collectionDeliveryList: {
          collectionDeliveries: []
        }
      }
    case COLLECTION_DELIVERY_LIST_SET:
      return {
        ...state,
        collectionDeliveryList: {
          collectionDeliveries: [...state.collectionDeliveryList.collectionDeliveries, ...action.payload.collectionDeliveries]
        },
      }

    case COLLECTION_DELIVERY_BY_ID_SET:
      return {
        ...state,
        collectionDelivery: action.payload
      }
    case COLLECTION_DELIVERY_ADD:
      const collectionDeliveries: any[] = (
        state.collectionDeliveryList.collectionDeliveries
      );

      return {
        ...state,
        collectionDeliveryList: {
          collectionDeliveries: [action.payload, ...collectionDeliveries]
        },
      };
    case COLLECTION_DELIVERY_UPDATE:
      const deliveryId = action.payload.deliveryId;
      const newState = { ...state };
      newState.collectionDeliveryList.collectionDeliveries.map((item) => {
        if (item.deliveryId !== deliveryId) {
          return item;
        }
        return {
          ...item,
          ...action.payload,
        }
      });
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
