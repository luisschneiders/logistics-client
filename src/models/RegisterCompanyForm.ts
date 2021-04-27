import { CompanyType } from '../enum/CompanyType';
import { RoleType } from '../enum/RoleType';

export interface RegisterCompanyForm {
  email: string,
  password: string,
  userName: string,
  userRole: RoleType,
  userIsActive: boolean;
  companyName: string,
  companyAbnAcn: string,
  companySignup: boolean,
  companyType: CompanyType,
  companyIsActive: boolean
}
