import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLoading,
  IonList,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import {
  Link,
  RouteComponentProps
} from 'react-router-dom';
import { toast } from '../../components/toast/Toast';
import { registerUser } from '../../data/api/Firebase';
import { StatusColor } from '../../enum/StatusColor';
import {
  setIsLoggedIn,
  setPhotoURL,
} from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { getAvatar } from '../../util/getAvatar';
import * as ROUTES from '../../constants/Routes';
import { AppColor } from '../../enum/AppColor';
import { companyTypeOptions } from './CompanyTypeOptions';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setPhotoURL: typeof setPhotoURL;
}

interface RegisterProps extends OwnProps, DispatchProps { }

const RegisterPage: React.FC<RegisterProps> = ({
    setIsLoggedIn,
    history,
    setPhotoURL: setPhotoURLAction,
  }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyTypeOptionsList, setCompanyTypeOptionsList] = useState<any[]>([]);
  const [companyTypeOption, setCompanyTypeOption] = useState<number>(1);
  const [abnAcn, setAbnAcn] = useState<string>('');

  const companyActionsOptions = async () => {
    const actions = companyTypeOptions();
    setCompanyTypeOptionsList(await actions);
  }

  const [busy , setBusy] = useState(false);

  useEffect(() => {
    companyActionsOptions();
  }, [
    companyTypeOption,
  ])

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNumber = /^\d+$/.test(abnAcn);

    if (password !== confirmPassword) {
      return toast('Passwords should match!', StatusColor.WARNING);
    }

    if (email.trim() === '' || password.trim() === '') {
      return toast('Email and password are required!', StatusColor.WARNING);
    }

    if (!isNumber) {
      return toast('Only digits for ABN or ACN!', StatusColor.WARNING);
    }

    if (companyTypeOption === 1) { // ABN verification
      if (abnAcn.trim() === '') {
        return toast('ABN is required!', StatusColor.WARNING);
      }
      if (abnAcn.length !== 11) {
        return toast('ABN is 11 digits long', StatusColor.WARNING);
      }
    } else if (companyTypeOption === 2) { // ACN verification
      if (abnAcn.trim() === '') {
        return toast('ACN is required!', StatusColor.WARNING);
      }
      if (abnAcn.length !== 9) {
        return toast('ACN is 9 digits long', StatusColor.WARNING);
      }
    }

    setBusy(true);
    const response: any = await registerUser(email, password);
    setBusy(false);

    if (response) {
      // Go to dashboard...
      // const userProfile: any = await setUserCredentialsServer({email, password});

      // if (userProfile) {
        // await setUserProfileServer(userProfile);
        await setIsLoggedIn(true);
        await setPhotoURLAction(getAvatar(response?.user?.email));
        history.push(ROUTES.TABS_HOME, {direction: 'none'});
      // } else {
      //   logoutUser().then(() => {
      //     setIsLoggedIn(false);
      //   }, (error) => {
      //     toast(error.message, StatusColor.ERROR, 4000);
      //   });
      // }
    }
  }

  return (
    <IonPage id="register-page">
      <IonHeader class="ion-text-center">
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy}></IonLoading>
      <IonContent className="ion-padding">
        <div className="login-logo">
          <img src="assets/img/slide2.svg" alt="Logo"/>
        </div>
        <form noValidate onSubmit={register}>
          <IonList lines="full">
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Email</IonLabel>
              <IonInput name="email" type="email"
                        value={email} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setEmail(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Password</IonLabel>
              <IonInput name="password" type="password"
                        value={password}
                        onIonChange={(e: any) => setPassword(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Confirm Password</IonLabel>
              <IonInput name="password" type="password"
                        value={confirmPassword}
                        onIonChange={(e: any) => setConfirmPassword(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Company Type</IonLabel>
              <IonSelect
                onIonChange={e => setCompanyTypeOption(e.detail.value)}
                value={companyTypeOption}
              >
                {companyTypeOptionsList.map((option: any, index: number) => (
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
              <IonLabel position="stacked" color={AppColor.PRIMARY}>{companyTypeOptionsList[companyTypeOption-1]?.description} number</IonLabel>
              <IonInput name="abnAcn" type="text"
                        value={abnAcn}
                        onIonChange={(e: any) => setAbnAcn(e.detail.value!)} required>
              </IonInput>
            </IonItem>
          </IonList>

          <IonRow className="ion-padding-top">
            <IonCol>
              <IonButton type="submit" fill="outline" expand="block">Register</IonButton>
            </IonCol>
            <IonCol>
              <div >Already have an account? <Link to={ROUTES.LOGIN}>Login</Link></div>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setPhotoURL,
  },
  component: RegisterPage
});
