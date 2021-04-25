import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { AppColor } from '../../enum/AppColor';
import { ModalProvider } from './ModalProvider';
import LsMainModal from './MainModal';
import { toast } from '../toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { useModal } from '../../hooks/useModal';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsModal from '../../data/modal/modal.selectors';
import { setModalCompanyUserShow } from '../../data/modal/modal.actions';
import { addUserType } from '../../data/userType/userType.actions';
import { companyUserOptions } from '../../pages/user/CompanyUserOptions';
import { RoleType } from '../../enum/RoleType';

interface StateProps {
  isLoggedIn: boolean;
  isShowModalCompanyUser: boolean;
}

interface DispatchProps {
  setModalCompanyUserShow: typeof setModalCompanyUserShow;
  addUserType: typeof addUserType;
}

interface ModalUserTypeProps extends StateProps, DispatchProps {}

const LsModalCompanyUser: React.FC<ModalUserTypeProps> = ({
    isLoggedIn,
    isShowModalCompanyUser,
    setModalCompanyUserShow,
    addUserType,
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
    isShowModalCompanyUser,
    setModalCompanyUserShow,
    handleShow
  ])

  const companyUserForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (companyUserName.trim() === '') {
      return toast('User name is required!', StatusColor.WARNING);
    }

    if (companyUserEmail.trim() === '') {
      return toast('Email is required!', StatusColor.WARNING);
    }

    if (!companyUserOption) {
      return toast('Role is required!', StatusColor.WARNING);
    }
    // addUserType({
    //   userTypeDescription,
    //   userTypeRates,
    //   companyUserOptions: companyUserOption,
    //   // userTypeInsertedBy: userProfileServer.userId,
    //   userTypeIsActive: true,
    // });
    setCompanyUserName('');
    setCompanyUserEmail('');
    handleClose();
  }

  return (
    <ModalProvider>
      <LsMainModal
        id="modal-company-user"
        show={showModal}
        title="New company user"
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
              >
                Save
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
    isShowModalCompanyUser: selectorsModal.showModalCompanyUser(state),
  }),
  mapDispatchToProps: ({
    setModalCompanyUserShow,
    addUserType,
  }),
  component: LsModalCompanyUser
});
