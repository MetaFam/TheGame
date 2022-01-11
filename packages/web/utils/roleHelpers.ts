import { PlayerRole } from '../graphql/autogen/types';

export type RoleMap = {
  [category: string]: CategoryOption;
};

export type RoleOption = PlayerRole & {
  value: string;
  label: string;
};

export type CategoryOption = {
  label: string;
  options: Array<RoleOption>;
};

// export const parseRoles = (
//   roles: Array<PlayerRole>,
// ): Array<CategoryOption> => {
//   const rolesMap: RoleMap = {};
//   roles.forEach((role) => {
//     if (!(role.category in rolesMap)) {
//       rolesMap[role.category] = {
//         label: role.category,
//         options: [],
//       };
//     }
//     rolesMap[role.category].options?.push({
//       value: role.id,
//       label: role.name,
//       ...role,
//     });
//   });
//   return Object.values(rolesMap);
// };
