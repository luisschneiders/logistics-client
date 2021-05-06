import { ActionType } from '../../util/types';
import {
  MODAL_COLLECTION_CLIENT_SHOW_SET,
  MODAL_COLLECTION_USER_SHOW_SET,
} from '../actionTypes';

const setModalCollectionClientShowAction = (isShowModalCollectionClient: boolean) => {
  return ({
    type: MODAL_COLLECTION_CLIENT_SHOW_SET,
    payload: isShowModalCollectionClient
  } as const);
}

const setModalCollectionUserShowAction = (isShowModalCollectionUser: boolean) => {
  return ({
    type: MODAL_COLLECTION_USER_SHOW_SET,
    payload: isShowModalCollectionUser
  } as const);
}

export const setModalCollectionClientShow = (isShowModalCollectionClient: boolean) => async () => {
  return setModalCollectionClientShowAction(isShowModalCollectionClient);
}

export const setModalCollectionUserShow = (isShowModalCollectionUser: boolean) => async () => {
  return setModalCollectionUserShowAction(isShowModalCollectionUser);
}

export type ModalAction = 
  | ActionType<typeof setModalCollectionClientShow>
  | ActionType<typeof setModalCollectionUserShow>
