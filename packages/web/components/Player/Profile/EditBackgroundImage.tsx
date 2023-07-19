import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  useToast,
} from '@metafam/ds';
import { Maybe, Optional } from '@metafam/utils';
import { Player } from 'graphql/autogen/types';
import { FileReaderData, useImageReader } from 'lib/hooks/useImageReader';
import {
  ChangeEvent,
  DragEvent,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { optimizedImage } from 'utils/imageHelpers';

import { Label } from './Label';

export type EditBackgroundImageProps = {
  player: Player;
  initialURL?: Maybe<string>;
  onFilePicked: ({ file, dataURL }: FileReaderData) => void;
};

export const EditBackgroundImage = forwardRef<
  HTMLImageElement,
  EditBackgroundImageProps
>(({ player, initialURL, onFilePicked }, ref) => {
  const toast = useToast();
  const readFile = useImageReader();

  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setURL] = useState<Optional<string>>(
    optimizedImage('backgroundImageURL', initialURL),
  );

  const metagamer = useMemo(
    () =>
      !!player?.guilds.some(
        ({ Guild: { guildname } }) => guildname === 'metafam',
      ),
    [player],
  );

  const tooltipLabel =
    // eslint-disable-next-line prefer-template
    'An image with an ~1:1 aspect ratio to be the page background. 1MiB maximum size.' +
    (metagamer ? '' : '\nOnly available to MetaGame players and patrons.');

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const onFileChange = useCallback(
    async (file: File) => {
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

  // const onFileRemove = useCallback(() => {
  //   setURL(undefined);
  //   setLoading(true);
  //   setActive(false);
  // }, []);

  return (
    <FormControl isInvalid={!!errors.backgroundImageURL} h="full">
      <Label htmlFor="backgroundImageURL" userSelect="none" whiteSpace="nowrap">
        Background Photo
      </Label>
      <Center
        position="relative"
        w="full"
        h="full"
        border="2px solid"
        borderColor={active ? 'blue.400' : 'transparent'}
      >
        <Image
          ref={ref}
          onLoad={() => {
            setLoading(false);
          }}
          onError={() => {
            setLoading(false);
          }}
          display={loading ? 'none' : 'inherit'}
          src={url}
          h="full"
          w="full"
        />
        {/* {loading &&
          (url == null ? (
            <Image w="5em" mx="2.5em" src={FileOpenIcon.src} opacity={0.5} />
          ) : (
            <Spinner size="xl" color="purple.500" thickness="4px" />
          ))} */}
        <Controller
          control={control}
          name="backgroundImageURL"
          defaultValue={[]}
          render={({ field: { onChange, value, ...props } }) => (
            <>
              <Box
                as="label"
                h="full"
                w="full"
                ml={[0, 3]}
                htmlFor="upload-bg-image"
                border="1px"
                color="white"
                borderColor="blue.600"
                borderRadius="4px"
                display="flex"
                flexDirection={['column', 'row']}
                alignItems="center"
                justifyContent="center"
              >
                <Input
                  id="upload-bg-image"
                  h="full"
                  w="full"
                  position="absolute"
                  type="file"
                  opacity={0}
                  {...props}
                  value={value?.filename}
                  onChange={async (evt: ChangeEvent<HTMLInputElement>) => {
                    evt.preventDefault();
                    const file = evt.target.files?.[0];
                    if (file) {
                      onChange(file);
                      onFileChange(file);
                    }
                  }}
                  onDragOver={async (evt: DragEvent<HTMLInputElement>) => {
                    evt.preventDefault();
                  }}
                  onDrop={async (evt: DragEvent<HTMLInputElement>) => {
                    evt.preventDefault();
                    const file = evt.dataTransfer.files?.[0];
                    if (file) {
                      onChange(file);
                      onFileChange(file);
                    }
                  }}
                  accept="image/*"
                />
                Drag and drop an image or
                <Button
                  as="label"
                  htmlFor="upload-bg-image"
                  colorScheme="blue"
                  variant="outline"
                  borderColor="blue.600"
                  py={4}
                  px={8}
                  letterSpacing="0.1em"
                  size="md"
                  fontSize="sm"
                  ml={3}
                  mt={[3, 0]}
                  color="white"
                  rounded="md"
                  _hover={{ borderColor: 'blue.700' }}
                  _active={{ borderColor: 'blue.800' }}
                  cursor="pointer"
                >
                  Upload Image
                </Button>
              </Box>
              {/* 
              Disabled until we figure out a good way to clear
              {url && !loading && (
                <IconButton
                  zIndex="10"
                  position="absolute"
                  top={2}
                  right={2}
                  bg="purple.400"
                  borderRadius="50%"
                  aria-label={`remove backgroundImageURL`}
                  size="xs"
                  _hover={{ bg: 'purple.500' }}
                  icon={<CloseIcon boxSize="0.5rem" />}
                  onClick={() => {
                    onChange(null);
                    onFileRemove();
                  }}
                  onFocus={() => setActive(true)}
                  onBlur={() => setActive(false)}
                />
              )} */}
            </>
          )}
        />
      </Center>
      <FormErrorMessage>
        {errors.backgroundImageURL?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
});
