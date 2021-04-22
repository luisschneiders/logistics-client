import { CompanyProfile } from '../../models/CompanyProfile';
import { Period } from '../../models/Period';

export interface SessionsState {
  companyProfile: CompanyProfile;
  menuEnabled: boolean;
  homeTimeTransition: string;
  expensesTimeTransition: Period;
  transactionsTimeTransition: Period;
}
