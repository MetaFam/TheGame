import { MetaButton,Textarea } from '@metafam/ds'
import { Player } from 'graphql/autogen/types'
import { useEAS } from 'lib/hooks/useEAS'
import React, { useEffect, useState } from 'react'

const MAX_DESC_LEN = 420; // characters

export const Attestations: React.FC<{ player: Player }> = ({ player }) => {
  const { attest, getAttestations } = useEAS();
  const [attestation, setAttestion] = useState<string>('')

  useEffect(() => {
    getAttestations()
  }, [])

  return (
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
  ) 
}
