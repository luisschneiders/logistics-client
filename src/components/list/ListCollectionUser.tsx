import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonToggle,
  IonAvatar,
  IonIcon,
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
import {
  setCollectionUserListLoadMore,
  updateCollectionUser
} from '../../data/collectionUser/collectionUser.actions';
import {
  CollectionUser,
  CollectionUserList
} from '../../models/CollectionUser';
import { peopleOutline } from 'ionicons/icons';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isFetching: boolean;
  collectionUserList: CollectionUserList;
}

interface DispatchProps {
  setCollectionUserListLoadMore: typeof setCollectionUserListLoadMore;
  updateCollectionUser: typeof updateCollectionUser;
}

interface ListCollectionUserProps extends StateProps, DispatchProps {}

const LsListCollectionUser: React.FC<ListCollectionUserProps> = ({
    isLoggedIn,
    companyProfile,
    isFetching,
    collectionUserList,
    setCollectionUserListLoadMore,
    updateCollectionUser,
  }) => {
  const [collectionUser, setCollectionUser] = useState<CollectionUser[]>([]);

  useEffect(() => {
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
      const updatedCollectionUser: CollectionUser = collectionUser;
      updatedCollectionUser.userIsActive = !collectionUser.userIsActive;

      updateCollectionUser(updatedCollectionUser);
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
                  routerLink={`${ROUTES.TABS_COLLECTION_USER}/${item.userId}`}
                  detail={true}
                >
                  <IonAvatar slot="start">
                    <IonIcon size="large" icon={peopleOutline} color={AppColor.SECONDARY} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{item.userName}</h2>
                    <p>{item.userEmail}</p>
                  </IonLabel>
                </IonItem>
              </IonLabel>
              <IonToggle
                color={StatusColor.SUCCESS}
                checked={item.userIsActive} onClick={() => changeStatus(item)}
              />
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
    updateCollectionUser,
  }),
  component: LsListCollectionUser
});
