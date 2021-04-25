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
import { add, keyOutline, mailOutline, notificationsOutline } from 'ionicons/icons';
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
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonIcon slot="start" icon={notificationsOutline} />
            <IonLabel>Create Notification Center</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={keyOutline} />
            <IonLabel>Implement role for User</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={mailOutline} />
            <IonLabel>Create page Reset Passord</IonLabel>
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
