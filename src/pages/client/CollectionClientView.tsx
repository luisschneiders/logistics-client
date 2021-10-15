import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect } from 'react';

import { connect } from '../../data/connect';

import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsFetch from '../../data/fetch/fetch.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsCollectionClientView from '../../components/list/CollectionClientView';
import { CompanyProfile } from '../../models/CompanyProfile';
import {
  resetCollectionClientList,
  setCollectionClientList
} from '../../data/collectionClient/collectionClient.actions';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isFetching: boolean;
}

interface DispatchProps {
  resetCollectionClientList: typeof resetCollectionClientList;
  setCollectionClientList: typeof setCollectionClientList;
}

interface ContainerProps extends StateProps, DispatchProps {}

const CollectionClientViewPage: React.FC<ContainerProps> = ({
  isLoggedIn,
  isFetching,
  companyProfile,
  resetCollectionClientList,
  setCollectionClientList,
}) => {

  resetCollectionClientList();

  useEffect(() => {
    if (isLoggedIn && companyProfile && companyProfile.companyId) {
      setCollectionClientList(companyProfile.companyId, PageListItem.ITEM_50);
    }
  }, [
    isLoggedIn,
    companyProfile,
    isFetching,
    setCollectionClientList,
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
      <IonLoading message="Fetching clients..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-no-padding">
        <LsCollectionClientView />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsFetch.isFetchingCollectionClientView(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
  }),
  mapDispatchToProps: ({
    resetCollectionClientList,
    setCollectionClientList,
  }),
  component: React.memo(CollectionClientViewPage)
});
