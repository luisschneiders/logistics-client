import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonToggle,
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsCollectionUser from '../../data/collectionUser/collectionUser.selectors';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { PageListItem } from '../../enum/PageListItem';
import LsMainCard from '../card/MainCard';
import * as ROUTES from '../../constants/Routes';
import { CompanyProfile } from '../../models/CompanyProfile';
import { companyUserOptions } from '../../pages/user/CompanyUserOptions';
import { setCollectionUserListLoadMore } from '../../data/collectionUser/collectionUser.actions';
import { CollectionUser, CollectionUserList } from '../../models/CollectionUser';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isFetching: boolean;
  collectionUserList: CollectionUserList;
}

interface DispatchProps {
  setCollectionUserListLoadMore: typeof setCollectionUserListLoadMore;
  // updateUserType: typeof updateUserType;
}

interface ListUserTypeProps extends StateProps, DispatchProps {}

const LsListItemCollectionUser: React.FC<ListUserTypeProps> = ({
    isLoggedIn,
    companyProfile,
    isFetching,
    collectionUserList,
    setCollectionUserListLoadMore,
  }) => {
  const [collectionUser, setCollectionUser] = useState<CollectionUser[]>([]);
  const [collectionUserOptionsList, setCollectionUserOptionsList] = useState<any[]>([]);
  const userActionsOptions = async () => {
    const actions = companyUserOptions();
    setCollectionUserOptionsList(await actions);
  }

  useEffect(() => {
    userActionsOptions();
    if (collectionUserList) {
      setCollectionUser(collectionUserList.collectionUsers);
    }
  }, [
    collectionUserList,
    isFetching,
  ]);

  const loadMore = () => {
    if (isLoggedIn && companyProfile) {
      setCollectionUserListLoadMore(companyProfile.companyId, collectionUserList.pagination.lastVisible, PageListItem.ITEM_100);
    }
  };

  const changeStatus = async (collectionUser: CollectionUser) => {
    if (collectionUser) {
      const newCollectionUser: CollectionUser = collectionUser;
      newCollectionUser.userIsActive = !collectionUser.userIsActive

      // updateCollectionUser(newCollectionUser);
    }
  }
  
  return (
    <>
      {collectionUser && collectionUser.length > 0 &&
        <IonList lines="full" className="ion-no-padding">
          {collectionUser.map((item: CollectionUser, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  lines="none"
                  className="ion-no-padding"
                  routerLink={`${ROUTES.TABS_COMPANY_USER}/${item.userId}`}
                >
                  <IonLabel>
                    <strong className="ion-text-capitalize">Details: </strong>
                    <div>{item.userName}</div>
                    <div>{item.userEmail}</div>
                  </IonLabel>
                </IonItem>
              </IonLabel>
              <div slot="end">
                <IonToggle color={StatusColor.SUCCESS} checked={item.userIsActive} onClick={() => changeStatus(item)} />
              </div>
            </IonItem>
          ))}
        </IonList>
      }
      {((collectionUser && collectionUser.length > 0) && collectionUserList.pagination.lastVisible?.exists) &&
        <div className="ion-text-center">
          <IonButton fill="clear" color={AppColor.TERTIARY} disabled={isFetching} onClick={loadMore}>Load more...</IonButton>
        </div>
      }
      {(!collectionUser.length && !isFetching)&& 
        <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
    isFetching: selectorsCollectionUser.isFetchingCollectionUserList(state),
    collectionUserList: selectorsCollectionUser.getCollectionUserList(state),
  }),
  mapDispatchToProps: ({
    setCollectionUserListLoadMore,
    // updateUserType,
  }),
  component: LsListItemCollectionUser
});
