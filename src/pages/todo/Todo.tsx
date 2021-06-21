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
  fingerPrintOutline,
  keyOutline,
  navigateOutline,
  notificationsOutline,
  peopleOutline,
  shareSocialOutline
} from 'ionicons/icons';

import './Todo.scss';

interface StateProps {
}

interface DispatchProps {
}

interface ContainerProps extends StateProps, DispatchProps {}

const TodoPage: React.FC<ContainerProps> = () => {
 
  return (
    <IonPage className="todo-page">
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
          <IonItem>
            <IonIcon slot="start" icon={fingerPrintOutline} />
            <IonLabel>Check user can access the app (userIsActive)</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={navigateOutline} />
            <IonLabel>Use Google map API</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={shareSocialOutline} />
            <IonLabel className="todo-page__text-line-through">
                Review Redux strategy
            </IonLabel>
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
