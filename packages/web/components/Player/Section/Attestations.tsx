import { MetaButton,Textarea } from '@metafam/ds'
import { Player } from 'graphql/autogen/types'
import { useEAS } from 'lib/hooks/useEAS'
import { useWeb3 } from 'lib/hooks'
import React, { useEffect, useState } from 'react'

const MAX_DESC_LEN = 420; // characters

export const Attestations: React.FC<{ player: Player }> = ({ player }) => {
  const { attest, getAttestationsForRecipient } = useEAS();
  const [attestation, setAttestion] = useState<string>('')
  const [attestations, setAttestations] = useState<any[]>([])
  const { address } = useWeb3();

  useEffect(() => {
    const getAttestationData = async () => {
      const attestationData = await getAttestationsForRecipient(player?.ethereumAddress)
      setAttestations(attestationData)
    }
    getAttestationData()
  }, [player?.ethereumAddress])

  return (
    <div>
      {
        player?.ethereumAddress !== address && 
        <div>
          <h3>Your Attestations: ({attestations?.length})</h3>
          {
            attestations?.map((attestation, i) => (
              <div key={i}>
                <p>Attestee {attestation[0].value.value}</p>
                <p>Attester {attestation[1].value.value}</p>
                <p>Attestation {attestation[2].value.value}</p>
                <p>xp {attestation[3].value.value}</p>
              </div>
            ))
          }
        </div>
      }
      {
        player?.ethereumAddress !== address && 
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
              setAttestion(e.target.value)
            }}
            value={attestation}
          />
          <MetaButton onClick={() => attest(attestation, player?.ethereumAddress)} style={{ marginTop: '1em' }}>
            Attest
          </MetaButton>
       </div>
      }
     
    </div>
  ) 
}
