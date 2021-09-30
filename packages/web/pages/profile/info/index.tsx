import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Textarea,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CONFIG } from '../../../config';
import { useWeb3 } from '../../../lib/hooks';

const InfoPage: React.FunctionComponent = () => {
  const [imageURL, setImageURL] = useState<string>();
  const [backgroundURL, setBackgroundURL] = useState<string>();
  const image = useRef<HTMLImageElement>(null);
  const background = useRef<HTMLImageElement>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const { ceramic, idx, address } = useWeb3();

  useEffect(() => {
    // fetch initial values from IDX
    (async () => {
      if (ceramic && address) {
        const caip10 = await Caip10Link.fromAccount(
          ceramic,
          `${address}@eip155:1`,
        );
        if (caip10.did) {
          const result = await idx?.get('basicProfile', caip10.did);
          Object.entries(result as Record<string, unknown>).forEach(
            ([key, object]) => {
              let value = object;
              if (['image', 'background'].includes(key)) {
                const {
                  original: { src: url },
                } = value as Record<string, Record<string, string>>;
                value = url;
                const match = url.match(/^ipfs:\/\/(.+)$/);
                if (match) {
                  const ipfsUrl = `//ipfs.io/ipfs/${match[1]}`;
                  value = ipfsUrl;
                }
                if (key === 'image') {
                  setImageURL(value as string);
                }
                if (key === 'background') {
                  setBackgroundURL(value as string);
                }
              } else {
                setValue(key, value);
              }
            },
          );
        }
        setInitialized(true);
      }
    })();
  }, [ceramic, address, idx, setValue]);

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;
      const img = image.current as HTMLImageElement;
      const bg = background.current as HTMLImageElement;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (input.name === 'image') {
          img.src = reader.result as string;
        }
        if (input.name === 'background') {
          bg.src = reader.result as string;
        }
      });
      reader.readAsDataURL(file);
    },
    [],
  );

  const onSubmit = async (inputs: Record<string, unknown>) => {
    const values = { ...inputs };
    const formData = new FormData();
    const [imageFile] = values.image as File[];
    const [backgroundFile] = values.background as File[];
    if (!imageFile && !backgroundFile) {
      delete values.image;
      delete values.background;
    } else {
      setStatus('Uploading files to web3.storage…');

      if (imageFile) {
        formData.append('image', imageFile);
      }
      if (backgroundFile) {
        formData.append('background', backgroundFile);
      }
      const result = await fetch(`${CONFIG.actionsURL}/actions/storage`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const cids = await result.json();
      const refs = { image: image.current, background: background.current } as {
        image: HTMLImageElement | null;
        background: HTMLImageElement | null;
      };
      ['image', 'background'].forEach((key) => {
        if (cids[key]) {
          values[key] = {
            original: {
              src: `ipfs://${cids[key]}`,
              mimeType: 'image/*',
              width: refs[key as 'image' | 'background']?.width,
              height: refs[key as 'image' | 'background']?.height,
            },
          };
        } else {
          delete values[key];
        }
      });
    }

    // empty string fails validation
    ['residenceCountry', 'birthDate'].forEach((key) => {
      if (values[key] === '') {
        delete values[key];
      }
    });

    if (values.residenceCountry) {
      values.residenceCountry = (values.residenceCountry as string).toUpperCase();
    }

    setStatus('Authenticating DID…');
    await ceramic?.did?.authenticate();

    setStatus('Writing to IDX…');
    await idx?.merge('basicProfile', values);

    setStatus(null);
  };

  if (!address) {
    return (
      <Stack align="center">
        <Heading fontSize={25} mt={10}>
          Connect your wallet to edit your profile.
        </Heading>
      </Stack>
    );
  }

  if (!initialized) {
    return (
      <Stack align="center">
        <Heading fontSize={25} mt={10}>
          Loading configuration from IDX…
        </Heading>
        <Spinner />
      </Stack>
    );
  }

  return (
    <PageContainer>
      <Stack
        as="form"
        onSubmit={async (evt) => {
          setStatus('Submitting…');
          await handleSubmit(onSubmit)(evt);
          setStatus(null);
        }}
      >
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Display Name</FormLabel>
          <Input
            name="name"
            placeholder="Free-form name up to 150 characters."
            ref={register}
            maxLength={150}
            {...register('name', {
              maxLength: {
                value: 150,
                message: 'Maximum length is 150 characters.',
              },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.image}>
          <FormLabel htmlFor="image">Profile Image</FormLabel>
          <Image ref={image} src={imageURL} maxH="6em" />
          <Input
            name="image"
            type="file"
            onChange={onFileChange}
            ref={register}
            {...register('image')}
          />
          <FormErrorMessage>
            {errors.image && errors.image.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.background}>
          <FormLabel htmlFor="background">Header Background</FormLabel>
          <Image ref={background} src={backgroundURL} maxH="6em" />
          <Input
            name="background"
            type="file"
            onChange={onFileChange}
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
            placeholder="Describe yourself."
            ref={register}
            maxLength={420}
            {...register('description', {
              maxLength: {
                value: 420,
                message: 'Maximum length is 420 characters.',
              },
            })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.emoji}>
          <FormLabel htmlFor="emoji">Emoji</FormLabel>
          <Input
            name="emoji"
            placeholder="Your emoji."
            ref={register}
            maxLength={2}
            {...register('emoji', {
              maxLength: {
                value: 2,
                message: 'Only a single emoji, please.',
              },
            })}
          />
          <FormErrorMessage>
            {errors.emoji && errors.emoji.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.birthDate}>
          <FormLabel htmlFor="birthDate">Birthdate</FormLabel>
          <Input
            name="birthDate"
            type="date"
            placeholder="Date of your birth."
            ref={register}
            {...register('birthDate')}
          />
          <FormErrorMessage>
            {errors.birthDate && errors.birthDate.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.url}>
          <FormLabel htmlFor="url">Website</FormLabel>
          <Input
            name="url"
            placeholder="Personal URL."
            ref={register}
            maxLength={240}
            {...register('url', {
              maxLength: {
                value: 240,
                message: 'Max length is 240 characters.',
              },
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.homeLocation}>
          <FormLabel htmlFor="homeLocation">Location</FormLabel>
          <Input
            name="homeLocation"
            placeholder="Free-form description of where you are."
            ref={register}
            maxLength={140}
            {...register('homeLocation', {
              maxLength: {
                value: 140,
                message: 'Max length is 140 characters.',
              },
            })}
          />
          <FormErrorMessage>
            {errors.homeLocation && errors.homeLocation.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.residenceCountry}>
          <FormLabel htmlFor="residenceCountry">Residence Country</FormLabel>
          <Input
            name="residenceCountry"
            placeholder="Two-letter country code."
            ref={register}
            maxLength={2}
            {...register('residenceCountry', {
              maxLength: {
                value: 2,
                message: 'Please use a two-character country code.',
              },
            })}
          />
          <FormErrorMessage>
            {errors.residenceCountry && errors.residenceCountry.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          disabled={status !== null}
          type="submit"
        >
          {status ?? 'Submit'}
          {status && <Spinner ml={5} />}
        </Button>
      </Stack>
    </PageContainer>
  );
};

export default InfoPage;
