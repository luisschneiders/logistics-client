import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonIcon,
  IonAvatar,
  IonChip,
  IonSearchbar,
} from '@ionic/react';

import './List.scss';

import { connect } from '../../data/connect';

import { CompanyProfile } from '../../models/CompanyProfile';
import {
  ClientEmployee,
  CollectionClient,
  CollectionClientList
} from '../../models/CollectionClient';

import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsCollectionClient from '../../data/collectionClient/collectionClient.selectors';
import { AppColor } from '../../enum/AppColor';
import { PageListItem } from '../../enum/PageListItem';

import {
  businessOutline,
  personOutline
} from 'ionicons/icons';
import { setCollectionClientListLoadMore } from '../../data/collectionClient/collectionClient.actions';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  collectionClientList: CollectionClientList;
}

interface DispatchProps {
  setCollectionClientListLoadMore: typeof setCollectionClientListLoadMore;
}

interface ContainerProps extends StateProps, DispatchProps {}

const LsCollectionClientView: React.FC<ContainerProps> = ({
    isLoggedIn,
    companyProfile,
    collectionClientList,
    setCollectionClientListLoadMore,
  }) => {
  const [collectionClient, setCollectionClient] = useState<CollectionClient[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (collectionClientList) {
      setCollectionClient(collectionClientList.collectionClients);
    }
  }, [
    collectionClientList,
  ]);

  const loadMore = () => {
    if (isLoggedIn && companyProfile && companyProfile.companyId) {
      setCollectionClientListLoadMore(companyProfile.companyId, collectionClientList.pagination.lastVisible, PageListItem.ITEM_50);
    }
  };

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
      ></IonSearchbar>
      {(collectionClient && collectionClient.length > 0) &&
        <IonList lines="full" className="ion-no-padding">
          {collectionClient.map((item: CollectionClient, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  lines="none"
                  className="ion-no-padding"
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
                    <div className="list-collection-client-details__item-employee">
                      {item.clientEmployee?.map((employee: ClientEmployee, employeeIndex: number) => (
                      <IonChip
                        key={employeeIndex}
                        color={AppColor.SECONDARY}
                      >
                        <IonIcon size="small" icon={personOutline} color={AppColor.PRIMARY} />
                        <IonLabel>{employee.name}</IonLabel>
                      </IonChip>
                      ))}
                    </div>
                  </IonLabel>
                </IonItem>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      }
      {((collectionClient && collectionClient.length > 0) && collectionClientList.pagination.lastVisible?.exists) &&
        <div className="ion-text-center">
          <IonButton
            fill="clear"
            color={AppColor.TERTIARY}
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
    collectionClientList: selectorsCollectionClient.getCollectionClientView(state),
  }),
  mapDispatchToProps: ({
    setCollectionClientListLoadMore
  }),
  component: LsCollectionClientView
});
