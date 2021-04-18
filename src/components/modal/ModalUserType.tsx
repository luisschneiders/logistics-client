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
import { setModalUserTypeShow } from '../../data/modal/modal.actions';
import { addUserType } from '../../data/userType/userType.actions';
import { userTypeOptions } from '../../pages/user/UserTypeOptions';

interface StateProps {
  isLoggedIn: boolean;
  isShowModalUserType: boolean;
}

interface DispatchProps {
  setModalUserTypeShow: typeof setModalUserTypeShow;
  addUserType: typeof addUserType;
}

interface ModalUserTypeProps extends StateProps, DispatchProps {}

const LsModalUserType: React.FC<ModalUserTypeProps> = ({
    isLoggedIn,
    isShowModalUserType,
    setModalUserTypeShow,
    addUserType,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [userTypeDescription, setUserTypeDescription] = useState<string>('');
  const [userTypeOptionsList, setUserTypeOptionsList] = useState<any[]>([]);
  const [userTypeRates, setUserTypeRates] = useState<number>();
  const [userTypeOption, setUserTypeOption] = useState<number>(1);

  const userActionsOptions = async () => {
    const actions = userTypeOptions();
    setUserTypeOptionsList(await actions);
  }


  useEffect(() => {
    if (isShowModalUserType) {
      handleShow();
      userActionsOptions();
      setModalUserTypeShow(false);
    }
  }, [
    isLoggedIn,
    isShowModalUserType,
    setModalUserTypeShow,
    handleShow
  ])

  const userTypeForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userTypeDescription) {
      return toast('Description is required!', StatusColor.WARNING);
    }
    if (!userTypeOptions) {
      return toast('Type is required!', StatusColor.WARNING);
    }
    addUserType({
      userTypeDescription,
      userTypeRates,
      userTypeOptions: userTypeOption,
      // userTypeInsertedBy: userProfileServer.userId,
      userTypeIsActive: true,
    });
    setUserTypeDescription('');
    setUserTypeRates(undefined);
    handleClose();
  }

  return (
    <ModalProvider>
      <LsMainModal
        id="modal-userType"
        show={showModal}
        title="New user"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
        <form noValidate onSubmit={userTypeForm}>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonInput
              name="userTypeDescription"
              type="text"
              value={userTypeDescription} spellCheck={false} autocapitalize="off"
              onIonChange={(e: any) => setUserTypeDescription(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Type</IonLabel>
            <IonSelect onIonChange={e => setUserTypeOption(e.detail.value)}>
              {userTypeOptionsList.map((option: any, index: number) => (
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
            <IonLabel position="stacked">Rates</IonLabel>
            <IonInput
              type="number"
              step="0.01"
              name="userTypeRates"
              value={userTypeRates}
              onIonChange={(e: any) => setUserTypeRates(e.detail.value!)}
              min="0"
            />
          </IonItem>
          <IonItem lines="none">
            <div slot="end" className="ion-padding-vertical">
              <IonButton
                type="submit"
                fill="outline"
                color={AppColor.SUCCESS}
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
    isShowModalUserType: selectorsModal.showModalUserType(state),
  }),
  mapDispatchToProps: ({
    setModalUserTypeShow,
    addUserType,
  }),
  component: LsModalUserType
});
