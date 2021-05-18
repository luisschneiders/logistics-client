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

import { connect } from '../../data/connect';
import { AppPage } from '../../models/AppPage';
import * as ROUTES from '../../constants/Routes';
import { appTabs } from './AppTabs';

import CollectionClientListPage from '../../pages/client/CollectionClientList';
import CollectionClientViewPage from '../../pages/client/CollectionClientView';
import CollectionClientDetailsPage from '../../pages/client/CollectionClientDetails';

import CollectionDeliveryListPage from '../../pages/delivery/CollectionDeliveryList';

import CollectionUserListPage from '../../pages/user/CollectionUserList';
import CollectionUserDetailsPage from '../../pages/user/CollectionUserDetails';

import TodoPage from '../../pages/todo/Todo';
import SetupPage from '../../pages/setup/Setup';

interface StateProps {
  isAuthenticated: boolean;
}

const LsTabs: React.FC<StateProps> = ({isAuthenticated}) => {
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
        <Redirect path={ROUTES.TABS} to={ROUTES.TABS_COLLECTION_CLIENT_VIEW} exact={true} />
        <Route path={ROUTES.TABS_COLLECTION_CLIENT_VIEW} render={() => <CollectionClientViewPage />} exact={true} />

        <Route path={ROUTES.TABS_SETUP} render={() => <SetupPage />} exact={true} />

        <Route path={ROUTES.TABS_COLLECTION_CLIENT_LIST} render={() => <CollectionClientListPage />} exact={true} />
        <Route path={`${ROUTES.TABS_COLLECTION_CLIENT_LIST}/:id`} component={CollectionClientDetailsPage} exact={true} />

        <Route path={ROUTES.TABS_COLLECTION_DELIVERY} render={() => <CollectionDeliveryListPage />} exact={true} />
        {/* <Route path={`${ROUTES.TABS_COLLECTION_DELIVERY}/:id`} component={CollectionDeliveryDetailsPage} exact={true} /> */}

        <Route path={ROUTES.TABS_COLLECTION_USER} render={() => <CollectionUserListPage />} exact={true} />
        <Route path={`${ROUTES.TABS_COLLECTION_USER}/:id`} component={CollectionUserDetailsPage} exact={true} />

        <Route path={ROUTES.TABS_TODO} render={() => <TodoPage />} exact={true} />

        <Route path='/' render={() => <Redirect to={ROUTES.TABS} />} exact={true} />
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
  component: LsTabs
});
