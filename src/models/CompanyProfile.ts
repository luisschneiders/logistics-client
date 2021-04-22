import { CompanyType } from '../enum/CompanyType';

export interface CompanyProfile {
  companyId: string;
  companyName: string;
  companyAbnAcn: string;
  companySignup: boolean;
  companyType: CompanyType;
  companyCreatedBy: string;
  companyEmail: string;
}
