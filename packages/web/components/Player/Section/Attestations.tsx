import {
  Flex,
  MetaButton,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@metafam/ds';
import React, { useEffect, useState } from 'react';

import { Player } from '#graphql/autogen/hasura-sdk';
import { useWeb3 } from '#lib/hooks';
import { useEAS } from '#lib/hooks/useEAS';

const MAX_DESC_LEN = 420; // characters

export const Attestations: React.FC<{ player: Player }> = ({ player }) => {
  const { attest, getAttestationsForRecipient } = useEAS();
  const [attestation, setAttestion] = useState<string>('');
  const [attestations, setAttestations] = useState<any[]>([]);
  const { address } = useWeb3();
  const [isAttesting, setIsAttesting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getAttestationData = async () => {
      const attestationData = await getAttestationsForRecipient(
        player?.ethereumAddress,
      );
      setAttestations(attestationData);
    };
    getAttestationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.ethereumAddress, isAttesting]);

  const handleAttest = async () => {
    try {
      setIsAttesting(true);
      await attest(attestation, player?.ethereumAddress);
      setAttestion('');
    } catch (err) {
      toast({
        title: 'Error',
        description: `Unable to save layout. Error: ${(err as Error).message}`,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsAttesting(false);
    }
  };

  return (
    <div>
      {player?.ethereumAddress.toLowerCase() === address?.toLowerCase() && (
        <div>
          <h3>Your Attestations: ({attestations?.length})</h3>
          <VStack mt={4} mb={4} w="full">
            {attestations?.map((att, i) => {
              const attestor = att[3].value;
              const timeCreated = att[1].value.value;
              const attestationVal = att[0].value;

              return (
                <Flex
                  direction="column"
                  key={i}
                  justifyContent="start"
                  alignContent="center"
                  color={'violet'}
                  width={'full'}
                  px={4}
                  py={3}
                  background={'blackAlpha.300'}
                  transition={'ease-in-out'}
                  transitionDuration={'300'}
                  _hover={{
                    background: 'blackAlpha.500',
                  }}
                  _active={{
                    background: 'blackAlpha.700',
                  }}
                  borderRadius={20}
                  borderColor={'rgba(255,255,255,0.1)'}
                  borderLeftWidth={1}
                  borderTopWidth={1}
                  dropShadow={`0 4 4px rgba(0,0,0,0.25)`}
                >
                  <Text
                    fontSize="md"
                    fontWeight={700}
                    noOfLines={4}
                    my={2}
                    color="white"
                  >
                    {attestationVal.value}
                  </Text>
                  <Text fontSize="sm" color="white">
                    By {attestor}
                  </Text>
                  <Text fontSize="sm">{timeCreated}</Text>
                </Flex>
              );
            })}
          </VStack>
        </div>
      )}
      {player?.ethereumAddress.toLocaleLowerCase() !== address?.toLocaleLowerCase() && (
        <>
          <div>
            <h3>Your Attestations: ({attestations?.length})</h3>
            <VStack mt={4} mb={4} w="full">
              {attestations?.map((att, i) => {
                const attestor = att[3].value;
                const timeCreated = att[1].value.value;
                const attestationVal = att[0].value;

                return (
                  <Flex
                    direction="column"
                    key={i}
                    justifyContent="start"
                    alignContent="center"
                    color={'violet'}
                    width={'full'}
                    px={4}
                    py={3}
                    background={'blackAlpha.300'}
                    transition={'ease-in-out'}
                    transitionDuration={'300'}
                    _hover={{
                      background: 'blackAlpha.500',
                    }}
                    _active={{
                      background: 'blackAlpha.700',
                    }}
                    borderRadius={20}
                    borderColor={'rgba(255,255,255,0.1)'}
                    borderLeftWidth={1}
                    borderTopWidth={1}
                    dropShadow={`0 4 4px rgba(0,0,0,0.25)`}
                  >
                    <Text
                      fontSize="md"
                      fontWeight={700}
                      noOfLines={4}
                      my={2}
                      color="white"
                    >
                      {attestationVal.value}
                    </Text>
                    <Text fontSize="sm" color="white">
                      By {attestor}
                    </Text>
                    <Text fontSize="sm">{timeCreated}</Text>
                  </Flex>
                );
              })}
            </VStack>
          </div>
        </>
      )}
      <div>
        <Textarea
          placeholder="Attest."
          minW="min(18em, calc(100vw - 2rem))"
          color="white"
          bg="dark"
          onChange={(e) => {
            if (e.target.value.length > MAX_DESC_LEN) {
              return;
            }
            setAttestion(e.target.value);
          }}
          value={attestation}
        />
        <MetaButton
          onClick={handleAttest}
          disabled={isAttesting}
          style={{ marginTop: '1em' }}
        >
          Attest
        </MetaButton>
      </div>
    </div>
  );
};
