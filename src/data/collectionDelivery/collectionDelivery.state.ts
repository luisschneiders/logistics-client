import { CollectionDelivery } from '../../models/CollectionDelivery';

export interface CollectionDeliveryState {
  collectionDeliveryList: {
    collectionDeliveries: CollectionDelivery[];
  };
  collectionDelivery: CollectionDelivery;
  isFetching: boolean;
  isSaving: boolean;
  isUpdating: boolean;
}
