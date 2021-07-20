import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { AppColor } from '../../enum/AppColor';
import { ModalProvider } from './ModalProvider';
import LsModal from './Modal';
import { toast } from '../toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { useModal } from '../../hooks/useModal';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsModal from '../../data/modal/modal.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsCollectionClient from '../../data/collectionClient/collectionClient.selectors';
import * as selectorsCollectionDelivery from '../../data/collectionDelivery/collectionDelivery.selectors';
import { setModalCollectionDeliveryShow } from '../../data/modal/modal.actions';
import { CompanyProfile } from '../../models/CompanyProfile';
import { DeliverySchedule } from '../../enum/DeliverySchedule';
import { collectionDeliveryOptions } from '../../pages/delivery/CollectionDeliveryOptions';
import { CollectionClientListActive } from '../../models/CollectionClient';
import * as MOMENT  from '../../util/moment';
import { addCollectionDelivery } from '../../data/collectionDelivery/collectionDelivery.actions';
import { dateFormatYYYYMMDD } from '../../util/moment';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isShowModalCollectionDelivery: boolean;
  collectionClientListActive: CollectionClientListActive;
  isSavingCollectionDelivery: boolean;
}

interface DispatchProps {
  setModalCollectionDeliveryShow: typeof setModalCollectionDeliveryShow;
  addCollectionDelivery: typeof addCollectionDelivery;
}

interface ContainerProps extends StateProps, DispatchProps {}

const LsCollectionDelivery: React.FC<ContainerProps> = ({
    isLoggedIn,
    companyProfile,
    isShowModalCollectionDelivery,
    collectionClientListActive,
    isSavingCollectionDelivery,
    setModalCollectionDeliveryShow,
    addCollectionDelivery,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();
  const [deliveryDate, setDeliveryDate] = useState<string>(MOMENT.currentDayDD);
  const [deliveryInvoice, setDeliveryInvoice] = useState<string>('');
  const [deliveryScheduleOptionsList, setDeliveryScheduleOptionsList] = useState<any[]>([]);
  const [deliverySchedule, setDeliverySchedule] = useState<string>(DeliverySchedule.MORNING);
  const [deliveryClientIdOptionsList, setDeliveryClientIdOptionsList] = useState<any[]>([]);
  const [deliveryClientId, setDeliveryClientId] = useState<string>('');

  const deliveryScheduleOptions = async () => {
    const actions = collectionDeliveryOptions();
    setDeliveryScheduleOptionsList(await actions);
  }

  const selectInput = {
    cssClass: 'select-collection-delivery-client'
  };

  useEffect(() => {
    if (isShowModalCollectionDelivery) {
      handleShow();
      deliveryScheduleOptions();
      setModalCollectionDeliveryShow(false);
    }
    if (isLoggedIn && companyProfile && companyProfile.companyId) {
      setDeliveryClientIdOptionsList(
        collectionClientListActive.collectionClients.sort((a, b) => a.clientName.localeCompare(b.clientName))
      );
    }
  }, [
    isLoggedIn,
    companyProfile,
    isShowModalCollectionDelivery,
    collectionClientListActive,
    isSavingCollectionDelivery,
    setModalCollectionDeliveryShow,
    handleShow
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

    addCollectionDelivery({
      companyId: companyProfile.companyId,
      deliveryDate: dateFormatYYYYMMDD(deliveryDate),
      deliveryClientId,
      deliveryClient: deliveryClientIdOptionsList.find((e:any) => e.clientId === deliveryClientId),
      deliveryInvoice,
      deliverySchedule,
      deliveryIsActive: true,
    });
  }

  return (
    <ModalProvider>
      <IonLoading message="Please wait..." duration={0} isOpen={isSavingCollectionDelivery}></IonLoading>
      <LsModal
        id="modal-company-user"
        show={showModal}
        title="Add delivery"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
        <form noValidate onSubmit={form} className="collection-delivery">
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
          <IonItem lines="none">
            <div slot="end" className="ion-padding-vertical">
              <IonButton
                type="submit"
                shape="round"
                size="default"
                color={AppColor.PRIMARY}
                disabled={isSavingCollectionDelivery ? true : false}
              >
                {isSavingCollectionDelivery ? 'Saving...' : 'Save'}
              </IonButton>
            </div>
          </IonItem>
        </form>
      </LsModal>
    </ModalProvider>
  );
}

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
    isShowModalCollectionDelivery: selectorsModal.showModalCollectionDelivery(state),
    collectionClientListActive: selectorsCollectionClient.getCollectionClientListActive(state),
    isSavingCollectionDelivery: selectorsCollectionDelivery.isSavingCollectionDelivery(state),
  }),
  mapDispatchToProps: ({
    setModalCollectionDeliveryShow,
    addCollectionDelivery,
  }),
  component: LsCollectionDelivery
});
