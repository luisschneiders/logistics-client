import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { AppPage } from '../../models/AppPage';
import { appTabs } from './AppTabs';
import { connect } from '../../data/connect';

import * as ROUTES from '../../constants/Routes';

import HomePage from '../../pages/home/Home';

import CompanyUserPage from '../../pages/user/CollectionUser';
import CompanyUserDetailsPage from '../../pages/user/CollectionUserDetails';

import TodoPage from '../../pages/todo/Todo';

import SetupPage from '../../pages/setup/Setup';

interface StateProps {
  isAuthenticated: boolean;
}

const LsMainTabs: React.FC<StateProps> = ({isAuthenticated}) => {
  const renderTabItems = (tabs: AppPage[]) => {
    return tabs
      .filter(route => !!route.url)
      .map((tab, index) => (
        <IonTabButton tab={`tab${index+1}`} key={index} href={tab.url}>
          <IonIcon icon={tab.icon} />
          <IonLabel>{tab.label}</IonLabel>
        </IonTabButton>
      ));
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect path={ROUTES.TABS} to={ROUTES.TABS_HOME} exact={true} />
        <Route path={ROUTES.TABS_HOME} render={() => <HomePage />} exact={true} />

        <Route path={ROUTES.TABS_SETUP} render={() => <SetupPage />} exact={true} />

        <Route path={ROUTES.TABS_COLLECTION_USER} render={() => <CompanyUserPage />} exact={true} />
        <Route path={`${ROUTES.TABS_COLLECTION_USER}/:id`} component={CompanyUserDetailsPage} exact={true} />

        <Route path={ROUTES.TABS_TODO} render={() => <TodoPage />} exact={true} />

        <Route path='/' render={() => <Redirect to={ROUTES.TABS_HOME} />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        {isAuthenticated ? renderTabItems(appTabs().authenticated) : renderTabItems(appTabs().unauthenticated)}
      </IonTabBar>
    </IonTabs>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    isAuthenticated: state.userReducer.isLoggedIn,
  }),
  component: LsMainTabs
});
