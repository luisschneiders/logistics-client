import { RoleType } from '../../enum/RoleType';

export const companyUserOptions = async () => {
  return [
    {
      value: RoleType.ADMIN,
      description: RoleType.ADMIN,
      selected: false
    },
    {
      value: RoleType.USER,
      description: RoleType.USER,
      selected: false
    },
  ]
}
