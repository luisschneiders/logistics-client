import { CompanyType } from '../enum/CompanyType';

export interface RegisterCompanyForm {
  email: string,
  password: string,
  userName: string,
  userRole: string,
  userIsActive: boolean;
  companyName: string,
  companyAbnAcn: string,
  companySignup: boolean,
  companyType: CompanyType,
  companyIsActive: boolean
}
