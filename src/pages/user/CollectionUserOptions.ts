import { RoleType } from '../../enum/RoleType';

export const collectionUserOptions = async () => {
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
