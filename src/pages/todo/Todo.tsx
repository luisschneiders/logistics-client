import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { connect } from '../../data/connect';
import {
  documentsOutline,
  keyOutline,
  notificationsOutline,
  peopleOutline
} from 'ionicons/icons';

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
            <IonLabel>Implement user access (roles)</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={keyOutline} />
            <IonLabel>Create page reset password</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={documentsOutline} />
            <IonLabel>Improve Firestore pagination</IonLabel>
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
