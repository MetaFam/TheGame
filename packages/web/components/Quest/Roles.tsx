import { MetaTag, SelectSearch, Tooltip, Wrap, WrapItem } from '@metafam/ds';
import { PlayerRole } from 'graphql/autogen/types';
import React from 'react';
import { RoleOption } from 'utils/roleHelpers';

export type SetupRolesProps = {
  roleChoices: Array<PlayerRole>;
  placeHolder: string;
  roles: Array<RoleOption>;
  setRoles: React.Dispatch<React.SetStateAction<Array<RoleOption>>>;
  id?: string;
};

export const RolesSelect: React.FC<SetupRolesProps> = ({
  roleChoices,
  placeHolder,
  roles,
  setRoles,
  id,
}) => (
  <SelectSearch
    menuPlacement="top"
    isMulti
    value={roles}
    onChange={(value) => setRoles(value as Array<RoleOption>)}
    options={(roleChoices || []).map((roleChoice) => ({
      label: roleChoice.label,
      value: roleChoice.role,
    }))}
    closeMenuOnSelect={false}
    placeholder={placeHolder}
    id={`roles-select-container-${id || ''}`}
    inputId={`roles-select-input-${id || ''}`}
  />
);

interface RolesProps {
  roles: PlayerRole[];
}
export const RolesTags: React.FC<RolesProps> = ({ roles }) => (
  <Wrap>
    {roles.map(({ role, label, description }) => (
      <WrapItem key={role}>
        <Tooltip label={description}>
          <MetaTag
            size="md"
            fontWeight="normal"
            backgroundColor="purpleTag"
            borderRadius={4}
          >
            {label}
          </MetaTag>
        </Tooltip>
      </WrapItem>
    ))}
  </Wrap>
);
