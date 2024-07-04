import { useGetPSeedBalanceQuery } from '../../graphql/autogen/types';
import { useUser } from './index';

interface PSeedBalanceHook {
  pSeedBalance: number | null;
  fetching: boolean;
}
export const usePSeedBalance: () => PSeedBalanceHook = () => {
  const { user } = useUser();

  const [{ data, fetching }] = useGetPSeedBalanceQuery({
    variables: {
      address: user?.ethereumAddress ?? '',
    },
    pause: !user?.ethereumAddress,
  });
  const pSeedBalance = data?.getTokenBalances?.pSEED ?? null;

  return { pSeedBalance, fetching };
};
