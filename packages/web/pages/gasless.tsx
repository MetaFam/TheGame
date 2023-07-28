import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from '@biconomy/account';
import { Bundler, IBundler } from '@biconomy/bundler';
import { ChainId } from '@biconomy/core-types';
import { BiconomyPaymaster, IPaymaster } from '@biconomy/paymaster';
import { Link, MetaButton, Text, useToast } from '@metafam/ds';
import {
  chievAddress,
  chievTokenId,
} from 'components/Landing/OnboardingGame/nft';
import { ethers } from 'ethers';
import { useWeb3 } from 'lib/hooks';
import { useCallback, useState } from 'react';

import { CONFIG } from '../config';
import ABI from '../contracts/BulkDisbursableNFTs.abi';

export const Gasless: React.FC = () => {
  const { connected, provider, chainId, address } = useWeb3();
  const toast = useToast({});
  const [minting, setMinting] = useState(false);

  const mint = useCallback(async () => {
    try {
      if (!provider) throw new Error('No provider.');
      if (chainId == null) throw new Error('No chainId.');
      if (!CONFIG.paymasterURL) throw new Error('No Paymaster URL.');
      if (Number(chainId) !== ChainId.POLYGON_MAINNET) {
        throw new Error('Must be connected to the Polygon network.');
      }

      setMinting(true);

      toast({
        title: 'Minting',
        status: 'info',
        description: 'Beginning the minting process.',
      });

      const paymaster: IPaymaster = new BiconomyPaymaster({
        paymasterUrl: CONFIG.paymasterURL,
      });
      const bundler: IBundler = new Bundler({
        bundlerUrl: 'https://polygon.llamarpc.com',
        // bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44', // you can get this value from biconomy dashboard.
        chainId: ChainId.POLYGON_MUMBAI,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      });
      const accountConfig: BiconomySmartAccountConfig = {
        signer: provider.getSigner(),
        chainId: Number(chainId),
        // rpcUrl: '',
        paymaster,
        bundler,
      };
      const accountObject = new BiconomySmartAccount(accountConfig);
      const account = await accountObject.init();

      toast({
        title: 'Smart Account',
        status: 'info',
        description: `Created a Biconomy Smart Account at ${account.address}.`,
      });

      const mintTx = new ethers.utils.Interface(ABI);
      const data = mintTx.encodeFunctionData('mint(address[],uint256,bytes)', [
        [address],
        chievTokenId,
        [],
      ]);

      // eslint-disable-next-line no-console
      console.debug({ txData: data });

      const transaction = {
        to: chievAddress,
        data,
        value: 0,
      };
      const partialUserOp = await account.buildUserOp([transaction]);

      toast({
        title: <code>UserOperation</code>,
        status: 'info',
        description: (
          <p>
            Created an ERC-4337 <code>UserOperation</code>.
          </p>
        ),
      });

      const userOpResponse = await account.sendUserOp(partialUserOp);

      toast({
        title: 'Bundler',
        status: 'info',
        description: (
          <p>
            Sent the <code>UserOperation</code> to a Bundler.
          </p>
        ),
      });

      const txDetails = await userOpResponse.wait();

      toast({
        title: 'Minted',
        status: 'success',
        description: (
          <p>
            Minted a token in the{' '}
            <Link href={null}>transaction {txDetails.hash}</Link>.
          </p>
        ),
      });

      // eslint-disable-next-line no-console
      console.debug({ txDetails });
    } catch (error) {
      toast({
        title: 'Minting Error',
        status: 'error',
        description: (error as Error).message,
      });
      console.error({ error });
    } finally {
      setMinting(false);
    }
  }, [address, chainId, provider, toast]);

  return connected ? (
    <MetaButton onClick={mint}>Mint</MetaButton>
  ) : (
    <Text>Connect Your Wallet</Text>
  );
};

export default Gasless;
