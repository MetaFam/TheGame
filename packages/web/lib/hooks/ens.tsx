import { useEffect, useState } from 'react';
import { getENSForAddress } from 'utils/ensHelpers';

type ENSPair = {
  address: string;
  ens: string | null;
};

export const useENS = (playerAddress: string) => {
  const [userENSPair, setENSPair] = useState<ENSPair>();

  useEffect(() => {
    const resolveName = async () => {
      const ensPair: ENSPair = {
        address: playerAddress,
        ens: null,
      };
      ensPair.ens = await getENSForAddress(playerAddress);
      setENSPair(ensPair);
    };
    resolveName();
  }, [playerAddress]);

  return { userENSPair };
};
