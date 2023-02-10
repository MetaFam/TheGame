import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  Image,
  InfoIcon,
  Input,
  Spinner,
  Tooltip,
  useToast,
} from '@metafam/ds';
import { Maybe, Optional } from '@metafam/utils';
import PlayerProfileIcon from 'assets/player-profile-icon.svg';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { optimizedImage } from 'utils/imageHelpers';

import { Label } from './Label';

export type EditAvatarImageProps = {
  initialURL?: Maybe<string>;
  onFilePicked: (file: File) => void;
};

export const EditAvatarImage: React.FC<EditAvatarImageProps> = ({
  initialURL,
  onFilePicked,
}) => {
  const toast = useToast();

  const [active, setActive] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [url, setURL] = useState<Optional<string>>(
    optimizedImage('profileImageURL', initialURL),
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useRef<HTMLImageElement>(null);

  const {
    control,

    formState: { errors },
  } = useFormContext();

  const onFileChange = useCallback(
    ({ target: input }: { target: HTMLInputElement }) => {
      const file = input.files?.[0];
      if (!file) return;
      if (file.size === 0) {
        toast({
          title: 'Empty Image Error',
          description:
            'The selected image has a size of 0. Is it a symbolic link?',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      } else {
        setLoading(true);
        onFilePicked(file);
        const reader = new FileReader();
        reader.addEventListener(
          'load',
          () => {
            setURL(reader.result as string);
          },
          { once: true },
        );
        reader.addEventListener(
          'error',
          ({ target }) => {
            const { error } = target ?? {};
            toast({
              title: 'Image Loading Error',
              description: `Loading Images Error: “${error?.message}”`,
              status: 'error',
              isClosable: true,
              duration: 10000,
            });
            setLoading(false);
          },
          { once: true },
        );
        reader.readAsDataURL(file);
      }
    },
    [onFilePicked, toast],
  );

  return (
    <FormControl isInvalid={!!errors.profileImageURL}>
      <Tooltip label="An image representing the user generally cropped to a circle for display. 1MiB maximum size.">
        <Label htmlFor="profileImageURL" userSelect="none">
          Profile Image
          <InfoIcon ml={2} />
        </Label>
      </Tooltip>
      <Center
        w="full"
        position="relative"
        border="2px solid"
        borderColor={active && !url ? 'blue.400' : 'transparent'}
      >
        <Box h="10em" w="10em" borderRadius="full" display="inline-flex">
          <Image
            id="profile-image-preview"
            ref={ref ?? null}
            onLoad={() => {
              setLoading(false);
            }}
            display={loading ? 'none' : 'inherit'}
            src={url}
            borderRadius="full"
            objectFit="cover"
            h="full"
            w="full"
            border="2px solid"
            borderColor={active && url ? 'blue.400' : 'transparent'}
          />
          <Center>
            {loading &&
              (url == null ? (
                <Image maxW="50%" src={PlayerProfileIcon.src} opacity={0.5} />
              ) : (
                <Spinner size="xl" color="purple.500" thickness="4px" />
              ))}
          </Center>
        </Box>
        <Controller
          {...{ control }}
          name="profileImageURL"
          defaultValue={[]}
          render={({ field: { onChange, value, ...props } }) => (
            <Input
              {...props}
              type="file"
              value={value?.filename ?? ''}
              onChange={async (evt: ChangeEvent<HTMLInputElement>) => {
                onChange(evt.target.files);
                onFileChange(evt);
              }}
              minW="100% !important"
              minH="100%"
              accept="image/*"
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              opacity={0}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
            />
          )}
        />
      </Center>
      <FormErrorMessage>
        {errors.profileImageURL?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};
