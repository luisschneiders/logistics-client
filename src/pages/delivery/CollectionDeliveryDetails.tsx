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
  IonSelect,
  IonSelectOption,
  IonDatetime,
} from '@ionic/react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';
import './CollectionDelivery.scss';
import { connect } from '../../data/connect';
import * as MOMENT  from '../../util/moment';
import * as ROUTES from '../../constants/Routes';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsCollectionDelivery from '../../data/collectionDelivery/collectionDelivery.selectors';
import {
  setCollectionDeliveryById,
  updateCollectionDelivery
} from '../../data/collectionDelivery/collectionDelivery.actions';
import { StatusColor } from '../../enum/StatusColor';
import { toast } from '../../components/toast/Toast';
import { CompanyProfile } from '../../models/CompanyProfile';
import { AppColor } from '../../enum/AppColor';
import { CollectionDelivery } from '../../models/CollectionDelivery';
import { DeliverySchedule } from '../../enum/DeliverySchedule';
import { collectionDeliveryOptions } from './CollectionDeliveryOptions';
import { dateFormatYYYYMMDD } from '../../util/moment';
import { fetchCollectionClientListActive } from '../../data/api/CollectionClient';

interface OwnProps extends RouteComponentProps<{
  id: string;
}>{}

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isUpdating: boolean;
  collectionDelivery: CollectionDelivery | undefined;
  collectionDeliveryById: CollectionDelivery;
};

interface DispatchProps {
  setCollectionDeliveryById: typeof setCollectionDeliveryById;
  updateCollectionDelivery: typeof updateCollectionDelivery;
};

interface ContainerProps extends OwnProps, StateProps, DispatchProps {};

