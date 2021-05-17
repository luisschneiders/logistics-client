export interface CollectionDeliveryGroup {
  group: CollectionDelivery[];
}

export interface CollectionDeliveryList {
  collectionDeliveries: CollectionDelivery[];
}

export interface CollectionDelivery {
  companyId: string;
  deliveryId: string;
  deliveryDate: string;
  deliveryClientId: string;
  deliveryInvoice: string;
  deliverySchedule: string;
  deliveryIsActive: boolean;
  createdAt: any;
  updatedAt: any;
}
