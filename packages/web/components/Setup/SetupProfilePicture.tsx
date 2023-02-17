import {
  Button,
  Center,
  Flex,
  Image as ChakraImage,
  Input,
  VStack,
} from '@metafam/ds';
import OctoAvatar from 'assets/graphics/octo-avatar.svg';
import React, { useRef, useState } from 'react';

import { ProfileWizardPane } from './ProfileWizardPane';
import { WizardPaneCallbackProps } from './WizardPane';

type ImageData = {
  file: File;
  width: number;
  height: number;
};

export const SetupProfilePicture: React.FC = () => {
  const field = 'profileImageURL';
  const [, setImage] = useState<ImageData | null>();
  const [preview, setPreview] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <ProfileWizardPane
      {...{ field }}
      title="Profile Picture"
      prompt="Upload an image that will make you instantly recognizable."
    >
      {({ register, setter, current }: WizardPaneCallbackProps) => {
        const { ref: registerRef } = register(field, {});

        const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const imageFile = e.target.files?.[0];
          if (!imageFile) return;

          const img = new Image();
          img.src = URL.createObjectURL(imageFile);
          img.onload = () => {
            const imgData = {
              file: imageFile,
              width: img.width,
              height: img.height,
            };
            setImage(imgData);
            setPreview(URL.createObjectURL(imageFile));
            // need to pass the height and width to the setter in order to pass it to ceramic
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setter(imgData);
          };
        };
        const handleClick = () => {
          inputRef.current?.click();
          inputRef.current?.focus();
        };
        const handleRemove = () => {
          setImage(null);
          setter('');
          setPreview(null);
          setter(null);
        };

        return (
          <VStack mt={5}>
            <Center mb="6">
              <ChakraImage
                height="200px"
                width="200px"
                objectFit="cover"
                borderRadius="full"
                src={preview || current || OctoAvatar.src}
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
            <Flex height={{ base: '3rem', md: '4rem' }}>
              {current || preview ? (
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
            </Flex>
          </VStack>
        );
      }}
    </ProfileWizardPane>
  );
};
