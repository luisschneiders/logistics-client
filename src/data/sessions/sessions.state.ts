import { CompanyProfile } from '../../models/CompanyProfile';
import { CompanyUser } from '../../models/CompanyUser';
import { Period } from '../../models/Period';

export interface SessionsState {
  companyProfile: CompanyProfile;
  companyUser: CompanyUser;
  menuEnabled: boolean;
  homeTimeTransition: string;
  expensesTimeTransition: Period;
  transactionsTimeTransition: Period;
}
