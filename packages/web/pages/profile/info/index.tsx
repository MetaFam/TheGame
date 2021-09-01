import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Stack,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

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

  function onSubmit(values: Record<string, unknown>) {
    console.log(values); // eslint-disable-line no-console
    return new Promise((resolve) => {
      setTimeout(() => {
        console.info(JSON.stringify(values, null, 2)); // eslint-disable-line no-console
        resolve(values);
      }, 3000);
    });
  }
  return (
    <PageContainer>
      Hello Meta Profile
      <Image ref={image} visibility="hidden" />
      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">First name</FormLabel>
          <Input
            name="name"
            placeholder="name"
            ref={register}
            {...register('name', {
              required: 'This is required',
              minLength: { value: 2, message: 'Minimum length should be 2' },
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
            placeholder="image"
            ref={register}
            {...register('image', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
              maxLength: {
                value: 150,
                message: 'Maximum length should be 150',
              },
            })}
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
            onChange={onFileChange}
            {...register('background', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
              maxLength: {
                value: 150,
                message: 'Maximum length should be 150',
              },
            })}
          />
          <FormErrorMessage>
            {errors.background && errors.background.message}
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
