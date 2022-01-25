import { useGetpSeedBalanceQuery } from '../../graphql/autogen/types';
import { useUser } from './index';

interface PSeedBalanceHook {
  pSeedBalance: string | null;
  fetching: boolean;
}
export const usePSeedBalance: () => PSeedBalanceHook = () => {
  const { user } = useUser();

  const [{ data, fetching }] = useGetpSeedBalanceQuery({
    variables: {
      address: user?.ethereumAddress ?? '',
    },
    pause: !user?.ethereumAddress,
  });
  const pSeedBalance =
    (user?.ethereumAddress && data?.getTokenBalances?.pSeedBalance) ?? null;

  return { pSeedBalance, fetching };
};
