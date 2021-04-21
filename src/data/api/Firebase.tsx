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

firebase.initializeApp(Firebase);
const db = firebase.firestore();

export async function loginUser(email: string, password: string) {
  try {
    const response: any = await firebase.auth().signInWithEmailAndPassword(email, password);
    toast(`Welcome back ${response?.user?.displayName || ''}!`, StatusColor.DEFAULT);
    return response;
  } catch(error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export async function registerUser(form: RegisterCompanyForm) {
  try {
    const resultRegisterUser: any = await firebase.auth().createUserWithEmailAndPassword(form.email, form.password);

    const addCollectionCompany: CollectionCompany = {
      companyId: resultRegisterUser.user.uid,
      companyName: form.companyName,
      companyAbnAcn: form.companyAbnAcn,
      companySignup: true,
      companyType: form.companyType,
      companyCreatedBy: resultRegisterUser.user.uid,
      companyEmail: form.email,
    }

    const addCollectionUser: CollectionUser = {
      companyId: resultRegisterUser.user.uid,
      userId: resultRegisterUser.user.uid,
      userEmail: form.email,
      userName: form.userName,
      userRole: RoleType.ADMIN,
    }

    const resultCollectionCompany: any = await db.collection('Company').add(addCollectionCompany);
    const resultCollectionUser: any = await db.collection('User').add(addCollectionUser);

    return {resultRegisterUser, resultCollectionCompany, resultCollectionUser};

  } catch(error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe: any = firebase.auth().onAuthStateChanged((user: any) => {
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
  const response: any = firebase.auth().signOut();
  return response;
}

export async function updateProfile(profile: UserProfileFirebase) {
  try {
    firebase.auth().currentUser?.updateProfile(profile);
    return true;

  } catch(error) {
    toast(error.message, StatusColor.ERROR, 4000);
    return false;
  }
}

export async function addFirestoreCollectionUser(collectionUser: CollectionUser) {
  const response: any = await db.collection('User').add(collectionUser);
  return response;
}

export async function addFirestoreCollectionCompany(collectionCompany: CollectionCompany) {
  const response: any = await db.collection('Company').add(collectionCompany);
  return response;
}
