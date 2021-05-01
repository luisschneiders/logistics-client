import { UserType, UserTypeList } from '../../models/UserType';
import * as ROUTES from '../../constants/Routes';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { PageListItem } from '../../enum/PageListItem';
import { CollectionUser, CollectionUserList } from '../../models/CollectionUser';
import { dbFirestore, fb, timestamp } from './Firebase';
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

      const userTypeList: CollectionUserList = {
        collectionUsers,
        pagination: {
          page: 0,
          pageSize,
          rowCount: 0,
          pageCount: 0,
          lastVisible: lastVisibleBatch,
        }
      };
      return userTypeList;
    } else {
      const userTypeList: CollectionUserList = {
        collectionUsers: [],
        pagination: {
          page: 0,
          pageSize,
          rowCount: 0,
          pageCount: 0,
          lastVisible: undefined
        }
      };
      return userTypeList;
    }
  });
}

export const fetchCollectionUserList = async (id: string, pageSize: number) => {
  try {
      const userRef = dbFirestore.collection(Collection.USER)
                  .where('companyId', '==', id)
                  .limit(pageSize);
      return userReference(userRef, pageSize);
  } catch (error) {
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
  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export function fetchUserTypeById(userId: number, userTypeId: number) {

  let resStatus: any = null; 
  
  return fetch(`${ROUTES.SERVER}/user-type-id/userTypeInsertedBy=${userId}&id=${userTypeId}`)
          .then(response => {
            resStatus = response.status;
            return response.json();
          })
          .then((result: any) => {
            switch (resStatus) {
              case 200:
              case 201:
                const userType: UserType = {
                  userTypeId: result.id,
                  userTypeDescription: result.peopleDescription,
                  userTypeRates: result.peopleRates,
                  userTypeOptions: result.peopleType,
                  userTypeIsActive: result.peopleIsActive,
                  userTypeInsertedBy: result.peopleInsertedBy,
                  userTypeCreatedAt: result.created_at,
                  userTypeUpdatedAt: result.updated_at,
                };
                return userType;
              default:
                toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
                return false;
            }
          }).catch((error) => {
            toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
            return false;
          })
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

    toast('User added successfully.', StatusColor.SUCCESS, 4000);

    return addCollectionUser;
  } catch (error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export function updateUserType(data: Partial<UserType>) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  let resStatus: any = null;

  return fetch(`${ROUTES.SERVER}/user-type-id/userTypeInsertedBy=${data.userTypeInsertedBy}&id=${data.userTypeId}`, requestOptions)
  .then(response => {
    resStatus = response.status;
    return response.json();
  })
  .then((result: any) => {
    switch (resStatus) {
      case 200:
      case 201:
        const userType: UserType = {
          userTypeId: result.userType.id,
          userTypeDescription: result.userType.peopleDescription,
          userTypeRates: result.userType.peopleRates,
          userTypeOptions: result.userType.peopleType,
          userTypeIsActive: result.userType.peopleIsActive,
          userTypeInsertedBy: result.userType.peopleInsertedBy,
          userTypeCreatedAt: result.userType.created_at,
          userTypeUpdatedAt: result.userType.updated_at,
        };
        toast(result.msg, StatusColor.SUCCESS, 4000);
        return userType;
      default:
        toast(`Code: ${resStatus} -> Unhandled`, StatusColor.ERROR, 4000);
        return false;
    }
  }).catch((error) => {
    toast(`Code: ${resStatus} -> ${error}`, StatusColor.ERROR, 4000);
    return false;
  });

}
