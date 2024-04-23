import { Flex, MetaButton, Text, Textarea, VStack } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import { useWeb3 } from 'lib/hooks';
import { useEAS } from 'lib/hooks/useEAS';
import React, { useEffect, useState } from 'react';

const MAX_DESC_LEN = 420; // characters

export const Attestations: React.FC<{ player: Player }> = ({ player }) => {
  const { attest, getAttestationsForRecipient } = useEAS();
  const [attestation, setAttestion] = useState<string>('');
  const [attestations, setAttestations] = useState<any[]>([]);
  const { address } = useWeb3();

  useEffect(() => {
    const getAttestationData = async () => {
      const attestationData = await getAttestationsForRecipient(
        player?.ethereumAddress,
      );
      setAttestations(attestationData);
    };
    getAttestationData();
  }, [player?.ethereumAddress]);

  return (
    <div>
      {player?.ethereumAddress !== address && (
        <div>
          <h3>Your Attestations: ({attestations?.length})</h3>
          <VStack mt={4} mb={4} w="full">
            {attestations?.map((attestation, i) => {
              const attestee = attestation[0].value;
              const attestor = attestation[1].value;

              const attestationVal = attestation[2].value;
              const xp = attestation[3].value;
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
                    {attestor.value}
                  </Text>
                  {/* <p>xp {xp.value}</p> */}
                  <Text fontSize="sm">10min ago</Text>
                </Flex>
              );
            })}
          </VStack>
        </div>
      )}
      {player?.ethereumAddress !== address && (
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
            onClick={() => attest(attestation, player?.ethereumAddress)}
            style={{ marginTop: '1em' }}
          >
            Attest
          </MetaButton>
        </div>
      )}
    </div>
  );
};
