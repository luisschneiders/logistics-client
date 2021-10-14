import {
  dbFirestore,
  fb,
  timestamp
} from './Firebase';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import {
  CollectionUser,
  CollectionUserList
} from '../../models/CollectionUser';
import { RegisterUserForm } from '../../models/RegisterUserForm';
import { Collection } from '../../enum/Collection';

const userReference = (userRef: any, pageSize: number) => {
  return userRef.get().then((documentSnapshots: any) => {
    const lastVisibleBatch: any = documentSnapshots.docs[documentSnapshots.docs.length -1];
    const collectionUsers: any[] = [];

    if (lastVisibleBatch) {

      documentSnapshots.forEach((doc: any) => {
        const data: any = doc.data();
        collectionUsers.push(data);
      });

      const collectionUserList: CollectionUserList = {
        collectionUsers,
        pagination: {
          page: 0,
          pageSize,
          rowCount: 0,
          pageCount: 0,
          lastVisible: lastVisibleBatch,
        }
      };
      return collectionUserList;
    } else {
      const collectionUserList: CollectionUserList = {
        collectionUsers: [],
        pagination: {
          page: 0,
          pageSize,
          rowCount: 0,
          pageCount: 0,
          lastVisible: undefined
        }
      };
      return collectionUserList;
    }
  });
}

export const fetchCollectionUserList = async (id: string, pageSize: number) => {
  try {
    const userRef = dbFirestore.collection(Collection.USER)
                .where('companyId', '==', id)
                .limit(pageSize);
    return userReference(userRef, pageSize);
  } catch (error: any) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const fetchCollectionUserListLoadMore = async (id: string, lastVisible: any, pageSize: number) => {
  try {
    const userRef = dbFirestore.collection(Collection.USER)
                .where('companyId', '==', id)
                .startAfter(lastVisible)
                .limit(pageSize);
    return userReference(userRef, pageSize);
  } catch (error: any) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const fetchCollectionUserById = async (collectionUserId: string) => {
  try {
    const userRef = dbFirestore.collection(Collection.USER).doc(collectionUserId)

    return userRef.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    }).catch((error) => {
      toast(`No user was found: ${error}`, StatusColor.ERROR, 4000);
      return null;
    });

  } catch (error: any) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const addCollectionUser = async (data: RegisterUserForm) => {
  try {
    const resultRegisterUser: any = await fb.auth().createUserWithEmailAndPassword(data.userEmail, data.userPassword);
    const addCollectionUser: CollectionUser = {
      companyId: data.companyId,
      userId: resultRegisterUser.user.uid,
      userEmail: data.userEmail,
      userName: data.userName,
      userRole: data.userRole,
      userIsActive: data.userIsActive,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    await dbFirestore.collection(Collection.USER).doc(resultRegisterUser.user.uid).set(addCollectionUser);

    toast('User added successfully!', StatusColor.SUCCESS, 500);

    return addCollectionUser;
  } catch (error: any) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export const updateCollectionUser = async (data: Partial<CollectionUser>) => {
  try {
    await dbFirestore.collection(Collection.USER).doc(data.userId).set({
      userName: data.userName,
      userRole: data.userRole,
      userIsActive: data.userIsActive,
      updatedAt: timestamp,
    }, { merge: true });

    toast('User updated successfully!', StatusColor.SUCCESS, 500);

    return data;

  } catch (error: any) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}
