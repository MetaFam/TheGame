import { LogLevel } from '@ceramicnetwork/common';
import { VStack, Button, Center, Image, Input, useToast } from '@metafam/ds';
import OctoAvatar from 'assets/graphics/octo-avatar.svg';
import React, { useState, useRef } from 'react';
import { ProfileWizardPane } from './ProfileWizardPane';
import { WizardPaneCallbackProps } from './WizardPane';
// import { Controller, useForm } from 'react-hook-form';
// import { optimizedImage } from 'utils/imageHelpers';

// const ERROR_MESSAGE = 'Has to be a .jpg, .png, or .gif file; under 1MB.';

export const SetupProfilePicture: React.FC = () => {
  const field = 'profileImageURL';
  const [image, setImage] = useState<any>({});
  const [imageURL, setImageURL] = useState<any>({});
  const [file, setFile] = useState<any>(null);
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <ProfileWizardPane
      {...{ field }}
      title="Profile Picture"
      prompt="Upload an image that will make you instantly recognizable."
    >
      {({ register, errored, setter, current }: WizardPaneCallbackProps) => {
        const { ref: registerRef, ...props } = register(field, {
          validate: {
            // lessThan10MB: (files: any) => files[0]?.size < 30000 || 'Max 30kb',
            // acceptedFormats: (files: any) =>
            //   ['image/jpeg', 'image/png', 'image/gif'].includes(
            //     files[0]?.type,
            //   ) || 'Only PNG, JPEG e GIF',
          },
        });
        console.log(
          'register props: ',
          JSON.stringify(props),
          `current: ${current}`,
        );

        const handleUpload = async (e: any) => {
          console.log('uploading image', e);
          const imageFile = e.target.files?.[0];
          if (!imageFile) return;

          setFile(imageFile);
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            setImageURL(reader.result as string);
          });
          reader.addEventListener('error', ({ target }) => {
            const { error } = target ?? {};
            toast({
              title: 'Image Loading Error',
              description: `Loading Images Error: “${error?.message}”`,
              status: 'error',
              isClosable: true,
              duration: 10000,
            });
          });

          // upload to IPFS
          setImage({
            preview: URL.createObjectURL(imageFile),
            raw: imageFile,
          });
          console.log('setImage triggered image', e);
          // create ref to the file
          // const file = e.target.files[0];
          setter(imageFile);
          // question: Do we need to upload to web3.storage here or
          // do we upload to web3.storage when next button is clicked?
          console.log('end of handleUpload');
        };
        const handleClick = () => {
          inputRef.current?.click();
          inputRef.current?.focus();
        };
        // console.log('image', image, registerRef);
        console.log('current: ', current);

        return (
          <VStack mt={5}>
            {/* <Avatar src="https://bit.ly/dan-abramov" size="2xl" /> */}
            <Center mb="6">
              <Image
                maxW="200px"
                borderRadius="full"
                src={imageURL && image.preview ? image.preview : OctoAvatar.src}
              />
            </Center>
            <Input
              type="file"
              // onClick={handleUpload}
              onChange={handleUpload}
              name="profileImageURL"
              // accept="image/png, image/jpeg, image/gif"
              ref={(ref) => {
                ref?.focus();
                registerRef(ref);
                inputRef.current = ref;
              }}
              style={{ opacity: '0' }}
            />
            <Button
              variant="outline"
              onClick={handleClick}
              mt={{ base: 2, md: 6 }}
            >
              upload
            </Button>
            {image && (
              <Button color="red" variant="ghost">
                Remove Image
              </Button>
            )}
          </VStack>
        );
      }}
    </ProfileWizardPane>
  );
};
