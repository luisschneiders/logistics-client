import {
  COLLECTION_USER_ADD,
  COLLECTION_USER_BY_ID_SET,
  COLLECTION_USER_IS_SAVING,
  COLLECTION_USER_IS_FETCHING,
  COLLECTION_USER_LIST_LOAD_MORE_SET,
  COLLECTION_USER_LIST_SET,
  COLLECTION_USER_UPDATE,
  COLLECTION_USER_IS_UPDATING,
} from '../actionTypes';
import { CollectionUserAction } from './collectionUser.actions';
import { CollectionUserListState } from './collectionUser.state';

export const collectionUserReducer = (state: CollectionUserListState, action: CollectionUserAction) : CollectionUserListState => {
  switch (action.type) {
    case COLLECTION_USER_ADD:
      const collectionUsers: any[] = (
        state.collectionUserList.collectionUsers
      );

      return {
        ...state,
        collectionUserList: {
          collectionUsers: [action.payload, ...collectionUsers],
          pagination: {...state.collectionUserList.pagination},
        }
      };
    case COLLECTION_USER_UPDATE:
      return {
        ...state
      };
    case COLLECTION_USER_LIST_SET:
    case COLLECTION_USER_LIST_LOAD_MORE_SET:
      return {
        ...state,
        collectionUserList: {
          collectionUsers: [...state.collectionUserList.collectionUsers, ...action.payload.collectionUsers],
          pagination: {...state.collectionUserList.pagination, ...action.payload.pagination},
        }
      }
    case COLLECTION_USER_BY_ID_SET:
      return {
        ...state,
        collectionUser: action.payload
      }
    case COLLECTION_USER_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case COLLECTION_USER_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      }
    case COLLECTION_USER_IS_UPDATING:
      return {
        ...state,
        isUpdating: action.payload
      }
  }
}
