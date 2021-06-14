import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonIcon,
  IonAvatar,
  IonSearchbar,
  IonToggle,
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
  setCollectionClientListLoadMore, updateCollectionClient,
} from '../../data/collectionClient/collectionClient.actions';

import { AppColor } from '../../enum/AppColor';
import { PageListItem } from '../../enum/PageListItem';
import * as ROUTES from '../../constants/Routes';
import { businessOutline } from 'ionicons/icons';
import { StatusColor } from '../../enum/StatusColor';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  // isFetching: boolean;
  collectionClientList: CollectionClientList;
}

interface DispatchProps {
  setCollectionClientListLoadMore: typeof setCollectionClientListLoadMore;
  updateCollectionClient: typeof updateCollectionClient;
}

interface ContainerProps extends StateProps, DispatchProps {}

const LsCollectionClientList: React.FC<ContainerProps> = ({
    isLoggedIn,
    companyProfile,
    // isFetching,
    collectionClientList,
    setCollectionClientListLoadMore,
    updateCollectionClient,
  }) => {
  const [collectionClient, setCollectionClient] = useState<CollectionClient[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (collectionClientList) {
      setCollectionClient(collectionClientList.collectionClients);
    }
  }, [
    collectionClientList,
    // isFetching,
  ]);

  const loadMore = () => {
    if (isLoggedIn && companyProfile) {
      setCollectionClientListLoadMore(companyProfile.companyId, collectionClientList.pagination.lastVisible, PageListItem.ITEM_100);
    }
  };

  const changeStatus = async (collectionClient: CollectionClient) => {
    if (collectionClient) {
      const updatedCollectionClient: CollectionClient = collectionClient;
      updatedCollectionClient.clientIsActive = !collectionClient.clientIsActive;

      updateCollectionClient(updatedCollectionClient);
    }
  }

  const handleOnChange = async (e: any) => {
    const clientFiltered: any = collectionClientList.collectionClients.filter(client => client.clientName.toLowerCase().includes(e.detail.value!.toLowerCase()));
    setCollectionClient(clientFiltered);
    setSearchText(e.detail.value!);
  }

  return (
    <>
      <IonSearchbar
        value={searchText}
        onIonChange={handleOnChange}
        animated
      ></IonSearchbar>
      {(collectionClient && collectionClient.length > 0) &&
        <IonList lines="full" className="ion-no-padding">
          {collectionClient.map((item: CollectionClient, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  lines="none"
                  className="ion-no-padding"
                  routerLink={`${ROUTES.TABS_COLLECTION_CLIENT_LIST}/${item.clientId}`}
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
                      {`${item.clientAddress.suburb}, ${item.clientAddress.state.toUpperCase()} ${item.clientAddress.postcode}`}
                    </p>
                  </IonLabel>
                </IonItem>
              </IonLabel>
              <IonToggle
                color={StatusColor.SUCCESS}
                checked={item.clientIsActive} onClick={() => changeStatus(item)}
              />
            </IonItem>
          ))}
        </IonList>
      }
      {((collectionClient && collectionClient.length > 0) && collectionClientList.pagination.lastVisible?.exists) &&
        <div className="ion-text-center">
          <IonButton
            fill="clear"
            color={AppColor.TERTIARY}
            // disabled={isFetching}
            onClick={loadMore}
          >
            Load more...
          </IonButton>
        </div>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
    // isFetching: selectorsCollectionClient.isFetchingCollectionClientList(state),
    collectionClientList: selectorsCollectionClient.getCollectionClientList(state),
  }),
  mapDispatchToProps: ({
    setCollectionClientListLoadMore,
    updateCollectionClient,
  }),
  component: LsCollectionClientList
});
