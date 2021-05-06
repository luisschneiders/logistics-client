import React, { useEffect, useState } from 'react';
import {
  IonAvatar,
  IonButton,
  IonChip,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
} from '@ionic/react';
import { AppColor } from '../../enum/AppColor';
import { ModalProvider } from './ModalProvider';
import LsMainModal from './MainModal';
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
import { addOutline, closeCircle } from 'ionicons/icons';

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

interface ModalCollectionClientProps extends StateProps, DispatchProps {}

const LsModalCollectionClient: React.FC<ModalCollectionClientProps> = ({
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
  // const [employee, setEmployee] = useState<string>('');
  // const [clientEmployee, setClientEmployee] = useState<any[]>([]);

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

  const collectionClientForm = async (e: React.FormEvent) => {
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
      <LsMainModal
        id="modal-company-client"
        show={showModal}
        title="Add new client"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
        <form noValidate onSubmit={collectionClientForm}>
          <IonItem>
            <IonLabel position="stacked">Client name</IonLabel>
            <IonInput
              name="clientName"
              type="text"
              value={clientName}
              spellCheck={false}
              autocapitalize="off"
              className="ion-text-capitalize"
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
          {/* <IonItem>
            <IonLabel position="stacked">Employees</IonLabel>
            <IonInput
              name="employee"
              type="text"
              value={employee}
              spellCheck={false}
              autocapitalize="off"
              className="ion-text-uppercase"
              onIonChange={(e: any) => setEmployee(e.detail.value!)}
              required
            />
            <div slot="end" className="ion-padding-top">
            <IonButton
              size="small"
              shape="round"
              fill="outline"
              color={AppColor.SECONDARY}
            >
              Add
              <IonIcon slot="end" icon={addOutline} />
            </IonButton>
            </div>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">List of employees</IonLabel>
          </IonItem>
          <IonItem>
              <IonChip>
                <IonAvatar>
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>Avatar 1</IonLabel>
                <IonIcon icon={closeCircle} />
              </IonChip>
              <IonChip>
                <IonAvatar>
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>
                <IonLabel>Avatar 2</IonLabel>
                <IonIcon icon={closeCircle} />
              </IonChip>
          </IonItem> */}
          <IonItem lines="none">
            <div slot="end" className="ion-padding-vertical">
              <IonButton
                type="submit"
                shape="round"
                color={AppColor.PRIMARY}
                disabled={isSavingCollectionClient ? true : false}
              >
                {isSavingCollectionClient ? 'Saving...' : 'Save'}
              </IonButton>
            </div>
          </IonItem>
        </form>
      </LsMainModal>
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
  component: LsModalCollectionClient
});
