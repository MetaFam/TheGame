import { useToast } from '@metafam/ds';
import { useCallback } from 'react';

export type FileReaderData = {
  file: File;
  dataURL: string;
};

export const useImageReader = () => {
  const toast = useToast();

  const readFile = useCallback(
    (file: File) =>
      new Promise(
        (
          resolve: (value: string) => void,
          reject: (err?: DOMException) => void,
        ) => {
          const reader = new FileReader();
          reader.addEventListener(
            'load',
            () => {
              resolve(reader.result as string);
            },
            { once: true },
          );
          reader.addEventListener(
            'error',
            ({ target }) => {
              const { error } = target ?? {};
              toast({
                title: 'Image Loading Error',
                description: error?.message,
                status: 'error',
                isClosable: true,
                duration: 10000,
              });
              reject(error ?? undefined);
            },
            { once: true },
          );
          reader.readAsDataURL(file);
        },
      ),
    [toast],
  );

  return readFile;
};
