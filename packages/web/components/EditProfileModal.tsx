/* eslint-disable no-console */
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  ITimezoneOption,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SelectTimeZone,
  StatusedSubmitButton,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import {
  ComposeDBImageMetadata,
  getMimeType,
  HasuraImageFieldKey,
  hasuraImageFields,
  isHasuraImageField,
  profileMapping,
} from '@metafam/utils';
import {
  Maybe,
  Player,
  useInsertCacheInvalidationMutation,
} from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { PlayerProfile } from 'graphql/types';
import { useWeb3 } from 'lib/hooks';
import { useSaveToComposeDB } from 'lib/hooks/ceramic/useSaveToComposeDB';
import React, {
  createRef,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { errorHandler } from 'utils/errorHandler';
import { getImageDimensions } from 'utils/imageHelpers';
import { isEmpty } from 'utils/objectHelpers';
import { hasuraToComposeDBProfile } from 'utils/playerHelpers';
import { uploadFiles } from 'utils/uploadHelpers';

import { ConnectToProgress } from './ConnectToProgress';
import { EditAvatarImage } from './Player/Profile/EditAvatarImage';
import { EditBackgroundImage } from './Player/Profile/EditBackgroundImage';
import { EditDescription } from './Player/Profile/EditDescription';
import { Label } from './Player/Profile/Label';
import MeetWithWalletProfileEdition from './Player/Profile/MeetWithWalletProfileEdition';

type EditProfileFields = {
  profileImageURL?: Maybe<string>;
  backgroundImageURL?: Maybe<string>;
  description?: Maybe<string>;
  username?: Maybe<string>;
  name?: Maybe<string>;
  timeZone?: Maybe<string>;
  availableHours?: Maybe<number>;
  pronouns?: Maybe<string>;
  website?: Maybe<string>;
  location?: Maybe<string>;
  emoji?: Maybe<string>;
};

const getDefaultFormValues = (player: Player): EditProfileFields => {
  if (!player.profile) {
    return {} as EditProfileFields;
  }
  return Object.fromEntries(
    Object.entries(player.profile).filter(([key]) =>
      Object.keys(profileMapping).includes(key),
    ),
  );
};

export type EditProfileModalProps = {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
  onSave: (ceramicStreamID: string) => void;
};

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  player,
  isOpen,
  onClose,
  onSave,
}) => {
  const [status, setStatus] = useState<Maybe<ReactElement | string>>();

  const username = player.profile?.username;

  const { save } = useSaveToComposeDB();
  const [, invalidateCache] = useInsertCacheInvalidationMutation();

  const initialFormValues = useMemo(
    () => getDefaultFormValues(player),
    [player],
  );

  const formMethods = useForm({
    defaultValues: initialFormValues,
    mode: 'onTouched',
  });
  const {
    handleSubmit,
    register,
    watch,
    control,
    reset,
    formState: { errors, dirtyFields, isDirty },
  } = formMethods;
  const { chainId } = useWeb3();
  const toast = useToast();

  const [pickedFiles, setPickedFiles] = useState<
    Partial<Record<HasuraImageFieldKey, File>>
  >({});
  const [pickedFileDataURLs, setPickedFileDataURLs] = useState<
    Partial<Record<HasuraImageFieldKey, string>>
  >({});

  const resetData = useCallback(() => {
    reset(initialFormValues);
    setPickedFiles({});
    setPickedFileDataURLs({});
  }, [initialFormValues, reset]);

  useEffect(resetData, [resetData]);

  const MAX_NAME_LEN = 150; // characters

  const displayName = watch('name');
  const nameRemaining = useMemo(
    () => MAX_NAME_LEN - (displayName?.length ?? 0),
    [displayName],
  );

  const imageFieldRefs = Object.fromEntries(
    hasuraImageFields.map((key) => [key, createRef<HTMLImageElement>()]),
  );

  if (!save) {
    toast({
      title: 'Ceramic Connection Error',
      description: 'Unable to connect to the Ceramic API to save changes.',
      status: 'error',
      isClosable: true,
      duration: 8000,
    });
    onClose();
    return null;
  }

  const onSubmit = async (inputs: EditProfileFields) => {
    try {
      if (!isDirty) {
        setStatus('No changes detected. Skipping save…');
        setTimeout(() => onClose, 500);
        return null;
      }

      const formData = new FormData();

      const changedInputs = Object.fromEntries(
        Object.entries(inputs).filter(([key]) => !isHasuraImageField(key)),
      );

      const profile: PlayerProfile = { ...changedInputs };
      const profileImages = Object.fromEntries(
        hasuraImageFields.map((field) => [field, null]),
      ) as Record<HasuraImageFieldKey, Maybe<ComposeDBImageMetadata>>;

      const toType = (key: string) => {
        const match = key.match(/^(.+?)(Image)?(URL)$/i);
        const [name] = match?.slice(1) ?? ['unknown'];
        return name;
      };

      if (Object.keys(pickedFiles).length > 0) {
        setStatus('Uploading images to web3.storage…');

        // Upload all the files to /api/storage
        Object.entries(pickedFiles).forEach(([key, file]) => {
          formData.append(toType(key), file);
        });
        const response = await uploadFiles(formData);

        await Promise.all(
          Object.entries(pickedFileDataURLs).map(async ([key, val]) => {
            const tKey = toType(key);
            if (!response[tKey]) {
              toast({
                title: 'Error Saving Image',
                description: `Uploaded "${tKey}" & didn't get a response back.`,
                status: 'warning',
                isClosable: true,
                duration: 8000,
              });
            } else {
              setStatus('Calculating image metadata…');
              const mime = getMimeType(val);
              const file = pickedFiles[key as HasuraImageFieldKey];

              const imageMetadata = {
                url: `ipfs://${response[tKey]}`,
                mimeType: mime,
                size: file?.size,
              } as ComposeDBImageMetadata;

              const { width, height } = await getImageDimensions(val);
              if (width && height) {
                imageMetadata.width = width;
                imageMetadata.height = height;
              }

              profileImages[key as HasuraImageFieldKey] = imageMetadata;
            }
          }),
        );
      }

      setStatus('Saving to Ceramic…');

      const payload = hasuraToComposeDBProfile(profile, profileImages);
      const ceramicStreamID = await save(payload);

      if (player) {
        setStatus('Invalidating Cache…');
        await invalidateCache({ playerId: player.id });
      }

      // if they changed their username, the page will 404 on reload
      if (player && inputs.username !== username) {
        window.history.replaceState(
          null,
          `${inputs.name ?? inputs.username}’s MetaGame Profile`,
          `/player/${player.ethereumAddress}`,
        );
      }

      onSave(ceramicStreamID);
      return onClose();
    } catch (err) {
      toast({
        title: 'Ceramic Error',
        description: `Error saving profile: ${(err as Error).message}`,
        status: 'error',
        isClosable: true,
        duration: 15000,
      });
      errorHandler(err as Error);
      return null;
    } finally {
      setStatus(null);
    }
  };

  if (chainId !== '0x1') {
    return (
      <Modal {...{ isOpen, onClose }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wrong Chain</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ConnectToProgress header="" />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormProvider {...formMethods}>
            <Grid templateColumns={['1fr']} gap={6} p={[0, 8]}>
              <GridItem flex={1} alignItems="center" h="10em">
                <EditAvatarImage
                  ref={imageFieldRefs.profileImageURL}
                  initialURL={initialFormValues.profileImageURL}
                  onFilePicked={({ file, dataURL }) => {
                    setPickedFiles({ ...pickedFiles, profileImageURL: file });
                    setPickedFileDataURLs({
                      ...pickedFileDataURLs,
                      profileImageURL: dataURL,
                    });
                  }}
                />
              </GridItem>
              <GridItem flex={1} alignItems="center">
                <FormControl isInvalid={!!errors.name}>
                  <Label htmlFor="name" userSelect="none">
                    Display Name
                  </Label>
                  <FormHelperText pb={3} color="white">
                    Arbitrary letters, spaces, & punctuation.
                  </FormHelperText>
                  <Input
                    w="100%"
                    placeholder="e.g., Meta Player 10x!"
                    {...register('name', {
                      required: 'We have to identify you somehow! 😱',
                      maxLength: {
                        value: 150,
                        message: 'Maximum length is 150 characters.',
                      },
                    })}
                  />
                  <FormHelperText color="white">
                    {nameRemaining} characters left.
                  </FormHelperText>
                  <Box>
                    <FormErrorMessage>
                      {errors.name?.message?.toString()}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              </GridItem>
              <GridItem flex={1} alignItems="center">
                <FormControl isInvalid={!!errors.username}>
                  <Label htmlFor="username" userSelect="none">
                    Profile URL
                  </Label>
                  <FormHelperText pb={3} color="white">
                    Lowercase alpha, digits, dashes, & underscores only.
                  </FormHelperText>
                  <InputGroup w="100%">
                    <InputLeftElement
                      pointerEvents="none"
                      children="https://metagame.wtf/players/"
                      width="auto"
                      paddingLeft="1em"
                      color="whiteAlpha.700"
                    />
                    <Input
                      w="100%"
                      flex={1}
                      minW={20}
                      maxW="100%"
                      pl={250}
                      placeholder="e.g., meta_player-10x"
                      {...register('username', {
                        validate: async (value) => {
                          if (value && /0x[0-9a-z]{40}/i.test(value)) {
                            return `Name "${value}" has the same format as an Ethereum address.`;
                          }
                          if (
                            value &&
                            value !== username &&
                            (await getPlayer(value))
                          ) {
                            return `Name "${value}" is already in use.`;
                          }
                          return true;
                        },
                        pattern: {
                          value: /^[a-z0-9-_]+$/,
                          message:
                            'Only lowercase letters, digits, dashes, & underscores allowed.',
                        },
                        minLength: {
                          value: 3,
                          message: 'Must have at least three characters.',
                        },
                        maxLength: {
                          value: 150,
                          message: 'Maximum length is 150 characters.',
                        },
                      })}
                    />
                  </InputGroup>
                  <Box>
                    <FormErrorMessage>
                      {errors.username?.message?.toString()}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              </GridItem>
              <GridItem flex={1}>
                <EditDescription />
              </GridItem>
              <GridItem flex={1} alignItems="center">
                <FormControl isInvalid={!!errors.availableHours}>
                  <Label htmlFor="availableHours">Availability</Label>
                  <FormHelperText pb={3} color="white">
                    What is your weekly availability for any kind of freelance
                    work?
                  </FormHelperText>
                  <InputGroup w="5em">
                    <InputLeftElement>
                      <Text as="span" role="img" aria-label="clock">
                        🕛
                      </Text>
                    </InputLeftElement>
                    <Input
                      flex={1}
                      w="100%"
                      type="number"
                      placeholder="23"
                      pl={10}
                      minW={20}
                      maxW="100%"
                      borderTopEndRadius={0}
                      borderBottomEndRadius={0}
                      borderRight={0}
                      {...register('availableHours', {
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message:
                            'It’s not possible to be available for negative time!',
                        },
                        max: {
                          value: 24 * 7,
                          message: `There are only ${24 * 7} hours in a week!`,
                        },
                      })}
                    />
                    <InputRightAddon background="purpleBoxDark" color="white">
                      <Text as="sup">hr</Text> ⁄ <Text as="sub">week</Text>
                    </InputRightAddon>
                  </InputGroup>
                  <Box>
                    <FormErrorMessage>
                      {errors.availableHours?.message?.toString()}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              </GridItem>
              <GridItem flex={1} alignItems="center">
                <FormControl isInvalid={!!errors.timeZone}>
                  <Label htmlFor="name">Time Zone</Label>
                  <Controller
                    {...{ control }}
                    name="timeZone"
                    defaultValue={
                      Intl.DateTimeFormat().resolvedOptions().timeZone
                    }
                    render={({ field: { onChange, value, ref, ...props } }) => (
                      <SelectTimeZone
                        labelStyle="abbrev"
                        onChange={(tz: ITimezoneOption) => {
                          onChange(tz.value);
                        }}
                        value={value ?? undefined}
                        {...props}
                      />
                    )}
                  />
                  <Box>
                    <FormErrorMessage>
                      {errors.timeZone?.message?.toString()}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              </GridItem>
              {/* <GridItem flex={1} alignItems="center">
                <FormControl isInvalid={!!errors.pronouns}>
                  <Label htmlFor="pronouns">Pronouns</Label>
                  <Input
                    w="100%"
                    id="pronouns"
                    placeholder="He, she, it, they, them, etc."
                    {...register('pronouns', {
                      maxLength: {
                        value: 150,
                        message: 'Maximum length is 150 characters.',
                      },
                    })}
                  />
                  <Box minH="3em">
                    <FormErrorMessage>
                      {errors.pronouns?.message?.toString()}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              </GridItem> */}
              <GridItem flex={1} alignItems="center">
                <FormControl isInvalid={!!errors.website}>
                  <Label htmlFor="name">Website URL</Label>
                  <Input
                    w="100%"
                    id="website"
                    placeholder="https://github.com/jane-user"
                    {...register('website', {
                      pattern: {
                        value: /^(ipfs|https?):(\/\/)?.+$/i,
                        message: 'URL must be IPFS, HTTP or HTTPS.',
                      },
                      maxLength: {
                        value: 240,
                        message: 'Maximum length is 240 characters.',
                      },
                    })}
                  />
                  <Box>
                    <FormErrorMessage>
                      {errors.website?.message?.toString()}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              </GridItem>
              {/* <GridItem flex={1} alignItems="center">
                <FormControl isInvalid={!!errors.location}>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    w="100%"
                    placeholder="Laniakea Supercluster"
                    {...register('location', {
                      maxLength: {
                        value: 140,
                        message: 'Maximum length is 140 characters.',
                      },
                    })}
                  />
                  <Box minH="3em">
                    <FormErrorMessage>
                      {errors.location?.message?.toString()}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              </GridItem> */}
              {/* <GridItem flex={1} alignItems="center">
                <FormControl isInvalid={!!errors.emoji}>
                  <Label htmlFor="emoji">Spirit Emoji</Label>
                  <Input
                    id="emoji"
                    placeholder="🗽"
                    _placeholder={{ opacity: 0.75 }}
                    minW="inherit"
                    w="100%"
                    {...register('emoji', {
                      maxLength: {
                        value: 2,
                        message: 'Maximum length is 2 characters.',
                      },
                    })}
                  />
                  <Box minH="3em">
                    <FormErrorMessage>
                      {errors.emoji?.message?.toString()}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              </GridItem> */}
              <GridItem gridColumn={'1/-1'} alignItems="center">
                <FormControl>
                  <Label>Meeting Calendar</Label>
                  <MeetWithWalletProfileEdition {...{ player }} />
                </FormControl>
              </GridItem>
              <GridItem flex={1} alignItems="center" h="10em">
                <EditBackgroundImage
                  player={player}
                  ref={imageFieldRefs.profileBackgroundURL}
                  initialURL={initialFormValues.backgroundImageURL}
                  onFilePicked={({ file, dataURL }) => {
                    setPickedFiles({
                      ...pickedFiles,
                      backgroundImageURL: file,
                    });
                    setPickedFileDataURLs({
                      ...pickedFileDataURLs,
                      backgroundImageURL: dataURL,
                    });
                  }}
                />
              </GridItem>
            </Grid>
          </FormProvider>
        </ModalBody>
        <ModalFooter mt={6} flex={1} justifyContent="center">
          <Wrap justify="center" align="center" flex={1}>
            <WrapItem>
              <StatusedSubmitButton
                isDisabled={isEmpty(dirtyFields)}
                label="Save"
                {...{ status }}
              />
            </WrapItem>
            <WrapItem>
              <Button
                variant="ghost"
                onClick={() => {
                  onClose();
                  resetData();
                }}
                color="white"
                _hover={{ bg: '#FFFFFF11' }}
                _active={{ bg: '#FF000011' }}
                disabled={!!status}
              >
                Cancel
              </Button>
            </WrapItem>
          </Wrap>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
