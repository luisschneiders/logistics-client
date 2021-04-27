import { CompanyType } from '../enum/CompanyType';

export interface CollectionCompany {
  companyId: string;
  companyName: string;
  companyAbnAcn: string;
  companySignup: boolean;
  companyType: CompanyType;
  companyCreatedBy: string;
  companyEmail: string;
  companyIsActive: boolean;
  createdAt: any;
  updatedAt: any;
}
