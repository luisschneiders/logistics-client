import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const getIsLoggedInData = (state: AppState) => state.userReducer.isLoggedIn;
const getHasSeenWelcomeData = (state: AppState) => state.userReducer.hasSeenWelcome;

export const getUserPreference = (state: AppState) => state.userReducer;

export const getIsLoggedIn = createSelector(
  getIsLoggedInData,
  (isLoggedIn: boolean) => {
    return isLoggedIn;
  }
);

export const getHasSeenWelcome = createSelector(
  getHasSeenWelcomeData,
  (hasSeenWelcome: boolean) => {
    return hasSeenWelcome;
  }
);
