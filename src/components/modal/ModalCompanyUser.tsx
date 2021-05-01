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
import { setModalCompanyUserShow } from '../../data/modal/modal.actions';
import { companyUserOptions } from '../../pages/user/CompanyUserOptions';
import { RoleType } from '../../enum/RoleType';
import { addCollectionUser } from '../../data/collectionUser/collectionUser.actions';
import { App } from '../../credentials/App';
import { CompanyProfile } from '../../models/CompanyProfile';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isShowModalCompanyUser: boolean;
  isSavingCompanyUser: boolean;
}

interface DispatchProps {
  setModalCompanyUserShow: typeof setModalCompanyUserShow;
  addCollectionUser: typeof addCollectionUser;
}

interface ModalUserTypeProps extends StateProps, DispatchProps {}

const LsModalCompanyUser: React.FC<ModalUserTypeProps> = ({
    isLoggedIn,
    companyProfile,
    isShowModalCompanyUser,
    isSavingCompanyUser,
    setModalCompanyUserShow,
    addCollectionUser,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [companyUserName, setCompanyUserName] = useState<string>('');
  const [companyUserOptionsList, setCompanyUserOptionsList] = useState<any[]>([]);
  const [companyUserEmail, setCompanyUserEmail] = useState<string>('');
  const [companyUserOption, setCompanyUserOption] = useState<string>(RoleType.USER);

  const userActionsOptions = async () => {
    const actions = companyUserOptions();
    setCompanyUserOptionsList(await actions);
  }


  useEffect(() => {
    if (isShowModalCompanyUser) {
      handleShow();
      userActionsOptions();
      setModalCompanyUserShow(false);
    }
  }, [
    isLoggedIn,
    companyProfile,
    isShowModalCompanyUser,
    isSavingCompanyUser,
    setModalCompanyUserShow,
    handleShow
  ])

  const companyUserForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !companyProfile) {
      return toast('Could not find associated company!', StatusColor.WARNING);
    }
    
    if (companyUserName.trim() === '') {
      return toast('User name is required!', StatusColor.WARNING);
    }

    if (companyUserEmail.trim() === '') {
      return toast('Email is required!', StatusColor.WARNING);
    }

    if (!companyUserOption) {
      return toast('Role is required!', StatusColor.WARNING);
    }

    addCollectionUser({
      companyId: companyProfile.companyId,
      userEmail: companyUserEmail,
      userName: companyUserName,
      userRole: companyUserOption,
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
        <form noValidate onSubmit={companyUserForm}>
          <IonItem>
            <IonLabel position="stacked">User name</IonLabel>
            <IonInput
              name="companyUserName"
              type="text"
              value={companyUserName}
              spellCheck={false}
              autocapitalize="off"
              onIonChange={(e: any) => setCompanyUserName(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              name="companyUserEmail"
              type="email"
              value={companyUserEmail}
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
              value={companyUserOption}
            >
              {companyUserOptionsList.map((option: any, index: number) => (
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
    isShowModalCompanyUser: selectorsModal.showModalCompanyUser(state),
    isSavingCompanyUser: selectorsCollectionUser.isSavingCollectionUser(state),
  }),
  mapDispatchToProps: ({
    setModalCompanyUserShow,
    addCollectionUser,
  }),
  component: LsModalCompanyUser
});
