import {
  COLLECTION_CLIENT_ADD,
  COLLECTION_CLIENT_BY_ID_SET,
  COLLECTION_CLIENT_IS_SAVING,
  COLLECTION_CLIENT_IS_FETCHING,
  COLLECTION_CLIENT_LIST_LOAD_MORE_SET,
  COLLECTION_CLIENT_LIST_SET,
  COLLECTION_CLIENT_UPDATE,
  COLLECTION_CLIENT_IS_UPDATING,
} from '../actionTypes';
import { CollectionClientAction } from './collectionClient.actions';
import { CollectionClientListState } from './collectionClient.state';

export const collectionClientReducer = (state: CollectionClientListState, action: CollectionClientAction) : CollectionClientListState => {
  switch (action.type) {
    case COLLECTION_CLIENT_ADD:
      // TODO
      // Add new Client in the list, 
      // then remove the last item from the array list
      // and check if page is smaller than pageCount, to prevent the slice
      // const collectionClients: any[] = (
      //   state.collectionClientList.pagination.page < state.collectionClientList.pagination.pageCount ?
      //   state.collectionClientList.collectionClients.slice(0, -1) : state.collectionClientList.collectionClients
      // );

      const collectionClients: any[] = (
        state.collectionClientList.collectionClients
      );

      return {
        ...state,
        collectionClientList: {
          collectionClients: [action.payload, ...collectionClients],
          pagination: {...state.collectionClientList.pagination},
        }
      };
    case COLLECTION_CLIENT_UPDATE:
      return {
        ...state
      };
    case COLLECTION_CLIENT_LIST_SET:
    case COLLECTION_CLIENT_LIST_LOAD_MORE_SET:
      return {
        ...state,
        collectionClientList: {
          collectionClients: [...state.collectionClientList.collectionClients, ...action.payload.collectionClients],
          pagination: {...state.collectionClientList.pagination, ...action.payload.pagination},
        }
      }
    case COLLECTION_CLIENT_BY_ID_SET:
      return {
        ...state,
        collectionClient: action.payload
      }
    case COLLECTION_CLIENT_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
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
