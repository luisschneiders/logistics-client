import { PageListItem } from '../../enum/PageListItem';
import {
  COLLECTION_CLIENT_ADD,
  COLLECTION_CLIENT_BY_ID_SET,
  COLLECTION_CLIENT_IS_SAVING,
  COLLECTION_CLIENT_LIST_LOAD_MORE_SET,
  COLLECTION_CLIENT_LIST_SET,
  COLLECTION_CLIENT_UPDATE,
  COLLECTION_CLIENT_IS_UPDATING,
  COLLECTION_CLIENT_IS_FETCHING_LIST,
  COLLECTION_CLIENT_LIST_RESET,
  COLLECTION_CLIENT_LIST_ACTIVE_SET,
  COLLECTION_CLIENT_LIST_ACTIVE_RESET,
} from '../actionTypes';
import { CollectionClientAction } from './collectionClient.actions';
import { CollectionClientListState } from './collectionClient.state';

export const collectionClientReducer = (state: CollectionClientListState, action: CollectionClientAction) : CollectionClientListState => {
  switch (action.type) {
    case COLLECTION_CLIENT_ADD:
      const collectionClients: any[] = (
        state.collectionClientList.collectionClients
      );

      return {
        ...state,
        collectionClientList: {
          collectionClients: [action.payload, ...collectionClients],
          pagination: {...state.collectionClientList.pagination},
        },
      };
    case COLLECTION_CLIENT_UPDATE:
      const index = action.payload.clientId;
      const newState = { ...state };
      newState.collectionClientList.collectionClients.map((item) => {
        if (item.clientId !== index) {
          return item;
        }
        return {
          ...item,
          ...action.payload,
        }
      });
      return {
        ...state,
        collectionClientList: {
          collectionClients: [...newState.collectionClientList.collectionClients],
          pagination: {...state.collectionClientList.pagination},
        },
      };
    case COLLECTION_CLIENT_LIST_RESET:
      return {
        ...state,
        collectionClientList: {
          collectionClients: [],
          pagination: {  page: 1, pageSize: PageListItem.ITEM_50, rowCount: 0, pageCount: 0}
        }
      }
    case COLLECTION_CLIENT_LIST_ACTIVE_RESET:
      return {
        ...state,
        collectionClientListActive: {
          collectionClients: [],
        }
      }
    case COLLECTION_CLIENT_LIST_SET:
    case COLLECTION_CLIENT_LIST_LOAD_MORE_SET:
      return {
        ...state,
        collectionClientList: {
          collectionClients: [...state.collectionClientList.collectionClients, ...action.payload.collectionClients],
          pagination: {...state.collectionClientList.pagination, ...action.payload.pagination},
        }
      }
    case COLLECTION_CLIENT_LIST_ACTIVE_SET:
      return {
        ...state,
        collectionClientListActive: {
          collectionClients: [...state.collectionClientListActive.collectionClients, ...action.payload.collectionClients],
        }
      }
    case COLLECTION_CLIENT_BY_ID_SET:
      return {
        ...state,
        collectionClient: action.payload
      }
    case COLLECTION_CLIENT_IS_FETCHING_LIST:
      return {
        ...state,
        isFetchingList: action.payload
      }
    case COLLECTION_CLIENT_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      }
    case COLLECTION_CLIENT_IS_UPDATING:
      return {
        ...state,
        isUpdating: action.payload
      }
  }
}
