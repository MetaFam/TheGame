# MyMeta - Custom Blocks

This shall serve as a minimal guide towards developing custom blocks and linking your MyMeta player profiles, guild profiles and/or personal dashboards with external applications or APIs.

## Pre-requesites

- The MyMeta frontend codebase ([`packages/web`](https://github.com/MetaFam/TheGame/blob/develop/packages/web)) uses NextJS, so a basic understanding of NextJS architecture is a must.
- Some important files that you must understand before proceeding to develop your own custom blocks:
  1. Dashboard Page - [`pages/dashboard.tsx`](https://github.com/MetaFam/TheGame/blob/develop/packages/web/pages/dashboard.tsx)
  2. Player Profile Page- [`pages/player/[username].tsx`](https://github.com/MetaFam/TheGame/blob/develop/packages/web/pages/player/[username.tsx])
  3. Guild Profile Page - [`pages/guild/[guildname]/index.tsx`](https://github.com/MetaFam/TheGame/blob/develop/packages/web/pages/guild/%5Bguildname%5D/index.tsx)
  4. Common EditableGridLayout Component - [`components/EditableGridLayout.tsx`](https://github.com/MetaFam/TheGame/blob/develop/packages/web/components/EditableGridLayout.tsx)
     - This component is the basis for building the layout of blocks.
     - One of the props for `EditableGridLayout`, is the `displayComponent` which renders the actual block. The different display components for different pages are given below.
  5. Dashboard Display Component - [`components/Dashboard/DashboardSection.tsx`](https://github.com/MetaFam/TheGame/blob/develop/packages/web/components/Dashboard/DashboardSection.tsx)
     - The `displayComponent` for `pages/dashboard.tsx`
  6. Player Profile Display Component - [`components/Player/PlayerSection.tsx`](https://github.com/MetaFam/TheGame/blob/develop/packages/web/components/Player/PlayerSection.tsx)
     - The `displayComponent` for `pages/player/[username].tsx`
  7. Guild Profile Display Component - [`components/Guild/GuildSection.tsx`](https://github.com/MetaFam/TheGame/blob/develop/packages/web/components/Guild/GuildSection.tsx)
     - The `displayComponent` for `pages/guild/[guildname]/index.tsx`
  8. AddBoxSection Component - [`components/Section/AddBoxSection.tsx`](https://github.com/MetaFam/TheGame/blob/develop/packages/web/components/Section/AddBoxSection.tsx)
     - Another key component in `EditableGridLayout`.
     - This renders the UI for the user to customize and create a new block on their `EditableGridLayout`.
  9. Box Types Utils - [`utils/boxTypes.ts`](https://github.com/MetaFam/TheGame/blob/develop/packages/web/utils/boxTypes.ts)
     - This file contains all the basic utilities methods and constants required for the functionality of custom blocks

## Steps

> We shall be creating a simple block with a custom title and content. Similar steps can be followed to create more complex custom blocks.

### Step 1: Create a new BoxType

- Add a new `BoxType` in `utils/boxTypes.ts`.

```
  CUSTOM_TEXT: 'custom-text'
```

- Refer to the commit [830bb74](https://github.com/MetaFam/TheGame/commit/830bb7423be0d1f9af7d871d50e41ec9d3695d37) for the code changes

### Step 2: Define the structure of metadata

- Each block can use a custom metadata with the type of `BoxMetadata`, and we must define the type for our custom block. For this usecase we shall assume that it requires two text parameters `title` and `content`.

### Step 3: Create the component for this boxType

- Now create a new component `CustomTextSection` with `title` and `content` as props.
- Refer to the commit [e00d05b](https://github.com/MetaFam/TheGame/commit/e00d05be92bbebbd24743143386d41a581384901) for the code changes

### Step 4: Create the metadata editor component

- Next, we can create a component `CustomTextSectionMetadata` which has two props `metadata` & `setMetadata` which shall be used in `AddBoxSection` for the user to create the metadata required for `CustomTextSection`.
- Refer to the commit [e00d05b](https://github.com/MetaFam/TheGame/commit/e00d05be92bbebbd24743143386d41a581384901) for the code changes

### Step 5: Add the render option in the display components

- Add an extra case in the switch statements in `DashboardSection`, `PlayerSection` and `GuildSection` components to handle the metadata and render the `CustomTextSection`

```
case BoxTypes.CUSTOM_TEXT: {
  const { title, content } = metadata ?? {};
  return title && content ? (
    <CustomTextSection {...{ title, content }} />
    ) : null;
  }
```

- In this case, our custom text can be added to all three pages, but if your custom box is relavant only to one of the pages then add it only to that particular display component.
- Refer to the commit [f1ba43d](https://github.com/MetaFam/TheGame/commit/f1ba43dd29195d4032a2c34cd668e2ba7c38d275) for the code changes

### Step 6: Add our boxType to the supported list of boxes

- Add `BoxTypes.CUSTOM_TEXT` to the list of `ALL_BOXES` to the `config.ts` of each page
  - `components/Player/Section/config.ts` for player profiles
  - `components/Guild/Section/config.ts` for guild profiles
  - `components/Dashboard/config.ts` for dashboard
- Refer to the commit [6307ef1](https://github.com/MetaFam/TheGame/commit/6307ef135805a73f0380c172ec3d276ef561f23f) for the code changes

### Step 7: Add our metadata editor component

- Add the `CustomTextSectionMetadata` editor component to the `AddBoxSection` component
- Refer to the commit [bb9e74a](https://github.com/MetaFam/TheGame/commit/bb9e74afc78e0f29078a10635d53632a6cccc47f) for the code changes

### Step 7: Add specific config/helpers for this boxType

- Add a default box height in `utils/layoutHelpers.ts` under `DEFAULT_BOX_HEIGHTS`.
- In this case, the custom text box can be added multiple times with different metadata, therefore we shall add it the list of `MULTIPLE_ALLOWED_BOXES` as well.
- If needed we may need to edit `isResizableBox` if this block is resizable, although we leave it untouched for our usecase. See `components/Dashboard/Calendar.tsx` for an example of a resizable block.
- Refer to the commit [594d22b](https://github.com/MetaFam/TheGame/commit/594d22baf7a9fc3a6d2415e5d74040db7bc5b89e) for the code changes

## Conclusion

- Hurray! We have successfully added a basic custom block to MyMeta.
- Next step is to create a PR with our `develop` branch.
- Please follow our [`CONTRIBUTING_GUIDE`](https://github.com/MetaFam/TheGame/blob/develop/guides/CONTRIBUTING.md) for complete instructions on contributing to MyMeta.

## Help & Support

- For any queries, please join our discord and go to the `#builders` channel for help!
