import {
  BoxProps,
  Flex,
  FormControl,
  FormControlProps,
  FormLabel,
  IconButton,
  Image,
  SmallCloseIcon,
} from '@metafam/ds';
import { DropImageType } from 'lib/hooks/useDropFiles';
import { ImageProps } from 'next/image';
import React from 'react';

export const UploadImageForm = ({
  dropzoneProps,
  inputProps,
  onOpenImageInput,
  onResetImage,
  imageFile,
  label = 'Upload image',
  labelColor = 'white',
  formControlProps = {},
  imageProps = {},
}: DropImageType & {
  label?: string;
  labelColor?: string;
  formControlProps?: FormControlProps;
  imageProps?: Omit<ImageProps, 'src'> & BoxProps;
}) => (
  <FormControl {...formControlProps}>
    <FormLabel color={labelColor} htmlFor="imageInput">
      {label}
    </FormLabel>
    {imageFile ? (
      <Flex key={imageFile.name} pos="relative">
        {typeof window !== 'undefined' && (
          <Image
            {...imageProps}
            alt={`${label} imageFile`}
            src={window.URL.createObjectURL(imageFile)}
          />
        )}
        <IconButton
          pos="absolute"
          size="sm"
          top={2}
          left={2}
          borderRadius="full"
          onClick={onResetImage}
          icon={<SmallCloseIcon boxSize="1.5rem" />}
          aria-label={''}
          backdropFilter="blur(40px)"
          boxShadow="inset 0px 0px 0px 1px white"
        />
      </Flex>
    ) : (
      <Flex
        {...dropzoneProps}
        flexDir="column"
        borderWidth={1}
        borderStyle="dashed"
        borderRadius={20}
        p={10}
        onClick={onOpenImageInput}
      >
        <input {...inputProps} id="imageInput" color="white" />
        <Flex
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          height="100%"
        >{`Drag 'n' drop an image here`}</Flex>
      </Flex>
    )}
  </FormControl>
);
