import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
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
import * as selectorsCollectionClient from '../../data/collectionClient/collectionClient.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListCollectionClient from '../../components/list/CollectionClient';
import { add } from 'ionicons/icons';
import { setModalCollectionClientShow } from '../../data/modal/modal.actions';
import LsModalCollectionClient from '../../components/modal/CollectionClient';
import { CompanyProfile } from '../../models/CompanyProfile';
import { setCollectionClientList } from '../../data/collectionClient/collectionClient.actions';

interface StateProps {
  companyProfile: CompanyProfile;
  isLoggedIn: boolean;
  isFetching: boolean;
}

interface DispatchProps {
  setCollectionClientList: typeof setCollectionClientList;
  setModalCollectionClientShow: typeof setModalCollectionClientShow;
}

interface CollectionClientProps extends StateProps, DispatchProps {}

const CollectionClientListPage: React.FC<CollectionClientProps> = ({
  isLoggedIn,
  isFetching,
  companyProfile,
  setCollectionClientList,
  setModalCollectionClientShow,
}) => {
 
  useEffect(() => {
    if (isLoggedIn && companyProfile) {
      setCollectionClientList(companyProfile.companyId, PageListItem.ITEM_100);
    }
  }, [
    isLoggedIn,
    companyProfile,
    setCollectionClientList,
    setModalCollectionClientShow,
  ]);

  return (
    <IonPage className="collection-client-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Clients</IonTitle>
          <IonFab vertical="center" horizontal="end">
            {(companyProfile?.companyId.length !== 0) && 
              <IonFabButton
                onClick={() => setModalCollectionClientShow(true)}
                color={AppColor.TERTIARY}
                size="small"
                title="Add new record"
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
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-no-padding">
        <LsListCollectionClient />
        <LsModalCollectionClient />
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
    setModalCollectionClientShow,
  }),
  component: React.memo(CollectionClientListPage)
});
