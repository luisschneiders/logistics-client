import {
  dbFirestore,
  timestamp
} from './Firebase';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import {
  CollectionDelivery, CollectionDeliveryList,
} from '../../models/CollectionDelivery';
import { Collection } from '../../enum/Collection';
import { Period } from '../../models/Period';

export const fetchCollectionDeliveryList = async (companyId: string, period: Period) => {
  try {
    const deliveryRef = dbFirestore.collection(Collection.DELIVERY)
      .where('companyId', '==', companyId)
      .where('deliveryDate', '>=', period.startDate)
      .where('deliveryDate', '<=', period.endDate);
    
    return deliveryRef.get().then((documentSnapshots: any) => {
      const collectionDeliveries: CollectionDelivery[] = [];
      documentSnapshots.forEach((doc: any) => {
        const data: any = doc.data();
        collectionDeliveries.push(data);
      });

      const collectionDeliveryList: CollectionDeliveryList = {
        collectionDeliveries,
      };

      return collectionDeliveryList;
    })

  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const addCollectionDelivery = async (data: Partial<CollectionDelivery>) => {
  try {
    // Add a new document with a generated id.
    const clientRef = dbFirestore.collection(Collection.DELIVERY).doc();
    const collectionDelivery: Partial<CollectionDelivery> = {
      companyId: data.companyId,
      deliveryId: clientRef.id,
      deliveryDate: data.deliveryDate,
      deliveryClientId: data.deliveryClientId,
      deliveryInvoice: data.deliveryInvoice,
      deliverySchedule: data.deliverySchedule,
      deliveryIsActive: data.deliveryIsActive,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    await dbFirestore.collection(Collection.DELIVERY).doc(clientRef.id).set(collectionDelivery);

    toast('Delivery added successfully!', StatusColor.SUCCESS, 4000);

    return collectionDelivery;
  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const updateCollectionDelivery = async (data: Partial<CollectionDelivery>) => {
  try {
    await dbFirestore.collection(Collection.DELIVERY).doc(data.deliveryId).set({
      deliveryDate: data.deliveryDate,
      deliveryClientId: data.deliveryClientId,
      deliveryInvoice: data.deliveryInvoice,
      deliverySchedule: data.deliverySchedule,
      deliveryIsActive: data.deliveryIsActive,
      updatedAt: timestamp,
    }, { merge: true });

    toast('Delivery updated successfully!', StatusColor.SUCCESS, 4000);

    return data;

  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}
