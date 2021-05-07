import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonIcon,
  IonAvatar,
} from '@ionic/react';

import { connect } from '../../data/connect';

import { CompanyProfile } from '../../models/CompanyProfile';
import {
  CollectionClient,
  CollectionClientList
} from '../../models/CollectionClient';

import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsCollectionClient from '../../data/collectionClient/collectionClient.selectors';
import {
  setCollectionClientListLoadMore,
} from '../../data/collectionClient/collectionClient.actions';

import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { PageListItem } from '../../enum/PageListItem';
import * as ROUTES from '../../constants/Routes';

import LsMainCard from '../card/MainCard';
import { businessOutline } from 'ionicons/icons';


interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isFetching: boolean;
  collectionClientList: CollectionClientList;
}

interface DispatchProps {
  setCollectionClientListLoadMore: typeof setCollectionClientListLoadMore;
}

interface ListCollectionClientProps extends StateProps, DispatchProps {}

const LsListCollectionClient: React.FC<ListCollectionClientProps> = ({
    isLoggedIn,
    companyProfile,
    isFetching,
    collectionClientList,
    setCollectionClientListLoadMore,
  }) => {
  const [collectionClient, setCollectionClient] = useState<CollectionClient[]>([]);

  useEffect(() => {
    if (collectionClientList) {
      setCollectionClient(collectionClientList.collectionClients);
    }
  }, [
    collectionClientList,
    isFetching,
  ]);

  const loadMore = () => {
    if (isLoggedIn && companyProfile) {
      setCollectionClientListLoadMore(companyProfile.companyId, collectionClientList.pagination.lastVisible, PageListItem.ITEM_100);
    }
  };

  return (
    <>
      {collectionClient && collectionClient.length > 0 &&
        <IonList lines="full" className="ion-no-padding">
          {collectionClient.map((item: CollectionClient, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  lines="none"
                  className="ion-no-padding"
                  routerLink={`${ROUTES.TABS_COLLECTION_CLIENT}/${item.clientId}`}
                  detail={true}
                >
                  <IonAvatar slot="start">
                    <IonIcon size="large" icon={businessOutline} color={AppColor.SECONDARY} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>
                      {item.clientName}
                    </h2>
                    <p>
                      {item.clientAddress.suburb}
                    </p>
                  </IonLabel>
                </IonItem>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      }
      {((collectionClient && collectionClient.length > 0) && collectionClientList.pagination.lastVisible?.exists) &&
        <div className="ion-text-center">
          <IonButton fill="clear" color={AppColor.TERTIARY} disabled={isFetching} onClick={loadMore}>Load more...</IonButton>
        </div>
      }
      {(!collectionClient.length && !isFetching)&& 
        <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
    isFetching: selectorsCollectionClient.isFetchingCollectionClientList(state),
    collectionClientList: selectorsCollectionClient.getCollectionClientList(state),
  }),
  mapDispatchToProps: ({
    setCollectionClientListLoadMore,
  }),
  component: LsListCollectionClient
});
