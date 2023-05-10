import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Spinner,
  useToast,
} from '@metafam/ds';
import { Maybe, Optional } from '@metafam/utils';
import PlayerProfileIcon from 'assets/player-profile-icon.svg';
import { FileReaderData, useImageReader } from 'lib/hooks/useImageReader';
import { forwardRef, useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { optimizedImage } from 'utils/imageHelpers';

export type EditAvatarImageProps = {
  initialURL?: Maybe<string>;
  onFilePicked: ({ file, dataURL }: FileReaderData) => void;
};

export const EditAvatarImage = forwardRef<
  HTMLImageElement,
  EditAvatarImageProps
>(({ initialURL, onFilePicked }, ref) => {
  const toast = useToast();
  const readFile = useImageReader();

  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setURL] = useState<Optional<string>>(
    optimizedImage('profileImageURL', initialURL),
  );

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const onFileChange = useCallback(
    async ({ target: input }: { target: HTMLInputElement }) => {
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
        try {
          const dataURL = await readFile(file);
          setURL(dataURL);
          onFilePicked({ file, dataURL });
        } finally {
          setLoading(false);
        }
      }
    },
    [onFilePicked, readFile, toast],
  );

  return (
    <FormControl isInvalid={!!errors.profileImageURL}>
      {/* <Tooltip label="An image representing the user generally cropped to a circle for display. 1MiB maximum size.">
        <Label htmlFor="profileImageURL" userSelect="none">
          Profile Image
          <InfoIcon ml={2} />
        </Label>
      </Tooltip> */}
      <Center
        w="full"
        position="relative"
        border="2px solid"
        borderColor={active && !url ? 'blue.400' : 'transparent'}
      >
        <Box h="10em" w="10em" borderRadius="full" display="inline-flex">
          <Image
            id="profile-image-preview"
            ref={ref}
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
            // <Input
            //   {...props}
            //   colorScheme="blue"
            //   px={8}
            //   letterSpacing="0.1em"
            //   size="md"
            //   fontSize="sm"
            //   mt={{ base: 2, md: 6 }}
            //   color="white"
            //   rounded="md"
            //   _hover={{ bg: 'blue.600' }}
            //   _active={{ bg: 'blue.700' }}
            //   type="file"
            //   value={value?.filename ?? ''}
            //   onChange={async (evt: ChangeEvent<HTMLInputElement>) => {
            //     onChange(evt.target.files);
            //     onFileChange(evt);
            //   }}
            //   accept="image/*"
            //   onFocus={() => setActive(true)}
            //   onBlur={() => setActive(false)}
            // />
            <>
              <Button
                as="label"
                htmlFor="upload-image"
                colorScheme="blue"
                bg="blue.600"
                py={4}
                px={8}
                letterSpacing="0.1em"
                size="md"
                fontSize="sm"
                ml={3}
                color="white"
                rounded="md"
                _hover={{ bg: 'blue.700' }}
                _active={{ bg: 'blue.800' }}
                cursor="pointer"
              >
                Upload Image
                <Input
                  {...props}
                  id="upload-image"
                  type="file"
                  display="none"
                  onChange={async (evt) => {
                    onChange(evt.target.files);
                    onFileChange(evt);
                  }}
                  accept="image/*"
                />
              </Button>
              {/* <Text
                as="label"
                htmlFor="upload"
                colorScheme="blue"
                bg="blue.600"
                p={4}
                letterSpacing="0.1em"
                size="md"
                fontSize="sm"
                mt={{ base: 2, md: 6 }}
                color="white"
                rounded="md"
                _hover={{ bg: 'blue.700' }}
                _active={{ bg: 'blue.800' }}
                cursor="pointer"
              >
                {value?.filename ?? 'Upload Image'}
              </Text> */}
            </>
          )}
        />
      </Center>
      <FormErrorMessage>
        {errors.profileImageURL?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
});
