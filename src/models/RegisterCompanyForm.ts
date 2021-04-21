import { CompanyType } from '../enum/CompanyType';
import { RoleType } from '../enum/RoleType';

export interface RegisterCompanyForm {
  email: string,
  password: string,
  userName: string,
  userRole: RoleType,
  companyName: string,
  companyAbnAcn: string,
  companySignup: boolean,
  companyType: CompanyType,
}
