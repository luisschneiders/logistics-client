import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect } from 'react';
import { connect } from '../../data/connect';
import { AppColor } from '../../enum/AppColor';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsUserType from '../../data/userType/userType.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListItemUserType from '../../components/list/ListItemUserType';
import {
  setUserTypeList
} from '../../data/userType/userType.actions';
import { add, albumsOutline, documentsOutline, keyOutline, mailOutline, notificationsOutline, peopleOutline } from 'ionicons/icons';
import { setModalCompanyUserShow } from '../../data/modal/modal.actions';
import LsModalCompanyUser from '../../components/modal/ModalCompanyUser';
import { CompanyProfile } from '../../models/CompanyProfile';

interface StateProps {
}

interface DispatchProps {
}

interface TodoProps extends StateProps, DispatchProps {}

const TodoPage: React.FC<TodoProps> = ({}) => {
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>TODO</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding">
        <IonList lines="full">
          <IonItem>
            <IonIcon slot="start" icon={notificationsOutline} />
            <IonLabel>Create notification centre</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={peopleOutline} />
            <IonLabel>Implement users role</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={keyOutline} />
            <IonLabel>Create page reset password</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={documentsOutline} />
            <IonLabel>Improve Firestore Pagination</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
  }),
  mapDispatchToProps: ({
  }),
  component: React.memo(TodoPage)
});
