import { useGetpSeedBalanceQuery } from '../../graphql/autogen/types';
import { useUser } from './index';

interface PSeedBalanceHook {
  pSeedBalance: string | null;
  fetching: boolean;
}
export const usePSeedBalance: () => PSeedBalanceHook = () => {
  const { user } = useUser();

  const [respSeedBalance] = useGetpSeedBalanceQuery({
    variables: {
      address: user?.ethereum_address || '',
    },
    pause: !user?.ethereum_address,
  });
  const pSeedBalance =
    (user?.ethereum_address &&
      respSeedBalance.data?.getTokenBalances?.pSeedBalance) ||
    null;

  return {
    pSeedBalance,
    fetching: respSeedBalance.fetching,
  };
};
