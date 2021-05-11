import {
  IS_FETCHING_COLLECTION_CLIENT_LIST,
  IS_FETCHING_COLLECTION_CLIENT_VIEW,
} from '../actionTypes';
import { FetchAction } from './fetch.actions';
import { FetchState } from './fetch.state';

export const fetchReducer = (state: FetchState, action: FetchAction) : FetchState => {
  switch (action.type) {
    case IS_FETCHING_COLLECTION_CLIENT_LIST:
      return {
        ...state,
        isFetchingCollectionClientList: action.payload
      }
    case IS_FETCHING_COLLECTION_CLIENT_VIEW:
      return {
        ...state,
        isFetchingCollectionClientView: action.payload
      }
  }
}
