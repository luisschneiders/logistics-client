import {
  PRINT_COLLECTION_DELIVERY_SET,
} from '../actionTypes';
import { PrintAction } from './print.actions';
import { PrintState } from './print.state';

export const printReducer = (state: PrintState, action: PrintAction) : PrintState => {
  switch (action.type) {
    case PRINT_COLLECTION_DELIVERY_SET:
      return {
        ...state,
        collectionDelivery: action.payload
      }
  }
}