const CollectionDeliveryDetailsPage: React.FC<ContainerProps> = ({
    isLoggedIn,
    companyProfile,
    isUpdating,
    match,
    collectionDelivery,
    collectionDeliveryById,
    setCollectionDeliveryById,
    updateCollectionDelivery,
  }) => {

    const [deliveryDate, setDeliveryDate] = useState<string>(MOMENT.currentDayDD);
    const [deliveryInvoice, setDeliveryInvoice] = useState<string>('');
    const [deliveryScheduleOptionsList, setDeliveryScheduleOptionsList] = useState<any[]>([]);
    const [deliverySchedule, setDeliverySchedule] = useState<string>(DeliverySchedule.MORNING);
    const [deliveryClientIdOptionsList, setDeliveryClientIdOptionsList] = useState<any[]>([]);
    const [deliveryClientId, setDeliveryClientId] = useState<string>('');
    const [deliveryReceiver, setDeliveryReceiver] = useState<string>('');
    const [deliveryTime, setDeliveryTime] = useState<string>('');
    const [deliveryIsActive, setDeliveryIsActive] = useState<boolean>(false);

    const [isById, setIsById] = useState<boolean>(false);

    const deliveryScheduleOptions = async () => {
      const actions = collectionDeliveryOptions();
      setDeliveryScheduleOptionsList(await actions);
    }

    const selectInput = {
      cssClass: 'select-collection-delivery-client'
    };
 
    useEffect(() => {
      if (isLoggedIn && companyProfile) {
        fetchCollectionClientListActive(companyProfile.companyId)
          .then((data: any) => {
            if (data && data.collectionClients.length >= 0) {
              setDeliveryClientIdOptionsList(data.collectionClients.sort((a:any, b:any) => a.clientName.localeCompare(b.clientName)));
            }
          });
        deliveryScheduleOptions();

        // If user refresh the page, fetch the Client by id only once
        if (!collectionDelivery && !isById) {
          setCollectionDeliveryById(match.params.id);
          setIsById(true);
        }
      }

      if (collectionDelivery) {
        setDeliveryDate(collectionDelivery.deliveryDate);
        setDeliveryInvoice(collectionDelivery.deliveryInvoice);
        setDeliverySchedule(collectionDelivery.deliverySchedule);
        setDeliveryClientId(collectionDelivery.deliveryClientId);
        setDeliveryReceiver(collectionDelivery.deliveryReceiver);
        setDeliveryTime(collectionDelivery.deliveryTime);
        setDeliveryIsActive(collectionDelivery.deliveryIsActive);
      } else if (collectionDeliveryById) {
        setDeliveryDate(collectionDeliveryById.deliveryDate);
        setDeliveryInvoice(collectionDeliveryById.deliveryInvoice);
        setDeliverySchedule(collectionDeliveryById.deliverySchedule);
        setDeliveryClientId(collectionDeliveryById.deliveryClientId);
        setDeliveryReceiver(collectionDeliveryById.deliveryReceiver);
        setDeliveryTime(collectionDeliveryById.deliveryTime);
        setDeliveryIsActive(collectionDeliveryById.deliveryIsActive);
      }

    }, [
      isLoggedIn,
      companyProfile,
      collectionDelivery,
      match,
      collectionDeliveryById,
      isUpdating,
      setCollectionDeliveryById,
      isById,
    ]);

    const form = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isLoggedIn || !companyProfile) {
        return toast('Could not find associated company!', StatusColor.WARNING);
      }

      if (deliverySchedule.trim() === '') {
        return toast('Delivery schedule required!', StatusColor.WARNING);
      }

      if (deliveryInvoice.trim() === '') {
        return toast('Invoice is required!', StatusColor.WARNING);
      }

      if (deliveryClientId.trim() === '') {
        return toast('Client required!', StatusColor.WARNING);
      }

      const newCollectionDelivery: CollectionDelivery = collectionDelivery || collectionDeliveryById;

      newCollectionDelivery.deliveryDate = dateFormatYYYYMMDD(deliveryDate);
      newCollectionDelivery.deliveryClientId = deliveryClientId;
      newCollectionDelivery.deliveryClient = deliveryClientIdOptionsList.find((e:any) => e.clientId === deliveryClientId);
      newCollectionDelivery.deliveryInvoice = deliveryInvoice;
      newCollectionDelivery.deliverySchedule = deliverySchedule;
      newCollectionDelivery.deliveryReceiver = deliveryReceiver;
      newCollectionDelivery.deliveryTime = deliveryTime ? deliveryTime : '';
      newCollectionDelivery.deliveryIsActive = deliveryIsActive;

      updateCollectionDelivery(newCollectionDelivery);
    }

  return (
    <IonPage id="collection-client-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.TABS_COLLECTION_DELIVERY}></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">
            <span className="ion-text-underline"> {`Inv: ${deliveryInvoice}`}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isUpdating}></IonLoading>
      <IonContent>
        <form noValidate onSubmit={form}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Delivery Date</IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                placeholder="Delivery Date"
                value={deliveryDate}
                onIonChange={e => setDeliveryDate(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Delivery Schedule</IonLabel>
              <IonSelect
                onIonChange={e => setDeliverySchedule(e.detail.value)}
                value={deliverySchedule}
              >
                {deliveryScheduleOptionsList.map((option: any, index: number) => (
                  <IonSelectOption 
                    key={index}
                    value={option.value}
                  >
                    {option.description}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Invoice</IonLabel>
              <IonInput
                name="deliveryInvoice"
                type="text"
                value={deliveryInvoice}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e: any) => setDeliveryInvoice(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Client</IonLabel>
              <IonSelect
                onIonChange={e => setDeliveryClientId(e.detail.value)}
                value={deliveryClientId}
                interfaceOptions={selectInput}
              >
                {deliveryClientIdOptionsList.map((option: any, index: number) => (
                  <IonSelectOption 
                    key={index}
                    value={option.clientId}
                  >
                    {option.clientName}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Receiver</IonLabel>
              <IonInput
                name="deliveryReceiver"
                type="text"
                value={deliveryReceiver}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e: any) => setDeliveryReceiver(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Arrival time</IonLabel>
              <IonDatetime
                displayFormat="HH:mm"
                placeholder="Arrival time"
                value={deliveryTime}
                onIonChange={e => setDeliveryTime(e.detail.value!)}
              />
            </IonItem>
            <IonItem lines="none">
              <div slot="end">
                <IonButton
                  type="submit"
                  shape="round"
                  size="default"
                  color={AppColor.PRIMARY}
                  disabled={!collectionDelivery && !collectionDeliveryById}
                >
                  {isUpdating ? 'Updating...' : 'Update'}
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
    isUpdating: selectorsCollectionDelivery.isUpdatingCollectionDelivery(state),
    collectionDelivery: selectorsCollectionDelivery.getCollectionDeliveryFromList(state, OwnProps),
    collectionDeliveryById: selectorsCollectionDelivery.getCollectionDelivery(state),
  }),
  mapDispatchToProps: ({
    setCollectionDeliveryById,
    updateCollectionDelivery,
  }),
  component: withRouter(CollectionDeliveryDetailsPage)
});
