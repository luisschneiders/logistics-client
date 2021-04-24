import { dbFirestore } from './Firebase';
import { StatusColor } from '../../enum/StatusColor';
import { toast } from '../../components/toast/Toast';
import { Collection } from '../../enum/Collection';

export async function fetchCompanyProfile(userId: string) {
  // Check if user exist in the collection
  const userRef = dbFirestore.collection(Collection.USER).doc(userId);

  return userRef.get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    } else {
      return null;
    }
  }).then((user: any) => {
    // fetch the company details linked to the user
    const companyRef = dbFirestore.collection(Collection.COMPANY).doc(user.companyId);

    return companyRef.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })

  }).catch((error) => {
    return toast(`Error: ${error}`, StatusColor.ERROR, 4000);
  });
}