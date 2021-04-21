import { RoleType } from '../enum/RoleType';

export interface CollectionUser {
  companyId: string;
  userId: string;
  userEmail: string;
  userName: string;
  userRole: RoleType;
}
