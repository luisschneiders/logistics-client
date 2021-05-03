import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
} from 'react-router';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonSpinner
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

import { 
  getCurrentUser,
  logoutUser
} from './data/api/Firebase';
import { connect } from './data/connect';
import { AppContextProvider } from './app/AppContext';
import {
  setIsLoggedIn,
  setDisplayName,
  setPhotoURL,
  setHasSeenWelcome,
  getDarkMode,
} from './data/user/user.actions';

import LsMainTabs from './components/tabs/MainTabs';
import LsMenu from './components/menu/Menu';
import { toast } from './components/toast/Toast';
import HomeOrWelcome from './components/HomeOrWelcome';

import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import AccountPage from './pages/account/Account';
import WelcomePage from './pages/welcome/Welcome';

import { StatusColor } from './enum/StatusColor';
import { getAvatar } from './util/getAvatar';
import * as ROUTES  from './constants/Routes';
import { setResetAppStore } from './data/app/app.actions';
import { initialState } from './data/app/app.state';
import * as selectorsUser from './data/user/user.selectors';
import {
  getCompanyProfile,
  getCompanyUser,
  setCompanyProfile,
  setCompanyUser
} from './data/sessions/sessions.actions';
import { CompanyProfile } from './models/CompanyProfile';
import { CompanyType } from './enum/CompanyType';
import { CompanyUser } from './models/CompanyUser';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
  isLoggedIn: boolean;
}

interface DispatchProps {
  getDarkMode: typeof getDarkMode;
  getCompanyProfile: typeof getCompanyProfile;
  getCompanyUser: typeof getCompanyUser;
  setIsLoggedIn: typeof setIsLoggedIn;
  setDisplayName: typeof setDisplayName;
  setPhotoURL: typeof setPhotoURL;
  setResetAppStore: typeof setResetAppStore;
  setHasSeenWelcome: typeof setHasSeenWelcome;
  setCompanyProfile: typeof setCompanyProfile;
  setCompanyUser: typeof setCompanyUser;
}

interface IonicAppProps extends StateProps, DispatchProps {}

const IonicApp: React.FC<IonicAppProps> = ({
    darkMode,
    isLoggedIn,
    getCompanyProfile,
    getCompanyUser,
    getDarkMode,
    setIsLoggedIn,
    setHasSeenWelcome,
    setDisplayName,
    setPhotoURL,
    setResetAppStore,
    setCompanyProfile,
    setCompanyUser,
  }) => {

  const [busy, setBusy] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const companyProfile: CompanyProfile = {
    companyId: '',
    companyName: '',
    companyAbnAcn: '',
    companyType: CompanyType.ABN,
  }

  const companyUser: CompanyUser = {
    userId: '',
    userEmail: '',
    userName: '',
    userRole: '',
    userIsActive: false,
  }

  useEffect(() => {
    getDarkMode();
    getCurrentUser().then((user: any) => {
      if (user) {
        getCompanyProfile(user.uid);
        getCompanyUser(user.uid);
        setIsAuthenticated(true);
        setIsLoggedIn(true);
        setDisplayName(user.displayName);
        setPhotoURL(user.photoURL ? user.photoURL : getAvatar(user.email));
        setHasSeenWelcome(true);
      } else {
        setIsAuthenticated(false);
        setIsLoggedIn(false);
      }
      setBusy(false);
    });
  }, [
      getDarkMode,
      getCompanyProfile,
      getCompanyUser,
      setIsLoggedIn,
      setHasSeenWelcome,
      setDisplayName,
      setPhotoURL,
      setResetAppStore,
      setCompanyProfile,
      setCompanyUser,
    ]);

  return (
    <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
      { busy ? <div className="container-spinner"><IonSpinner></IonSpinner></div> :
              <IonReactRouter>
                <IonSplitPane contentId="main" className="app-split-pane">
                  <LsMenu />
                  <IonRouterOutlet id="main">
                    <Route path='/' component={HomeOrWelcome} exact={true} />

                    <Route path={ROUTES.LOGIN} component={LoginPage} exact={true} />
                    <Route path={ROUTES.REGISTER} component={RegisterPage} exact={true} />

                    <Route path={ROUTES.TABS}>
                      {isAuthenticated || isLoggedIn ? <LsMainTabs /> : <Redirect to={ROUTES.LOGIN} />}
                    </Route>

                    <Route path={ROUTES.ACCOUNT} render={() => {
                      if (isAuthenticated || isLoggedIn) {
                        return <Route path={ROUTES.ACCOUNT} component={AccountPage} exact={true} />
                      } else {
                        return <Redirect to={ROUTES.LOGIN} />
                      }
                    }} />
                    
                    <Route path={ROUTES.WELCOME} component={WelcomePage} exact={true} />
                    <Route path={ROUTES.LOGOUT} render={() => {
                      logoutUser().then(() => {
                        toast('Successfully logged out!', StatusColor.DEFAULT);
                        setIsLoggedIn(false);
                        setResetAppStore(initialState);
                        setCompanyProfile(companyProfile);
                        setCompanyUser(companyUser);
                      }, (error) => {
                        toast(error.message, StatusColor.ERROR, 4000);
                      });
                      return <Redirect to={ROUTES.LOGIN} />
                    }} />
                  </IonRouterOutlet>
                </IonSplitPane>
              </IonReactRouter>
      }
    </IonApp>
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.userReducer.darkMode,
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
  }),
  mapDispatchToProps: {
    getDarkMode,
    getCompanyProfile,
    getCompanyUser,
    setIsLoggedIn,
    setHasSeenWelcome,
    setDisplayName,
    setPhotoURL,
    setResetAppStore,
    setCompanyProfile,
    setCompanyUser,
  },
  component: IonicApp
});
