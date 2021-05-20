import {
  logInOutline,
  logOutOutline,
  starOutline,
  cogOutline,
  readerOutline,
  businessOutline,
} from 'ionicons/icons';
import { AppPage } from '../models/AppPage';
import * as ROUTES from '../constants/Routes'

export function appPages() {
  const authenticated: AppPage[] = [
    { level: 'Menu', url: ROUTES.TABS_COLLECTION_CLIENT_VIEW, label: 'Client', icon: businessOutline },
    { level: 'Menu', url: ROUTES.TABS_COLLECTION_DELIVERY, label: 'Delivery', icon: readerOutline },
    { level: 'Settings', url: ROUTES.TABS_SETUP, label: 'Setup', icon: cogOutline },
    { level: '', url: ROUTES.LOGOUT, label: 'Logout', icon: logOutOutline }
  ];

  const unauthenticated: AppPage[] = [
    { level: 'Menu', url: ROUTES.LOGIN, label: 'Login', icon: logInOutline },
    { level: 'Menu', url: ROUTES.REGISTER, label: 'Register', icon: starOutline },
  ];

  const pages: any = Object.assign({}, {
    authenticated,
    unauthenticated,
  });

  return pages;
}
