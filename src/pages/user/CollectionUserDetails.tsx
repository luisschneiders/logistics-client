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
  IonSelect,
  IonSelectOption,
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
import * as selectorsCollectionUser from '../../data/collectionUser/collectionUser.selectors';
import { StatusColor } from '../../enum/StatusColor';
import { toast } from '../../components/toast/Toast';
import { CollectionUser } from '../../models/CollectionUser';
import { collectionUserOptions } from './CollectionUserOptions';
import { CompanyProfile } from '../../models/CompanyProfile';
import { AppColor } from '../../enum/AppColor';
import {
  setCollectionUserById,
  updateCollectionUser
} from '../../data/collectionUser/collectionUser.actions';
import { setCompanyUser } from '../../data/sessions/sessions.actions';

interface OwnProps extends RouteComponentProps<{
  id: string;
}>{}

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
  isFetching: boolean;
  collectionUser: CollectionUser | undefined;
  collectionUserById: CollectionUser;
  isUpdatingCollectionUser: boolean;
};

interface DispatchProps {
  setCollectionUserById: typeof setCollectionUserById;
  updateCollectionUser: typeof updateCollectionUser;
  setCompanyUser: typeof setCompanyUser;
};

interface ContainerProps extends OwnProps, StateProps, DispatchProps {};

const CollectionUserDetailsPage: React.FC<ContainerProps> = ({
    isLoggedIn,
    companyProfile,
    isFetching,
    match,
    collectionUser,
    collectionUserById,
    isUpdatingCollectionUser,
    setCollectionUserById,
    updateCollectionUser,
    setCompanyUser,
  }) => {

    const [collectionUserName, setCollectionUserName] = useState<string>('');
    const [collectionUserEmail, setCollectionUserEmail] = useState<string>('');
    const [collectionUserOptionsList, setCollectionUserOptionsList] = useState<any[]>([]);
    const [collectionUserOption, setCollectionUserOption] = useState<string>();

    const [isById, setIsById] = useState<boolean>(false);

    const collectionUserActionsOptions = async () => {
      const actions = collectionUserOptions();
      setCollectionUserOptionsList(await actions);
    }

    useEffect(() => {
      if (isLoggedIn && companyProfile) {
        collectionUserActionsOptions();
        // If user refresh the page, fetch the User by id only once
        if (!collectionUser && !isById) {
          setCollectionUserById(match.params.id);
          setIsById(true);
        }
      }

      if (collectionUser) {
        setCollectionUserName(collectionUser.userName);
        setCollectionUserEmail(collectionUser.userEmail);
        setCollectionUserOption(collectionUser.userRole);
      } else if (collectionUserById) {
        setCollectionUserName(collectionUserById.userName);
        setCollectionUserEmail(collectionUserById.userEmail);
        setCollectionUserOption(collectionUserById.userRole);
      }

    }, [
      isLoggedIn,
      companyProfile,
      isFetching,
      collectionUser,
      match,
      collectionUserById,
      isUpdatingCollectionUser,
      setCollectionUserById,
      isById,
    ]);

    const formCollectionUser = async (e: React.FormEvent) => {
      e.preventDefault();

      if (collectionUserName.trim() === '') {
        return toast('User name is required!', StatusColor.WARNING);
      }
      if (collectionUserOption === undefined) {
        return toast('Role is required!', StatusColor.WARNING);
      }

      const newCollectionUser: CollectionUser = collectionUser || collectionUserById;

      newCollectionUser.userName = collectionUserName;
      newCollectionUser.userRole = collectionUserOption;

      updateCollectionUser(newCollectionUser);
      setCompanyUser(newCollectionUser);
    }

  return (
    <IonPage id="collection-user-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.TABS_COLLECTION_USER}></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">
            Update <span className="ion-text-underline"> {collectionUserName}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching || isUpdatingCollectionUser}></IonLoading>
      <IonContent>
        <form noValidate onSubmit={formCollectionUser}>
          <IonList>
            <IonItem lines="full" disabled={!collectionUser && !collectionUserById}>
              <IonLabel position="stacked">User name</IonLabel>
              <IonInput name="collectionUserName"
                        type="text"
                        value={collectionUserName}
                        spellCheck={false}
                        autocapitalize="off"
                        onIonChange={(e: any) => setCollectionUserName(e.detail.value!)} required
              >
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Role</IonLabel>
              <IonSelect
                onIonChange={e => setCollectionUserOption(e.detail.value)}
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
            <IonItem lines="full">
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput name="collectionUserEmail"
                        type="email"
                        value={collectionUserEmail}
                        spellCheck={false}
                        autocapitalize="off"
                        disabled
              >
              </IonInput>
            </IonItem>
            <IonItem lines="none">
              <div slot="end">
                <IonButton
                  type="submit"
                  shape="round"
                  color={AppColor.PRIMARY}
                  disabled={!collectionUser && !collectionUserById}
                >
                  {isUpdatingCollectionUser ? 'Updating...' : 'Update'}
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
    isFetching: selectorsCollectionUser.isFetchingCollectionUserList(state),
    collectionUser: selectorsCollectionUser.getCollectionUserFromList(state, OwnProps),
    collectionUserById: selectorsCollectionUser.getCollectionUser(state),
    isUpdatingCollectionUser: selectorsCollectionUser.isUpdatingCollectionUser(state),
  }),
  mapDispatchToProps: ({
    setCollectionUserById,
    updateCollectionUser,
    setCompanyUser,
  }),
  component: withRouter(CollectionUserDetailsPage)
});
