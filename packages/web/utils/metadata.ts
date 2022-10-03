import axios, { AxiosError } from 'axios';

import { QUESTS } from './questChains';
import { Metadata as MetadataType, validateSchema } from './validate';

export type Metadata = MetadataType;

type HttpResponse = { response: unknown; error: string };

export const uploadMetadata = async (
  metadata: MetadataType,
): Promise<string> => {
  const valid = validateSchema(metadata);
  if (!valid) throw new Error('Invalid Metadata Schema');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `${QUESTS.API_URL}/upload/json`,
      metadata,
      config,
    );
    return res.data.response;
  } catch (error) {
    throw new Error(
      ((error as AxiosError).response?.data as HttpResponse).error,
    );
  }
};

export const uploadFiles = async (
  files: File[] | FileList,
): Promise<string> => {
  const formData = new FormData();
  for (let i = 0; i < files.length; ++i) {
    formData.append(files[i].name, files[i]);
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
    onUploadProgress: (event: { loaded: number; total: number }) => {
      // eslint-disable-next-line no-console
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total),
      );
    },
  };

  try {
    const res = await axios.post(
      `${QUESTS.API_URL}/upload/files`,
      formData,
      config,
    );
    return res.data.response;
  } catch (error) {
    throw new Error(
      ((error as AxiosError).response?.data as HttpResponse).error,
    );
  }
};
