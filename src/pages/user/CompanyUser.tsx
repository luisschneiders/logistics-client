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
import * as selectorsUserType from '../../data/userType/userType.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListItemUserType from '../../components/list/ListItemUserType';
import {
  setUserTypeList
} from '../../data/userType/userType.actions';
import { add } from 'ionicons/icons';
import { setModalCompanyUserShow } from '../../data/modal/modal.actions';
import LsModalCompanyUser from '../../components/modal/ModalCompanyUser';
import { CompanyProfile } from '../../models/CompanyProfile';

interface StateProps {
  companyProfile: CompanyProfile;
  isLoggedIn: boolean;
  isFetching: boolean;
}

interface DispatchProps {
  setUserTypeList: typeof setUserTypeList;
  setModalCompanyUserShow: typeof setModalCompanyUserShow;
}

interface CompanyUserProps extends StateProps, DispatchProps {}

const CompanyUserPage: React.FC<CompanyUserProps> = ({
  isLoggedIn,
  isFetching,
  companyProfile,
  setUserTypeList,
  setModalCompanyUserShow,
}) => {
 
  useEffect(() => {
    if (isLoggedIn && companyProfile) {
      // setUserTypeList(companyProfile.companyId, 1, PageListItem.ITEM_12);
    }
  }, [
    isLoggedIn,
    companyProfile,
    setUserTypeList,
    setModalCompanyUserShow,
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Company users</IonTitle>
          <IonFab vertical="center" horizontal="end">
            {(companyProfile?.companyId.length !== 0) && 
              <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
                <IonIcon
                  icon={add}
                  onClick={() => setModalCompanyUserShow(true)}
                  size="small"
                />
              </IonFabButton>
            }
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-padding">
        <LsListItemUserType />
        <LsModalCompanyUser />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsUserType.isFetchingUserTypeList(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
  }),
  mapDispatchToProps: ({
    setUserTypeList,
    setModalCompanyUserShow,
  }),
  component: React.memo(CompanyUserPage)
});
