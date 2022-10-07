import { BoxProps } from '@metafam/ds';
import { useCallback, useState } from 'react';
import { DropzoneInputProps, DropzoneProps, useDropzone } from 'react-dropzone';

export type DropFilesType = {
  onOpenFilesInput: () => void;
  onResetFiles: () => void;
  dropzoneProps: { className: string } & BoxProps;
  inputProps: DropzoneInputProps;
  onRemoveFile: (file: File) => void;
  files: File[];
};

export const useDropFiles = (options: DropzoneProps = {}): DropFilesType => {
  const [files, setFiles] = useState<File[]>([]);

  const onResetFiles = useCallback(() => setFiles([]), []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) =>
      setFiles((oldFiles) => [...oldFiles, ...acceptedFiles]),
    [],
  );

  const onRemoveFile = useCallback(
    (file: File) =>
      setFiles((oldFiles) => {
        const newFiles = [...oldFiles];
        newFiles.splice(newFiles.indexOf(file), 1);
        return newFiles;
      }),
    [],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    onDrop,
    ...options,
  });

  return {
    dropzoneProps: getRootProps({ className: 'dropzone' }),
    inputProps: getInputProps(),
    files,
    onRemoveFile,
    onResetFiles,
    onOpenFilesInput: open,
  };
};

export type DropImageType = {
  onOpenImageInput: () => void;
  onResetImage: () => void;
  dropzoneProps: { className: string } & BoxProps;
  inputProps: DropzoneInputProps;
  imageFile: File | null;
};

export const useDropImage = (options: DropzoneProps = {}): DropImageType => {
  const { files, dropzoneProps, inputProps, onResetFiles, onOpenFilesInput } =
    useDropFiles({
      multiple: false,
      accept: {
        'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
      },
      ...options,
    });

  return {
    imageFile: files[0] ?? null,
    dropzoneProps,
    inputProps,
    onResetImage: onResetFiles,
    onOpenImageInput: onOpenFilesInput,
  };
};
