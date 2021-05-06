import { Pagination } from '../../models/Pagination';
import { CollectionClient } from '../../models/CollectionClient';

export interface CollectionClientListState {
  collectionClientList: {
    collectionClients: CollectionClient[];
    pagination: Pagination;
  };
  collectionClient: CollectionClient;
  isFetching: boolean;
  isSaving: boolean;
  isUpdating: boolean;
}
