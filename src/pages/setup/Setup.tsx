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
import {
  businessOutline,
  hammerOutline,
  peopleOutline,
} from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { AppColor } from '../../enum/AppColor';
import { CompanyUser } from '../../models/CompanyUser';
import { RoleType } from '../../enum/RoleType';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  isLoggedIn: boolean;
  companyUser: CompanyUser;
}

interface DispatchProps {}

interface ContainerProps extends OwnProps, StateProps, DispatchProps {}

const SetupPage: React.FC<ContainerProps> = ({
  companyUser,
}) => {
  return (
    <IonPage id="setup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Setup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="full">
          <IonItem detail={true} routerLink={ROUTES.TABS_COLLECTION_USER} routerDirection="none">
            <IonIcon slot="start" icon={peopleOutline} />
            <IonLabel>User</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.TABS_COLLECTION_CLIENT_LIST} routerDirection="none">
            <IonIcon slot="start" icon={businessOutline} />
            <IonLabel>Client</IonLabel>
          </IonItem>
          {companyUser.userRole === RoleType.DEVELOPER && 
            <IonItem detail={true} routerLink={ROUTES.TABS_TODO} routerDirection="none">
              <IonIcon slot="start" icon={hammerOutline} color={AppColor.TERTIARY} />
              <IonLabel color={AppColor.TERTIARY}>TODO</IonLabel>
            </IonItem>
          }
        </IonList>
      </IonContent>
    </IonPage>
  )
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    companyUser: selectorsSessions.getCompanyUser(state),
  }),
  mapDispatchToProps: {},
  component: SetupPage
});
