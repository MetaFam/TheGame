import {
  Button,
  Center,
  Image as ChakraImage,
  Input,
  VStack,
} from '@metafam/ds';
import {
  ComposeDBImageMetadata,
  composeDBProfileFieldAvatar,
} from '@metafam/utils';
import OctoAvatar from 'assets/graphics/octo-avatar.svg';
import { useGetOwnProfileFieldFromComposeDB } from 'lib/hooks/ceramic/useGetOwnProfileFromComposeDB';
import { usePlayerSetupSaveToComposeDB } from 'lib/hooks/ceramic/usePlayerSetupSaveToComposeDB';
import { FileReaderData, useImageReader } from 'lib/hooks/useImageReader';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { optimizedImage } from 'utils/imageHelpers';

import { useShowToastOnQueryError } from './SetupProfile';
import { WizardPane } from './WizardPane';

const field = composeDBProfileFieldAvatar;

export const SetupProfilePicture: React.FC = () => {
  const {
    fetching,
    error,
    result: existing,
  } = useGetOwnProfileFieldFromComposeDB<ComposeDBImageMetadata>(field);

  useShowToastOnQueryError(error);

  const formMethods = useForm<{
    [field]: ComposeDBImageMetadata | undefined;
  }>();
  const { setValue } = formMethods;

  useEffect(() => {
    setValue(field, existing);
  }, [existing, setValue]);

  const [pickedFile, setPickedFile] = useState<FileReaderData | undefined>();

  const dirty = pickedFile != null;

  const { onSubmit, status } = usePlayerSetupSaveToComposeDB({
    isChanged: dirty,
    pickedFile,
  });

  return (
    <FormProvider {...formMethods}>
      <WizardPane<ComposeDBImageMetadata>
        {...{ field, onSubmit, status, fetching }}
        title="Profile Picture"
        prompt="Upload an image that will make you instantly recognizable."
      >
        <SetupProfilePictureInput
          onFileChange={setPickedFile}
          existingURL={existing?.url}
        />
      </WizardPane>
    </FormProvider>
  );
};

const SetupProfilePictureInput: React.FC<{
  existingURL: string | undefined;
  onFileChange: (fileData: FileReaderData) => void;
}> = ({ existingURL, onFileChange }) => {
  const { register } = useFormContext();
  const readFile = useImageReader();

  const [preview, setPreview] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { ref: registerRef } = register(field, {});

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;

    const dataURL = await readFile(imageFile);
    onFileChange({ file: imageFile, dataURL });
    setPreview(dataURL);
  };
  const handleClick = () => {
    inputRef.current?.click();
    inputRef.current?.focus();
  };
  // const handleRemove = () => {
  //   setPreview(null);
  //   setValue(field, null);
  // };

  const existingImageURL = existingURL
    ? optimizedImage('profileImageURL', existingURL)
    : null;

  return (
    <VStack mt={5}>
      <Center mb="6">
        <ChakraImage
          height="200px"
          width="200px"
          objectFit="cover"
          borderRadius="full"
          src={preview || existingImageURL || OctoAvatar.src}
          onClick={handleClick}
          cursor="pointer"
        />
      </Center>
      <Input
        type="file"
        onChange={handleUpload}
        name="profileImageURL"
        accept="image/*"
        ref={(ref) => {
          ref?.focus();
          registerRef(ref);
          inputRef.current = ref;
        }}
        display="none"
      />
      <Button
        colorScheme="purple"
        px={8}
        letterSpacing="0.1em"
        size="md"
        fontSize="sm"
        bg="purple.400"
        color="white"
        mt={{ base: 2, md: 6 }}
        onClick={handleClick}
      >
        Upload Image
      </Button>
      {/* Commenting out for now since I'm not sure how to delete the whole avatar field 
          in ComposeDB
      <Flex height={{ base: '3rem', md: '4rem' }}>
        {currentURL || preview ? (
          <Button
            mt={{ base: 2 }}
            color="#EB5757"
            variant="ghost"
            size="md"
            fontSize="sm"
            onClick={handleRemove}
          >
            Remove Image
          </Button>
        ) : null}
      </Flex> */}
    </VStack>
  );
};
