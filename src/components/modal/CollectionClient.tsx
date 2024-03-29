import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
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
import { setModalCollectionClientShow } from '../../data/modal/modal.actions';
import { addCollectionClient } from '../../data/collectionClient/collectionClient.actions';
import { CompanyProfile } from '../../models/CompanyProfile';
import { MapLocation } from '../../models/MapLocation';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isShowModalCollectionClient: boolean;
  isSavingCollectionClient: boolean;
}

interface DispatchProps {
  setModalCollectionClientShow: typeof setModalCollectionClientShow;
  addCollectionClient: typeof addCollectionClient;
}

interface ContainerProps extends StateProps, DispatchProps {}

const LsCollectionClient: React.FC<ContainerProps> = ({
    isLoggedIn,
    companyProfile,
    isShowModalCollectionClient,
    isSavingCollectionClient,
    setModalCollectionClientShow,
    addCollectionClient,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [clientName, setClientName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [suburb, setSuburb] = useState<string>('');
  const [postcode, setPostcode] = useState<number>();
  const [state, setState] = useState<string>('');

  useEffect(() => {
    if (isShowModalCollectionClient) {
      handleShow();
      setModalCollectionClientShow(false);
    }
  }, [
    isLoggedIn,
    companyProfile,
    isShowModalCollectionClient,
    isSavingCollectionClient,
    setModalCollectionClientShow,
    handleShow
  ])

  const form = async (e: React.FormEvent) => {
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

    const clientAddress: MapLocation = {
      address, suburb, postcode, state
    }

    addCollectionClient({
      companyId: companyProfile.companyId,
      clientName,
      clientAddress,
      clientIsActive: true,
    });
  }

  return (
    <ModalProvider>
      <IonLoading message="Please wait..." duration={0} isOpen={isSavingCollectionClient}></IonLoading>
      <LsModal
        id="modal-company-client"
        show={showModal}
        title="Add client"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
        <form noValidate onSubmit={form}>
          <IonItem>
            <IonLabel position="stacked">Client name</IonLabel>
            <IonInput
              name="clientName"
              type="text"
              value={clientName}
              spellCheck={false}
              autocapitalize="off"
              onIonChange={(e: any) => setClientName(e.detail.value!)}
              required
            />
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
            <div slot="end" className="ion-padding-vertical">
              <IonButton
                type="submit"
                shape="round"
                size="default"
                color={AppColor.PRIMARY}
                disabled={isSavingCollectionClient ? true : false}
              >
                {isSavingCollectionClient ? 'Saving...' : 'Save'}
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
    isShowModalCollectionClient: selectorsModal.showModalCollectionClient(state),
    isSavingCollectionClient: selectorsCollectionClient.isSavingCollectionClient(state),
  }),
  mapDispatchToProps: ({
    setModalCollectionClientShow,
    addCollectionClient,
  }),
  component: LsCollectionClient
});
