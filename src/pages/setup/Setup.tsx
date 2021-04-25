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
  hammerOutline,
  peopleOutline,
} from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import * as selectorsUser from '../../data/user/user.selectors';
import LsMainModal from '../../components/modal/MainModal';
import LsMainChip from '../../components/chip/MainChip';
import { AppColor } from '../../enum/AppColor';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {}

interface SetupProps extends OwnProps, StateProps, DispatchProps {}

const SetupPage: React.FC<SetupProps> = ({
  isLoggedIn,
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
          <IonItem detail={true} routerLink={ROUTES.TABS_COMPANY_USER} routerDirection="none">
            <IonIcon slot="start" icon={peopleOutline} />
            <IonLabel>Company users</IonLabel>
          </IonItem>
          <IonItem detail={true} routerLink={ROUTES.TABS_TODO} routerDirection="none">
            <IonIcon slot="start" icon={hammerOutline} />
            <IonLabel><LsMainChip text="TODO" color={AppColor.TERTIARY}></LsMainChip></IonLabel>
          </IonItem>
          {/* <IonItem detail={true} routerLink={ROUTES.TABS_BANK} routerDirection="none">
            <IonIcon slot="start" icon={businessOutline} />
            <IonLabel>Banks</IonLabel>
          </IonItem> */}
          {/* <IonItem detail={true} routerLink={ROUTES.TABS_EXPENSE_TYPE} routerDirection="none">
            <IonIcon slot="start" icon={pricetagOutline} />
            <IonLabel>Expense Categories</IonLabel>
          </IonItem> */}
          {/* <IonItem detail={true} routerLink={ROUTES.TABS_TRANSACTION_TYPE} routerDirection="none">
            <IonIcon slot="start" icon={repeatOutline} />
            <IonLabel>Transaction Categories</IonLabel>
          </IonItem> */}
          {/* <IonItem detail={true} routerLink={ROUTES.TABS_USER_TYPE} routerDirection="none">
            <IonIcon slot="start" icon={peopleOutline} />
            <IonLabel>Users</IonLabel>
          </IonItem> */}
          {/* <IonItem detail={true} routerLink={ROUTES.TABS_VEHICLE} routerDirection="none">
            <IonIcon slot="start" icon={carOutline} />
            <IonLabel>Vehicles</IonLabel>
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  )
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
  }),
  mapDispatchToProps: {},
  component: SetupPage
});
