import {
  MODAL_COLLECTION_USER_SHOW_SET,
} from '../actionTypes';
import { ModalAction } from './modal.actions';
import { ModalState } from './modal.state';

export const modalReducer = (state: ModalState, action: ModalAction) : ModalState => {
  switch (action.type) {
    case MODAL_COLLECTION_USER_SHOW_SET:
      return {
        ...state,
        isShowModalCollectionUser: action.payload
      }
  }
}
