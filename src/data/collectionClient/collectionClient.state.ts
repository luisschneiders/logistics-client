import { Pagination } from '../../models/Pagination';
import { CollectionClient, CollectionClientListActive } from '../../models/CollectionClient';

export interface CollectionClientListState {
  collectionClientList: {
    collectionClients: CollectionClient[];
    pagination: Pagination;
  };
  collectionClientListActive: {
    collectionClients: CollectionClient[];
  };
  collectionClient: CollectionClient;
  isFetchingList: boolean;
  isSaving: boolean;
  isUpdating: boolean;
}
