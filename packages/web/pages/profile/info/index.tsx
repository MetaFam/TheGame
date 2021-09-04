import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Stack,
  Textarea,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CONFIG } from '../../../config'

import { useWeb3 } from '../../../lib/hooks';

const InfoPage: React.FunctionComponent = () => {
  const [did, setDid] = useState<string>();
  const image = useRef<HTMLImageElement>(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const { ceramic, idx, address } = useWeb3();

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.info(did); // eslint-disable-line no-console
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;
      const img = image.current as HTMLImageElement;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        console.log(reader.result); // eslint-disable-line no-console
        if (img !== null) {
          img.onload = async () => {
            console.log(img.width, img.height); // eslint-disable-line no-console
          };
          img.src = reader.result as string;
        }
      });
      reader.readAsDataURL(file);
    },
    [did],
  );

  useEffect(() => {
    // fetch from IDX
    (async () => {
      if (ceramic && address) {
        const caip10 = await Caip10Link.fromAccount(
          ceramic,
          `${address}@eip155:1`,
        );
        if (caip10.did) {
          setDid(caip10.did);
          const result = await idx?.get('basicProfile', caip10.did);
          Object.entries(result as Record<string, unknown>).forEach(
            ([key, object]) => {
              let value = object;
              if (['image', 'background'].includes(key)) {
                const {
                  original: { src: url },
                } = value as Record<string, Record<string, string>>;
                value = url;
              }
              if (key === 'birthDate') {
                value = new Date(value as string);
              }
              setValue(key, value);
            },
          );
        }
      }
    })();
  }, [ceramic, address, idx, setValue]);

  const onSubmit = async (values: Record<string, unknown>) => {
    console.log(values); // eslint-disable-line no-console
    const formData  = new FormData();
    const [image] = values.image as File[]
    const [background] = values.background as File[]
    if(image || background) {
      if(image) {
        formData.append('image', image);
      }
      if(background) {
        formData.append('background', background);
      }
      console.info('FORM', formData)
      const result = await fetch(
        `${CONFIG.actionsURL}/actions/storage`,
        {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          credentials: 'include',
        }
      )
    }
    // const response = await fetch(url, {
    //   method: 'POST',
    //   body: formData
    // });
  
    // const result = await fetch(
    //   ''
    // )
  }
  return (
    <PageContainer>
      <Image ref={image} visibility="hidden" />
      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            name="name"
            placeholder="name"
            ref={register}
            {...register('name', {
              maxLength: {
                value: 150,
                message: 'Maximum length should be 150',
              },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.image}>
          <FormLabel htmlFor="image">Profile Image</FormLabel>
          <Input
            name="image"
            type="file"
            placeholder="image"
            ref={register}
            {...register('image')}
          />
          <FormErrorMessage>
            {errors.image && errors.image.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.background}>
          <FormLabel htmlFor="background">Header Background</FormLabel>
          <Input
            name="background"
            type="file"
            placeholder="background"
            ref={register}
            {...register('background')}
          />
          <FormErrorMessage>
            {errors.background && errors.background.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            name="description"
            placeholder="description"
            ref={register}
            {...register('description')}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </PageContainer>
  );
};

export default InfoPage;
