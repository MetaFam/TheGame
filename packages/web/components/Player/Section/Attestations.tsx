import { Button } from '@metafam/ds'
import { useEAS } from 'lib/hooks/useEAS'
import React, { useEffect } from 'react'

export const Attestations: React.FC<{}> = ({}) => {
  const { attest, getAttestation } = useEAS();

  useEffect(() => {
    const getAttestationData = async () => {
      const a = await getAttestation();
      console.log(a);
      return a;
    }
    getAttestationData().then((a) => console.log(a)); 
  }, [getAttestation])

  return (
    <div>
      Attestations
      <Button onClick={() => attest('message', 'connext')}>
        Attest
      </Button>
    </div>
  ) 
}
