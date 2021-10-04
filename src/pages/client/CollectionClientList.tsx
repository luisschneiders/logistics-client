import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect } from 'react';

import { connect } from '../../data/connect';

import { AppColor } from '../../enum/AppColor';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsCollectionClientList from '../../components/list/CollectionClientList';
import { add } from 'ionicons/icons';
import { setModalCollectionClientShow } from '../../data/modal/modal.actions';
import LsModalCollectionClient from '../../components/modal/CollectionClient';
import { CompanyProfile } from '../../models/CompanyProfile';
import {
  resetCollectionClientList,
  setCollectionClientList
} from '../../data/collectionClient/collectionClient.actions';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  // isFetching: boolean;
}

interface DispatchProps {
  resetCollectionClientList: typeof resetCollectionClientList;
  setCollectionClientList: typeof setCollectionClientList;
  setModalCollectionClientShow: typeof setModalCollectionClientShow;
}

interface ContainerProps extends StateProps, DispatchProps {}

const CollectionClientListPage: React.FC<ContainerProps> = ({
  isLoggedIn,
  // isFetching,
  companyProfile,
  resetCollectionClientList,
  setCollectionClientList,
  setModalCollectionClientShow,
}) => {

  resetCollectionClientList();

  useEffect(() => {
    if (isLoggedIn && companyProfile && companyProfile.companyId) {
      setCollectionClientList(companyProfile.companyId, PageListItem.ITEM_30);
    }
  }, [
    isLoggedIn,
    companyProfile,
    setCollectionClientList,
    setModalCollectionClientShow,
  ]);

  return (
    <IonPage className="collection-client-list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Client</IonTitle>
          <IonFab vertical="center" horizontal="end">
            {(companyProfile?.companyId.length !== 0) && 
              <IonFabButton
                onClick={() => setModalCollectionClientShow(true)}
                color={AppColor.TERTIARY}
                size="small"
                title="Add record"
              >
                <IonIcon
                  icon={add}
                  size="small"
                />
              </IonFabButton>
            }
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding">
        <LsCollectionClientList />
        <LsModalCollectionClient />
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
    resetCollectionClientList,
    setCollectionClientList,
    setModalCollectionClientShow,
  }),
  component: React.memo(CollectionClientListPage)
});
