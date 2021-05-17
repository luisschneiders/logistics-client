import { CollectionClient } from "./CollectionClient";

export interface CollectionDeliveryGroup {
  group: CollectionDelivery[];
}

export interface CollectionDeliveryList {
  collectionDeliveries: CollectionDelivery[];
}

/**
 * TODO:
 * Remove @param deliveryClient in the future
 * Use @param deliveryClientId as reference to get client details
 */

export interface CollectionDelivery {
  companyId: string;
  deliveryId: string;
  deliveryDate: string;
  deliveryClientId: string;
  deliveryInvoice: string;
  deliverySchedule: string;
  deliveryIsActive: boolean;
  deliveryClient: CollectionClient;
  createdAt: any;
  updatedAt: any;
}
