import { Pagination } from '../../models/Pagination';
import { CollectionUser } from '../../models/CollectionUser';

export interface CollectionUserListState {
  collectionUserList: {
    collectionUsers: CollectionUser[];
    pagination: Pagination;
  };
  collectionUser: CollectionUser;
  isFetching: boolean;
  isSaving: boolean;
  isUpdating: boolean;
}
