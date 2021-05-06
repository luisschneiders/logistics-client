import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTitle,
  IonButton,
  IonList,
  IonLoading,
} from '@ionic/react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsCollectionClient from '../../data/collectionClient/collectionClient.selectors';
import { StatusColor } from '../../enum/StatusColor';
import { toast } from '../../components/toast/Toast';
import { CollectionClient } from '../../models/CollectionClient';

import { CompanyProfile } from '../../models/CompanyProfile';
import { AppColor } from '../../enum/AppColor';
import {
  setCollectionClientById,
  updateCollectionClient
} from '../../data/collectionClient/collectionClient.actions';

interface OwnProps extends RouteComponentProps<{
  id: string;
}>{}

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isFetching: boolean;
  collectionClient: CollectionClient | undefined;
  collectionClientById: CollectionClient;
  isUpdatingCollectionClient: boolean;
};

interface DispatchProps {
  setCollectionClientById: typeof setCollectionClientById;
  updateCollectionClient: typeof updateCollectionClient;
};

interface CollectionClientDetailsProps extends OwnProps, StateProps, DispatchProps {};

const CollectionClientDetailsPage: React.FC<CollectionClientDetailsProps> = ({
    isLoggedIn,
    companyProfile,
    isFetching,
    match,
    collectionClient,
    collectionClientById,
    isUpdatingCollectionClient,
    setCollectionClientById,
    updateCollectionClient,
  }) => {

    const [clientName, setClientName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [suburb, setSuburb] = useState<string>('');
    const [postcode, setPostcode] = useState<number>();
    const [state, setState] = useState<string>('');
  
    const [isById, setIsById] = useState<boolean>(false);


    useEffect(() => {
      if (isLoggedIn && companyProfile) {
        // If user refresh the page, fetch the Client by id only once
        if (!collectionClient && !isById) {
          setCollectionClientById(match.params.id);
          setIsById(true);
        }
      }

      if (collectionClient) {
        setClientName(collectionClient.clientName);
        setAddress(collectionClient.clientAddress.address);
        setSuburb(collectionClient.clientAddress.suburb);
        setPostcode(collectionClient.clientAddress.postcode);
        setState(collectionClient.clientAddress.state);
      } else if (collectionClientById) {
        setClientName(collectionClientById.clientName);
        setAddress(collectionClientById.clientAddress.address);
        setSuburb(collectionClientById.clientAddress.suburb);
        setPostcode(collectionClientById.clientAddress.postcode);
        setState(collectionClientById.clientAddress.state);
      }

    }, [
      isLoggedIn,
      companyProfile,
      isFetching,
      collectionClient,
      match,
      collectionClientById,
      isUpdatingCollectionClient,
      setCollectionClientById,
      isById,
    ]);

    const formCollectionClient = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isLoggedIn || !companyProfile) {
        return toast('Could not find associated company!', StatusColor.WARNING);
      }
      if (clientName.trim() === '') {
        return toast('Client name is required!', StatusColor.WARNING);
      }
      if (address.trim() === '') {
        return toast('Address is required!', StatusColor.WARNING);
      }
      if (suburb.trim() === '') {
        return toast('Suburb is required!', StatusColor.WARNING);
      }
      if (state.trim() === '') {
        return toast('State is required!', StatusColor.WARNING);
      }
      if (!postcode) {
        return toast('Postcode is required!', StatusColor.WARNING);
      }

      const newCollectionClient: CollectionClient = collectionClient || collectionClientById;

      newCollectionClient.clientName = clientName;
      newCollectionClient.clientAddress.address = address;
      newCollectionClient.clientAddress.suburb = suburb;
      newCollectionClient.clientAddress.state = state;
      newCollectionClient.clientAddress.postcode = postcode;

      updateCollectionClient(newCollectionClient);
    }

  return (
    <IonPage id="collection-client-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.TABS_COLLECTION_CLIENT}></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">
            Update <span className="ion-text-underline"> {clientName}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching || isUpdatingCollectionClient}></IonLoading>
      <IonContent>
        <form noValidate onSubmit={formCollectionClient}>
          <IonList>
            <IonItem lines="full" disabled={!collectionClient && !collectionClientById}>
              <IonLabel position="stacked">Client name</IonLabel>
              <IonInput name="clientName"
                        type="text"
                        value={clientName}
                        spellCheck={false}
                        autocapitalize="off"
                        onIonChange={(e: any) => setClientName(e.detail.value!)} required
              >
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Address</IonLabel>
              <IonInput
                name="address"
                type="text"
                value={address}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e: any) => setAddress(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Suburb</IonLabel>
              <IonInput
                name="suburb"
                type="text"
                value={suburb}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e: any) => setSuburb(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">State</IonLabel>
              <IonInput
                name="state"
                type="text"
                value={state}
                spellCheck={false}
                autocapitalize="off"
                className="ion-text-uppercase"
                onIonChange={(e: any) => setState(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Postcode</IonLabel>
              <IonInput
                name="postcode"
                type="number"
                value={postcode}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e: any) => setPostcode(e.detail.value!)}
                min="0"
                required
              />
            </IonItem>
            <IonItem lines="none">
              <div slot="end">
                <IonButton
                  type="submit"
                  shape="round"
                  color={AppColor.PRIMARY}
                  disabled={!collectionClient && !collectionClientById}
                >
                  {isUpdatingCollectionClient ? 'Updating...' : 'Update'}
                </IonButton>
              </div>
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
    isFetching: selectorsCollectionClient.isFetchingCollectionClientList(state),
    collectionClient: selectorsCollectionClient.getCollectionClientFromList(state, OwnProps),
    collectionClientById: selectorsCollectionClient.getCollectionClient(state),
    isUpdatingCollectionClient: selectorsCollectionClient.isUpdatingCollectionClient(state),
  }),
  mapDispatchToProps: ({
    setCollectionClientById,
    updateCollectionClient,
  }),
  component: withRouter(CollectionClientDetailsPage)
});
