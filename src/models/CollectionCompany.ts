import { CompanyType } from '../enum/CompanyType';

export interface CollectionCompany {
  companyId: string;
  companyName: string;
  companyAbnAcn: string;
  companySignup: boolean;
  companyType: CompanyType;
  companyCreatedBy: string;
  companyEmail: string;
  createdAt: any;
  updatedAt: any;
}
