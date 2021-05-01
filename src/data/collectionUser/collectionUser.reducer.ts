import {
  // USER_TYPE_ADD,
  // USER_TYPE_LIST_SET,
  // USER_TYPE_LIST_IS_FETCHING,
  // USER_TYPE_IS_SAVING,
  // USER_TYPE_UPDATE,
  // USER_TYPE_BY_ID_SET,
  COLLECTION_USER_ADD,
  COLLECTION_USER_IS_SAVING,
  COLLECTION_USER_LIST_IS_FETCHING,
  COLLECTION_USER_LIST_LOAD_MORE_SET,
  COLLECTION_USER_LIST_SET,
} from '../actionTypes';
import { CollectionUserAction } from './collectionUser.actions';
import { CollectionUserListState } from './collectionUser.state';

export const collectionUserReducer = (state: CollectionUserListState, action: CollectionUserAction) : CollectionUserListState => {
  switch (action.type) {
    case COLLECTION_USER_ADD:
      // TODO
      // Add new User in the list, 
      // then remove the last item from the array list
      // and check if page is smaller than pageCount, to prevent the slice
      // const collectionUsers: any[] = (
      //   state.collectionUserList.pagination.page < state.collectionUserList.pagination.pageCount ?
      //   state.collectionUserList.collectionUsers.slice(0, -1) : state.collectionUserList.collectionUsers
      // );

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
    case COLLECTION_USER_LIST_SET:
    case COLLECTION_USER_LIST_LOAD_MORE_SET:
      return {
        ...state,
        collectionUserList: {
          collectionUsers: [...state.collectionUserList.collectionUsers, ...action.payload.collectionUsers],
          pagination: {...state.collectionUserList.pagination, ...action.payload.pagination},
        }
      }
    // case USER_TYPE_BY_ID_SET:
    //   return {
    //     ...state,
    //     userType: action.payload
    //   }
    case COLLECTION_USER_LIST_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case COLLECTION_USER_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      }
  }
}
