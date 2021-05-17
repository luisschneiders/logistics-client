import { ActionType } from '../../util/types';
import {
  MODAL_COLLECTION_CLIENT_SHOW_SET,
  MODAL_COLLECTION_DELIVERY_SHOW_SET,
  MODAL_COLLECTION_USER_SHOW_SET,
} from '../actionTypes';

const setModalCollectionClientShowAction = (isShow: boolean) => {
  return ({
    type: MODAL_COLLECTION_CLIENT_SHOW_SET,
    payload: isShow
  } as const);
}

const setModalCollectionUserShowAction = (isShow: boolean) => {
  return ({
    type: MODAL_COLLECTION_USER_SHOW_SET,
    payload: isShow
  } as const);
}

const setModalCollectionDeliveryShowAction = (isShow: boolean) => {
  return ({
    type: MODAL_COLLECTION_DELIVERY_SHOW_SET,
    payload: isShow
  } as const);
}

export const setModalCollectionClientShow = (isShow: boolean) => async () => {
  return setModalCollectionClientShowAction(isShow);
}

export const setModalCollectionUserShow = (isShow: boolean) => async () => {
  return setModalCollectionUserShowAction(isShow);
}

export const setModalCollectionDeliveryShow = (isShow: boolean) => async () => {
  return setModalCollectionDeliveryShowAction(isShow);
}

export type ModalAction = 
  | ActionType<typeof setModalCollectionClientShow>
  | ActionType<typeof setModalCollectionUserShow>
  | ActionType<typeof setModalCollectionDeliveryShow>
