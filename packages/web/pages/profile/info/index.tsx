import { PageContainer } from 'components/Container';
import { useForm } from 'react-hook-form';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import React from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useWeb3 } from '../../../lib/hooks';

const InfoPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue
  } = useForm();
  const { ceramic, idx, address } = useWeb3();

  useEffect(() => {
    // fetch from IDX
    (async() => {
      if (ceramic && address) {
        const caip10 = await Caip10Link.fromAccount(ceramic, `${address}@eip155:1`)
        if(caip10.did){
          const result = await idx?.get('basicProfile', caip10.did);
          Object.entries(result as Record<string, any>).forEach(
            ([key, value]) => {
              if (['image', 'background'].includes(key)){
                value = (value as Record<string, any>).original.src;
              }
              if(key === "birthDate"){
                value = new Date(value as string)
              }
              setValue(key, value)
            })
        }
      }
    })()

    // loop over

  }, [ceramic, address])

  function onSubmit(values: any) {
    console.log(values)
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve(values);
      }, 3000);
    });
  }
  return (
    <PageContainer>
      Hello Meta Profile
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">First name</FormLabel>
          <Input
            name="name"
            placeholder="name"
            ref={register}
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" }
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.image}>
          <FormLabel htmlFor="image">First name</FormLabel>
          <Input
            name="image"
            placeholder="image"
            ref={register}
            {...register("image", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" }
            })}
          />
          <FormErrorMessage>
            {errors.image && errors.image.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </PageContainer>
  )
}


export default InfoPage;