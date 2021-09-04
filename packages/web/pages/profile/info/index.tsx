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
  const [imageURL, setImageURL] = useState<string>();
  const [backgroundURL, setBackgroundURL] = useState<string>();
  const image = useRef<HTMLImageElement>(null);
  const background = useRef<HTMLImageElement>(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const { ceramic, idx, address } = useWeb3();

  console.log({did})

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;
      const img = image.current as HTMLImageElement;
      const bg = background.current  as HTMLImageElement;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        console.log(reader.result); // eslint-disable-line no-console
        if (input.name === "image") {
          img.src = reader.result as string;
        }
        if (input.name === "background") {
          bg.src = reader.result as string;
        }
      });
      reader.readAsDataURL(file);
    },
    [],
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
                const match = url.match(/^ipfs:\/\/(.+)$/)
                if(match){
                  const ipfsUrl = `//ipfs.io/ipfs/${match[1]}`
                  value = ipfsUrl
                }
                if(key === 'image') {
                  setImageURL(value as string)
                }
                if(key === 'background') {
                  setBackgroundURL(value as string)
                }
              } else {
                setValue(key, value);
              }
            },
          );
        }
      }
    })();
  }, [ceramic, address, idx, setValue]);

  const onSubmit = async (values: Record<string, unknown>) => {
    console.log(values); // eslint-disable-line no-console
    const formData  = new FormData();
    const [imageFile] = values.image as File[]
    const [backgroundFile] = values.background as File[]
    if(image || background) {
      if(image) {
        formData.append('image', imageFile);
      }
      if(background) {
        formData.append('background', backgroundFile);
      }
      const result = await fetch(
        `${CONFIG.actionsURL}/actions/storage`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        }
      )
      const cids = await result.json()
      const refs = { image: image.current, background: background.current } as { image: HTMLImageElement | null, background: HTMLImageElement  | null }
      ['image', 'background'].forEach((key) => {
        if(cids[key]){
          values[key] = {
            original: {
              src: `ipfs://${cids[key]}`,
              mimeType: 'image/*',
              width: refs[key as 'image' | 'background']?.width,
              height: refs[key as 'image' | 'background']?.height
            }
          }
        } else {
          delete values[key]
        }
      })
      ceramic?.did && await ceramic.did.authenticate();
      await idx?.merge('basicProfile', values)
    }
  }
  return (
    <PageContainer>
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
          <Image ref={image} src={imageURL} />
          <Input
            name="image"
            type="file"
            defaultValue=""
            onChange={onFileChange}
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
          <Image ref={background} src={backgroundURL} />
          <Input
            name="background"
            type="file"
            defaultValue=""
            onChange={onFileChange}
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
            {...register('description',  {
              maxLength: {
                value: 420,
                message: 'Maximum length should be 420',
              },
            })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.emoji}>
          <FormLabel htmlFor="description">Emoji</FormLabel>
          <Input
            name="emoji"
            placeholder="emoji"
            ref={register}
            {...register('emoji', {
              maxLength: 2
            })}
          />
          <FormErrorMessage>
            {errors.emoji && errors.emoji.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.birthDate}>
          <FormLabel htmlFor="description">Birthdate</FormLabel>
          <Input
            name="birthDate"
            type="date"
            placeholder="birthDate"
            ref={register}
            {...register('birthDate')}
          />
          <FormErrorMessage>
            {errors.birthDate && errors.birthDate.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.url}>
          <FormLabel htmlFor="description">Website</FormLabel>
          <Input
            name="url"
            placeholder="url"
            ref={register}
            {...register('url', {
              maxLength: 240
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.homeLocation}>
          <FormLabel htmlFor="description">Location</FormLabel>
          <Input
            name="homeLocation"
            placeholder="homeLocation"
            ref={register}
            {...register('homeLocation', {
              maxLength: 140
            })}
          />
          <FormErrorMessage>
            {errors.homeLocation && errors.homeLocation.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.residenceCountry}>
          <FormLabel htmlFor="description">Country Code</FormLabel>
          <Input
            name="residenceCountry"
            placeholder="residenceCountry"
            ref={register}
            {...register('residenceCountry', {
              maxLength: 2
            })}
          />
          <FormErrorMessage>
            {errors.residenceCountry && errors.residenceCountry.message}
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
