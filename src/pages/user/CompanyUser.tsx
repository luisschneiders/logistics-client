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
import LsListItemCompanyUser from '../../components/list/ListItemCollectionUser';
import { add } from 'ionicons/icons';
import { setModalCompanyUserShow } from '../../data/modal/modal.actions';
import LsModalCompanyUser from '../../components/modal/ModalCompanyUser';
import { CompanyProfile } from '../../models/CompanyProfile';
import { setCollectionUserList } from '../../data/collectionUser/collectionUser.actions';

interface StateProps {
  companyProfile: CompanyProfile;
  isLoggedIn: boolean;
  isFetching: boolean;
}

interface DispatchProps {
  setCollectionUserList: typeof setCollectionUserList;
  setModalCompanyUserShow: typeof setModalCompanyUserShow;
}

interface CompanyUserProps extends StateProps, DispatchProps {}

const CompanyUserPage: React.FC<CompanyUserProps> = ({
  isLoggedIn,
  isFetching,
  companyProfile,
  setCollectionUserList,
  setModalCompanyUserShow,
}) => {
 
  useEffect(() => {
    if (isLoggedIn && companyProfile) {
      setCollectionUserList(companyProfile.companyId, PageListItem.ITEM_100);
    }
  }, [
    isLoggedIn,
    companyProfile,
    setCollectionUserList,
    setModalCompanyUserShow,
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Users</IonTitle>
          <IonFab vertical="center" horizontal="end">
            {(companyProfile?.companyId.length !== 0) && 
              <IonFabButton
                onClick={() => setModalCompanyUserShow(true)}
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
        <LsListItemCompanyUser />
        <LsModalCompanyUser />
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
    setModalCompanyUserShow,
  }),
  component: React.memo(CompanyUserPage)
});
