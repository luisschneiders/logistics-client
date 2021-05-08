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
import * as selectorsCollectionClient from '../../data/collectionClient/collectionClient.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListCollectionClientDetails from '../../components/list/ListCollectionClientDetails';
import { setModalCollectionClientShow } from '../../data/modal/modal.actions';
import { CompanyProfile } from '../../models/CompanyProfile';
import { setCollectionClientList } from '../../data/collectionClient/collectionClient.actions';

interface StateProps {
  companyProfile: CompanyProfile;
  isLoggedIn: boolean;
  isFetching: boolean;
}

interface DispatchProps {
  setCollectionClientList: typeof setCollectionClientList;
}

interface CollectionClientProps extends StateProps, DispatchProps {}

const CollectionClientPage: React.FC<CollectionClientProps> = ({
  isLoggedIn,
  isFetching,
  companyProfile,
  setCollectionClientList,
}) => {

  useEffect(() => {
    if (isLoggedIn && companyProfile) {
      setCollectionClientList(companyProfile.companyId, PageListItem.ITEM_100);
    }
  }, [
    isLoggedIn,
    companyProfile,
    setCollectionClientList,
  ]);

  return (
    <IonPage className="collection-client-page">
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
        <LsListCollectionClientDetails />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsCollectionClient.isFetchingCollectionClientList(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
  }),
  mapDispatchToProps: ({
    setCollectionClientList,
  }),
  component: React.memo(CollectionClientPage)
});
