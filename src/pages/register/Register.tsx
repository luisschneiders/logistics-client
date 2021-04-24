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
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonList,
  IonText
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
import { RegisterCompanyForm } from '../../models/RegisterCompanyForm';
import { CompanyType } from '../../enum/CompanyType';
import { RoleType } from '../../enum/RoleType';
import { CollectionCompany } from '../../models/CollectionCompany';
import { CompanyProfile } from '../../models/CompanyProfile';
import { setCompanyProfile } from '../../data/sessions/sessions.actions';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setPhotoURL: typeof setPhotoURL;
  setCompanyProfile: typeof setCompanyProfile;
}

interface RegisterProps extends OwnProps, DispatchProps { }

const RegisterPage: React.FC<RegisterProps> = ({
    setIsLoggedIn,
    setCompanyProfile,
    history,
    setPhotoURL: setPhotoURLAction,
  }) => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [companyTypeOptionsList, setCompanyTypeOptionsList] = useState<any[]>([]);
  const [companyTypeOption, setCompanyTypeOption] = useState<any>(CompanyType.ABN);
  const [companyAbnAcn, setCompanyAbnAcn] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');

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

    const isNumber = /^\d+$/.test(companyAbnAcn);

    if (name.trim() === '') {
      return toast('User Name are required!', StatusColor.WARNING);
    }

    if (password !== confirmPassword) {
      return toast('Passwords should match!', StatusColor.WARNING);
    }

    if (email.trim() === '' || password.trim() === '') {
      return toast('Email and password are required!', StatusColor.WARNING);
    }

    if (companyName.trim() === '') {
      return toast('Company Name are required!', StatusColor.WARNING);
    }

    if (!isNumber) {
      return toast('Only digits for ABN or ACN!', StatusColor.WARNING);
    }

    if (companyTypeOption === CompanyType.ABN) { // ABN verification
      if (companyAbnAcn.trim() === '') {
        return toast('ABN is required!', StatusColor.WARNING);
      }
      if (companyAbnAcn.length !== 11) {
        return toast('ABN is 11 digits long', StatusColor.WARNING);
      }
    } else if (companyTypeOption === CompanyType.ACN) { // ACN verification
      if (companyAbnAcn.trim() === '') {
        return toast('ACN is required!', StatusColor.WARNING);
      }
      if (companyAbnAcn.length !== 9) {
        return toast('ACN is 9 digits long', StatusColor.WARNING);
      }
    }

    setBusy(true);

    const registerForm: RegisterCompanyForm = {
      email: email,
      password: password,
      userName: name,
      userRole: RoleType.ADMIN,
      companyName: companyName,
      companyAbnAcn: companyAbnAcn,
      companySignup: true,
      companyType: companyTypeOption,
    }

    const response: any = await registerUser(registerForm);

    if (response && response.user.uid) {
      const companyProfile: CompanyProfile = {
        companyId: response.user.uid,
        companyName: companyName,
        companyAbnAcn: companyAbnAcn,
        companyType: companyTypeOption,
      }

      toast('Successfully registered!', StatusColor.DEFAULT);

      await setIsLoggedIn(true);
      await setPhotoURLAction(getAvatar(response.user?.email));
      await setCompanyProfile(companyProfile);

      history.push(ROUTES.TABS_HOME, {direction: 'none'});

      setBusy(false);

    } else {
      setBusy(false);
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
          <IonText><h3>User</h3></IonText>
          <IonList lines="full">
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>User Name</IonLabel>
              <IonInput name="name" type="text"
                        value={name}
                        spellCheck={false}
                        autocapitalize="off"
                        onIonChange={(e: any) => setName(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Email</IonLabel>
              <IonInput name="email" type="email"
                        value={email}
                        spellCheck={false}
                        autocapitalize="off"
                        onIonChange={(e: any) => setEmail(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Password</IonLabel>
              <IonInput name="password" type="password"
                        autocomplete="off"
                        value={password}
                        onIonChange={(e: any) => setPassword(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem className="ion-margin-bottom">
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Confirm Password</IonLabel>
              <IonInput name="password" type="password"
                        value={confirmPassword}
                        onIonChange={(e: any) => setConfirmPassword(e.detail.value!)} required>
              </IonInput>
            </IonItem>
          </IonList>
          <IonText><h3>Company</h3></IonText>
          <IonList lines="full">
            <IonItem>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Company Name</IonLabel>
              <IonInput name="companyName" type="text"
                        value={companyName}
                        spellCheck={false}
                        autocapitalize="off"
                        onIonChange={(e: any) => setCompanyName(e.detail.value!)} required>
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
                    value={option.description}
                  >
                    {option.description}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className="ion-margin-bottom">
              <IonLabel position="stacked" color={AppColor.PRIMARY}>{companyTypeOption} number</IonLabel>
              <IonInput name="abnAcn" type="text"
                        value={companyAbnAcn}
                        onIonChange={(e: any) => setCompanyAbnAcn(e.detail.value!)} required>
              </IonInput>
            </IonItem>
          </IonList>
          <IonRow className="ion-margin-top">
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
    setCompanyProfile,
  },
  component: RegisterPage
});
