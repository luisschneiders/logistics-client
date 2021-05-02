import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonSelect,
  IonSelectOption,
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
import * as selectorsCollectionUser from '../../data/collectionUser/collectionUser.selectors';
import { setModalCollectionUserShow } from '../../data/modal/modal.actions';
import { collectionUserOptions } from '../../pages/user/CollectionUserOptions';
import { RoleType } from '../../enum/RoleType';
import { addCollectionUser } from '../../data/collectionUser/collectionUser.actions';
import { App } from '../../credentials/App';
import { CompanyProfile } from '../../models/CompanyProfile';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isShowModalCollectionUser: boolean;
  isSavingCompanyUser: boolean;
}

interface DispatchProps {
  setModalCollectionUserShow: typeof setModalCollectionUserShow;
  addCollectionUser: typeof addCollectionUser;
}

interface ModalUserTypeProps extends StateProps, DispatchProps {}

const LsModalCollectionUser: React.FC<ModalUserTypeProps> = ({
    isLoggedIn,
    companyProfile,
    isShowModalCollectionUser,
    isSavingCompanyUser,
    setModalCollectionUserShow,
    addCollectionUser,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [collectionUserName, setCompanyUserName] = useState<string>('');
  const [collectionUserOptionsList, setCompanyUserOptionsList] = useState<any[]>([]);
  const [collectionUserEmail, setCompanyUserEmail] = useState<string>('');
  const [collectionUserOption, setCompanyUserOption] = useState<string>(RoleType.USER);

  const userActionsOptions = async () => {
    const actions = collectionUserOptions();
    setCompanyUserOptionsList(await actions);
  }


  useEffect(() => {
    if (isShowModalCollectionUser) {
      handleShow();
      userActionsOptions();
      setModalCollectionUserShow(false);
    }
  }, [
    isLoggedIn,
    companyProfile,
    isShowModalCollectionUser,
    isSavingCompanyUser,
    setModalCollectionUserShow,
    handleShow
  ])

  const collectionUserForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !companyProfile) {
      return toast('Could not find associated company!', StatusColor.WARNING);
    }
    
    if (collectionUserName.trim() === '') {
      return toast('User name is required!', StatusColor.WARNING);
    }

    if (collectionUserEmail.trim() === '') {
      return toast('Email is required!', StatusColor.WARNING);
    }

    if (!collectionUserOption) {
      return toast('Role is required!', StatusColor.WARNING);
    }

    addCollectionUser({
      companyId: companyProfile.companyId,
      userEmail: collectionUserEmail,
      userName: collectionUserName,
      userRole: collectionUserOption,
      userIsActive: true,
      userPassword: App.defaultPassword,
    });
  }

  return (
    <ModalProvider>
      <IonLoading message="Please wait..." duration={0} isOpen={isSavingCompanyUser}></IonLoading>
      <LsMainModal
        id="modal-company-user"
        show={showModal}
        title="Add new user"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
        <form noValidate onSubmit={collectionUserForm}>
          <IonItem>
            <IonLabel position="stacked">User name</IonLabel>
            <IonInput
              name="collectionUserName"
              type="text"
              value={collectionUserName}
              spellCheck={false}
              autocapitalize="off"
              onIonChange={(e: any) => setCompanyUserName(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              name="collectionUserEmail"
              type="email"
              value={collectionUserEmail}
              spellCheck={false}
              autocapitalize="off"
              onIonChange={(e: any) => setCompanyUserEmail(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Role</IonLabel>
            <IonSelect
              onIonChange={e => setCompanyUserOption(e.detail.value)}
              value={collectionUserOption}
            >
              {collectionUserOptionsList.map((option: any, index: number) => (
                <IonSelectOption 
                  key={index}
                  value={option.value}
                >
                  {option.description}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem lines="none">
            <div slot="end" className="ion-padding-vertical">
              <IonButton
                type="submit"
                shape="round"
                color={AppColor.PRIMARY}
                disabled={isSavingCompanyUser ? true : false}
              >
                {isSavingCompanyUser ? 'Saving...' : 'Save'}
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
    isShowModalCollectionUser: selectorsModal.showModalCollectionUser(state),
    isSavingCompanyUser: selectorsCollectionUser.isSavingCollectionUser(state),
  }),
  mapDispatchToProps: ({
    setModalCollectionUserShow,
    addCollectionUser,
  }),
  component: LsModalCollectionUser
});
