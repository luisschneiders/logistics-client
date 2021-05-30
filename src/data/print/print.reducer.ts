import {
  PRINT_COLLECTION_DELIVERY_OVERVIEW_SET,
  PRINT_COLLECTION_DELIVERY_RUN_SET,
} from '../actionTypes';
import { PrintAction } from './print.actions';
import { PrintState } from './print.state';

export const printReducer = (state: PrintState, action: PrintAction) : PrintState => {
  switch (action.type) {
    case PRINT_COLLECTION_DELIVERY_RUN_SET:
      return {
        ...state,
        collectionDeliveryRun: action.payload
      }
    case PRINT_COLLECTION_DELIVERY_OVERVIEW_SET:
      return {
        ...state,
        collectionDeliveryOverview: action.payload
      }
  }
}
