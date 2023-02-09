import { LogLevel } from '@ceramicnetwork/common';
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

export const SetupProfilePicture: React.FC = () => {
  const field = 'profileImageURL';
  const [image, setImage] = useState<any>({});
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

          // setImage({
          //   preview: URL.createObjectURL(imageFile),
          //   file: imageFile,
          // });
          // setter(imageFile);

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
          setImage({});
          setter('');
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
              accept="image/png, image/jpeg, image/gif"
              ref={(ref) => {
                ref?.focus();
                registerRef(ref);
                inputRef.current = ref;
              }}
              display="none"
            />
            <Button
              variant="outline"
              onClick={handleClick}
              mt={{ base: 2, md: 6 }}
            >
              upload
            </Button>
            <Flex height={{ base: '3rem', md: '4rem' }}>
              {current || image.preview ? (
                <Button
                  mt={{ base: 4, md: 8 }}
                  color="red"
                  variant="ghost"
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
