import {
  dbFirestore,
  timestamp
} from './Firebase';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import {
  CollectionClient,
  CollectionClientList,
  CollectionClientListActive
} from '../../models/CollectionClient';
import { Collection } from '../../enum/Collection';

const clientReference = (clientRef: any, pageSize: number) => {
  return clientRef.get().then((documentSnapshots: any) => {
    const lastVisibleBatch: any = documentSnapshots.docs[documentSnapshots.docs.length -1];
    const collectionClients: any[] = [];

    if (lastVisibleBatch) {

      documentSnapshots.forEach((doc: any) => {
        const data: any = doc.data();
        collectionClients.push(data);
      });

      const collectionClientList: CollectionClientList = {
        collectionClients,
        pagination: {
          page: 0,
          pageSize,
          rowCount: 0,
          pageCount: 0,
          lastVisible: lastVisibleBatch,
        }
      };
      return collectionClientList;
    } else {
      const collectionClientList: CollectionClientList = {
        collectionClients: [],
        pagination: {
          page: 0,
          pageSize,
          rowCount: 0,
          pageCount: 0,
          lastVisible: undefined
        }
      };
      return collectionClientList;
    }
  });
}

export const fetchCollectionClientList = async (companyId: string, pageSize: number) => {
  try {
    const clientRef = dbFirestore.collection(Collection.CLIENT)
      .where('companyId', '==', companyId)
      .limit(pageSize);

    return clientReference(clientRef, pageSize);
  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const fetchCollectionClientListLoadMore = async (companyId: string, lastVisible: any, pageSize: number) => {
  try {
    const clientRef = dbFirestore.collection(Collection.CLIENT)
      .where('companyId', '==', companyId)
      .startAfter(lastVisible)
      .limit(pageSize);

    return clientReference(clientRef, pageSize);
  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const fetchCollectionClientListActive = async (companyId: string) => {
  try {
    const clientRef = dbFirestore.collection(Collection.CLIENT)
      .where('companyId', '==', companyId)
      .where('clientIsActive', '==', true);

    return clientRef.get().then((documentSnapshots: any) => {
      const collectionClients: any[] = [];

      documentSnapshots.forEach((doc: any) => {
        const data: any = doc.data();
        collectionClients.push(data);
      });

      const collectionClientListActive: CollectionClientListActive = {
        collectionClients,
      };

      return collectionClientListActive;

    });
  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const fetchCollectionClientById = async (collectionClientId: string) => {
  try {
    const clientRef = dbFirestore.collection(Collection.CLIENT).doc(collectionClientId)

    return clientRef.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    }).catch((error) => {
      toast(`No client was found: ${error}`, StatusColor.ERROR, 4000);
      return null;
    });

  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const addCollectionClient = async (data: Partial<CollectionClient>) => {
  try {
    // Add a new document with a generated id.
    const clientRef = dbFirestore.collection(Collection.CLIENT).doc();
    const collectionClient: Partial<CollectionClient> = {
      companyId: data.companyId,
      clientId: clientRef.id,
      clientName: data.clientName,
      clientAddress: data.clientAddress,
      clientIsActive: data.clientIsActive,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    await dbFirestore.collection(Collection.CLIENT).doc(clientRef.id).set(collectionClient);

    toast('Client added successfully!', StatusColor.SUCCESS, 800);

    return collectionClient;
  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const updateCollectionClient = async (data: Partial<CollectionClient>) => {
  try {
    await dbFirestore.collection(Collection.CLIENT).doc(data.clientId).set({
      clientName: data.clientName,
      clientAddress: data.clientAddress,
      clientEmployee: data.clientEmployee,
      clientIsActive: data.clientIsActive,
      updatedAt: timestamp,
    }, { merge: true });

    toast('Client updated successfully!', StatusColor.SUCCESS, 800);

    return data;

  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}
