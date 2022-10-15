export type RoleMap = {
  [category: string]: CategoryOption;
};

export type RoleOption = {
  value: string;
  label: string;
};

export type CategoryOption = {
  label: string;
  options: Array<RoleOption>;
};
