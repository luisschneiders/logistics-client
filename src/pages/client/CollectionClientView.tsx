import {
  IonButtons,
  IonContent,
  IonHeader,

  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect } from 'react';

import { connect } from '../../data/connect';

import * as selectorsUser from '../../data/user/user.selectors';
// import * as selectorsCollectionClient from '../../data/collectionClient/collectionClient.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
// import { PageListItem } from '../../enum/PageListItem';
import LsCollectionClientView from '../../components/list/CollectionClientView';
import { CompanyProfile } from '../../models/CompanyProfile';
// import { setCollectionClientView } from '../../data/collectionClient/collectionClient.actions';

interface StateProps {
  companyProfile: CompanyProfile;
  isLoggedIn: boolean;
  // isFetching: boolean;
}

interface DispatchProps {
  // setCollectionClientView: typeof setCollectionClientView;
}

interface ContainerProps extends StateProps, DispatchProps {}

const CollectionClientViewPage: React.FC<ContainerProps> = ({
  isLoggedIn,
  // isFetching,
  companyProfile,
  // setCollectionClientView,
}) => {

  useEffect(() => {
    if (isLoggedIn && companyProfile) {
    }
  }, [
    isLoggedIn,
    companyProfile,
    // setCollectionClientView,
  ]);

  return (
    <IonPage className="collection-client-view-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Clients</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <IonLoading message="Fetching clients..." duration={0} isOpen={isFetching}></IonLoading> */}
      <IonContent className="ion-no-padding">
        <LsCollectionClientView />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    // isFetching: selectorsCollectionClient.isFetchingCollectionClientList(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
  }),
  mapDispatchToProps: ({
    // setCollectionClientView,
  }),
  component: React.memo(CollectionClientViewPage)
});
