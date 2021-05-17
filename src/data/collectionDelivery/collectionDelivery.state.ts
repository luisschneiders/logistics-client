import { CollectionDelivery } from '../../models/CollectionDelivery';

export interface CollectionDeliveryState {
  collectionDeliveryList: CollectionDelivery[];
  isFetching: boolean;
  isSaving: boolean;
  isUpdating: boolean;
}
