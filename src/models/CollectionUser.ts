import { Pagination } from './Pagination';

export interface CollectionUser {
  companyId: string;
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string
  userIsActive: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface CollectionUserList {
  collectionUsers: CollectionUser[];
  pagination: Pagination;
}
