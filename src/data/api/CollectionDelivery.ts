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
        const data: CollectionDelivery = doc.data();
        collectionDeliveries.push(data);
      });

      const collectionDeliveryList: CollectionDeliveryList = {
        collectionDeliveries,
      };

      return collectionDeliveryList;
    })

  } catch (error) {
    if (error instanceof Error) {
      toast(error.message, StatusColor.ERROR, 4000);
    }
    return false;
  }
}

export const fetchCollectionDeliveryById = async (deliveryId: string) => {
  try {
    const deliveryRef = dbFirestore.collection(Collection.DELIVERY).doc(deliveryId)

    return deliveryRef.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    }).catch((error) => {
      toast(`No delivery was found: ${error}`, StatusColor.ERROR, 4000);
      return null;
    });

  } catch (error) {
    if (error instanceof Error) {
      toast(error.message, StatusColor.ERROR, 4000);
    }
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
      deliveryClient: data.deliveryClient,
      deliveryInvoice: data.deliveryInvoice,
      deliverySchedule: data.deliverySchedule,
      deliveryIsActive: data.deliveryIsActive,
      deliveryReceiver: '',
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    await dbFirestore.collection(Collection.DELIVERY).doc(clientRef.id).set(collectionDelivery);

    toast('Delivery added successfully!', StatusColor.SUCCESS, 500);

    return collectionDelivery;
  } catch (error) {
    if (error instanceof Error) {
      toast(error.message, StatusColor.ERROR, 4000);
    }
    return false;
  }
}

export const updateCollectionDelivery = async (data: Partial<CollectionDelivery>) => {
  try {
    await dbFirestore.collection(Collection.DELIVERY).doc(data.deliveryId).set({
      deliveryDate: data.deliveryDate,
      deliveryClientId: data.deliveryClientId,
      deliveryClient: data.deliveryClient,
      deliveryInvoice: data.deliveryInvoice,
      deliverySchedule: data.deliverySchedule,
      deliveryIsActive: data.deliveryIsActive,
      deliveryReceiver: data.deliveryReceiver,
      deliveryTime: data.deliveryTime,
      updatedAt: timestamp,
    }, { merge: true });

    toast('Delivery updated successfully!', StatusColor.SUCCESS, 500);

    return data;

  } catch (error) {
    if (error instanceof Error) {
      toast(error.message, StatusColor.ERROR, 4000);
    }
    return false;
  }
}
