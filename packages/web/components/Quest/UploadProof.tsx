import {
  Box,
  Button,
  CloseIcon,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  ToastId,
  Tooltip,
  useDisclosure,
  useToast,
} from '@metafam/ds';
import { contracts, graphql } from '@quest-chains/sdk';
import { MarkdownEditor } from 'components/MarkdownEditor';
import { SubmitButton } from 'components/SubmitButton';
import { useWeb3 } from 'lib/hooks';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getQuestChainContract } from 'utils/contract';
import { waitUntilBlock } from 'utils/graphHelpers';
import { Metadata, metadataUploader } from 'utils/questChains';

export const UploadProof: React.FC<{
  refresh: () => void;
  questId: string;
  name: string;
  questChain: graphql.QuestChainInfoFragment;
  profile?: boolean;
}> = ({ refresh, questId, name, questChain, profile }) => {
  const { chainId, provider, address } = useWeb3();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSubmitting, setSubmitting] = useState(false);

  const onModalClose = useCallback(() => {
    setProofDescription('');
    setMyFiles([]);
    onClose();
  }, [onClose]);
  const [proofDescription, setProofDescription] = useState('');
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const removeFile = (file: File) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };
  const toast = useToast();

  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const onSubmit = useCallback(async () => {
    function close() {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
    }
    function addToast(description: string) {
      toastIdRef.current = toast({ description });
    }
    if (!chainId || chainId !== questChain.chainId || !provider) return;
    if (proofDescription) {
      addToast('Uploading metadata to IPFS via web3.storage');

      try {
        let hash = myFiles.length
          ? await metadataUploader.uploadFiles(myFiles)
          : '';
        const metadata: Metadata = {
          name: `Submission - QuestChain - ${questChain.name} - Quest - ${questId}. ${name} User - ${address}`,
          description: proofDescription,
          external_url: hash ? `ipfs://${hash}` : undefined,
        };

        hash = await metadataUploader.uploadMetadata(metadata);
        const details = `ipfs://${hash}`;
        close();
        addToast(
          'Waiting for Confirmation - Confirm the transaction in your Wallet',
        );

        const contract = getQuestChainContract(
          questChain.address,
          questChain.version,
          provider.getSigner(),
        );

        const tx = await (questChain.version === '1'
          ? (contract as contracts.V1.QuestChain).submitProofs(
              [questId],
              [details],
            )
          : (contract as contracts.V0.QuestChain).submitProof(
              questId,
              details,
            ));
        close();
        const receipt = await tx.wait(1);
        addToast(
          'Transaction confirmed. Waiting for The Graph to index the transaction data.',
        );
        await waitUntilBlock(chainId, receipt.blockNumber);
        close();
        addToast('Successfully submitted proof');
        onModalClose();
        refresh();
      } catch (error) {
        close();
        addToast(
          (error as { error?: Error }).error?.message ??
            (error as Error).message,
        );
      }

      setSubmitting(false);
    }
  }, [
    chainId,
    questChain.chainId,
    questChain.name,
    questChain.address,
    questChain.version,
    provider,
    proofDescription,
    toast,
    myFiles,
    questId,
    name,
    address,
    onModalClose,
    refresh,
  ]);

  return (
    <Box>
      <Tooltip
        shouldWrapChildren
        label="Please connect or switch to the correct chain"
        isDisabled={chainId === questChain.chainId}
      >
        {!profile && (
          <Button
            onClick={onOpen}
            isDisabled={chainId !== questChain.chainId || !address}
            px={5}
            bgColor="purple.500"
            py={2}
            borderRadius={6}
            _hover={{
              bgColor: 'purple.300',
            }}
          >
            Submit Proof
          </Button>
        )}
        {profile && (
          <Button
            w="full"
            onClick={onOpen}
            isDisabled={chainId !== questChain.chainId || !address}
            variant="outline"
          >
            Re-submit Proof
          </Button>
        )}
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onModalClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="40rem" bgColor="#392373" color="white">
          <ModalHeader>Upload Proof - {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="proofDescription">Description</FormLabel>
              <Flex w="100%" pb={4}>
                <MarkdownEditor
                  value={proofDescription}
                  onChange={(value) => setProofDescription(value)}
                />
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="file">Upload file</FormLabel>
              <Flex
                {...getRootProps({ className: 'dropzone' })}
                flexDir="column"
                borderWidth={1}
                borderStyle="dashed"
                borderRadius={20}
                p={10}
                mb={4}
                onClick={open}
              >
                <input {...getInputProps()} color="white" />
                <Box alignSelf="center">{`Drag 'n' drop some files here`}</Box>
              </Flex>
            </FormControl>
            <Text mb={1}>Files:</Text>
            {myFiles.map((file: File) => (
              <Flex key={file.name} w="100%" mb={1}>
                <IconButton
                  size="xs"
                  borderRadius="full"
                  onClick={removeFile(file)}
                  icon={<CloseIcon boxSize="1rem" />}
                  aria-label={''}
                />
                <Text ml={1} alignSelf="center">
                  {file.name} - {file.size} bytes
                </Text>
              </Flex>
            ))}
          </ModalBody>

          <ModalFooter alignItems="baseline">
            <Button
              variant="ghost"
              mr={3}
              onClick={onModalClose}
              borderRadius="full"
            >
              Close
            </Button>
            <SubmitButton
              mt={4}
              type="submit"
              onClick={onSubmit}
              isDisabled={!proofDescription}
              isLoading={isSubmitting}
            >
              Submit
            </SubmitButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
