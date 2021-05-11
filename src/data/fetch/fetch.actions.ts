import { ActionType } from '../../util/types';
import {
  IS_FETCHING_COLLECTION_CLIENT_LIST,
  IS_FETCHING_COLLECTION_CLIENT_VIEW,
} from '../actionTypes';


const isFetchingCollectionClientListAction = (isFetching: boolean) => {
  return ({
    type: IS_FETCHING_COLLECTION_CLIENT_LIST,
    payload: isFetching
  } as const);
}

const isFetchingCollectionClientViewAction = (isFetching: boolean) => {
  return ({
    type: IS_FETCHING_COLLECTION_CLIENT_VIEW,
    payload: isFetching
  } as const);
}

export const isFetchingCollectionClientList = (isFetching: boolean) => async () => {
  return isFetchingCollectionClientListAction(isFetching);
}

export const isFetchingCollectionClientView = (isFetching: boolean) => async (dispatch: React.Dispatch<any>) => {
  return isFetchingCollectionClientViewAction(isFetching);
}

export type FetchAction = 
  | ActionType<typeof isFetchingCollectionClientList>
  | ActionType<typeof isFetchingCollectionClientView>
