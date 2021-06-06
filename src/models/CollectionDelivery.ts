import { CollectionClient } from "./CollectionClient";

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
  deliveryReceiver: string;
  deliveryTime: string;
  createdAt: any;
  updatedAt: any;
}

export interface CollectionDeliveryList {
  collectionDeliveries: CollectionDelivery[];
}

export interface CollectionDeliveryGroup {
  group: CollectionDelivery[];
}
