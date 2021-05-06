import { MapLocation } from './MapLocation';
import { Pagination } from './Pagination';

export interface ClientEmployee {
  name: string;
}

export interface CollectionClient {
  companyId: string;
  clientId: string;
  clientName: string;
  clientAddress: MapLocation;
  clientPhone?: string;
  companyAbnAcn?: string;
  clientEmployee?: ClientEmployee[];
  clientIsActive: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface CollectionClientList {
  collectionClients: CollectionClient[];
  pagination: Pagination;
}
