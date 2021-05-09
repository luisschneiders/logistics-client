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
import * as selectorsCollectionUser from '../../data/collectionUser/collectionUser.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListCollectionUser from '../../components/list/CollectionUser';
import { add } from 'ionicons/icons';
import { setModalCollectionUserShow } from '../../data/modal/modal.actions';
import LsModalCollectionUser from '../../components/modal/CollectionUser';
import { CompanyProfile } from '../../models/CompanyProfile';
import { setCollectionUserList } from '../../data/collectionUser/collectionUser.actions';

interface StateProps {
  companyProfile: CompanyProfile;
  isLoggedIn: boolean;
  isFetching: boolean;
}

interface DispatchProps {
  setCollectionUserList: typeof setCollectionUserList;
  setModalCollectionUserShow: typeof setModalCollectionUserShow;
}

interface ContainerProps extends StateProps, DispatchProps {}

const CollectionUserListPage: React.FC<ContainerProps> = ({
  isLoggedIn,
  isFetching,
  companyProfile,
  setCollectionUserList,
  setModalCollectionUserShow,
}) => {
 
  useEffect(() => {
    if (isLoggedIn && companyProfile) {
      setCollectionUserList(companyProfile.companyId, PageListItem.ITEM_100);
    }
  }, [
    isLoggedIn,
    companyProfile,
    setCollectionUserList,
    setModalCollectionUserShow,
  ]);

  return (
    <IonPage className="collection-user-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Users</IonTitle>
          <IonFab vertical="center" horizontal="end">
            {(companyProfile?.companyId.length !== 0) && 
              <IonFabButton
                onClick={() => setModalCollectionUserShow(true)}
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
        <LsListCollectionUser />
        <LsModalCollectionUser />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsCollectionUser.isFetchingCollectionUserList(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
  }),
  mapDispatchToProps: ({
    setCollectionUserList,
    setModalCollectionUserShow,
  }),
  component: React.memo(CollectionUserListPage)
});
