import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { toast } from '../../components/toast/Toast';
import { Firebase } from '../../credentials/Firebase';
import { StatusColor } from '../../enum/StatusColor';
import { UserProfileFirebase } from '../../models/UserProfileFirebase';
import { CollectionUser } from '../../models/CollectionUser';
import { CollectionCompany } from '../../models/CollectionCompany';
import { RegisterCompanyForm } from '../../models/RegisterCompanyForm';
import { RoleType } from '../../enum/RoleType';
import { Collection } from '../../enum/Collection';

export const fb = firebase.initializeApp(Firebase);
export const dbFirestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export async function loginUser(email: string, password: string) {
  try {
    const response: any = await fb.auth().signInWithEmailAndPassword(email, password);
    toast('Welcome back!', StatusColor.DEFAULT);
    return response;
  } catch(error) {
    if (error instanceof Error) {
      toast(error.message, StatusColor.ERROR, 4000);
    }
    return false;
  }
}

export async function registerUser(form: RegisterCompanyForm) {
  try {
    const resultRegisterUser: any = await fb.auth().createUserWithEmailAndPassword(form.email, form.password);

    const addCollectionCompany: CollectionCompany = {
      companyId: resultRegisterUser.user.uid,
      companyName: form.companyName,
      companyAbnAcn: form.companyAbnAcn,
      companySignup: form.companySignup,
      companyType: form.companyType,
      companyCreatedBy: resultRegisterUser.user.uid,
      companyEmail: form.email,
      companyIsActive: form.companyIsActive,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    const addCollectionUser: CollectionUser = {
      companyId: resultRegisterUser.user.uid,
      userId: resultRegisterUser.user.uid,
      userEmail: form.email,
      userName: form.userName,
      userRole: RoleType.ADMIN,
      userIsActive: form.userIsActive,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    await dbFirestore.collection(Collection.COMPANY).doc(resultRegisterUser.user.uid).set(addCollectionCompany);
    await dbFirestore.collection(Collection.USER).doc(resultRegisterUser.user.uid).set(addCollectionUser);

    return resultRegisterUser;

  } catch(error) {
    if (error instanceof Error) {
      toast(error.message, StatusColor.ERROR, 4000);
    }
    return false;
  }
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe: any = fb.auth().onAuthStateChanged((user: any) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
}

export async function logoutUser() {
  const response: any = fb.auth().signOut();
  return response;
}

export async function updateProfile(profile: UserProfileFirebase) {
  try {
    fb.auth().currentUser?.updateProfile(profile);
    return true;

  } catch(error) {
    if (error instanceof Error) {
      toast(error.message, StatusColor.ERROR, 4000);
    }
    return false;
  }
}
