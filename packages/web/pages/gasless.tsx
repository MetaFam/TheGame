import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from '@biconomy/account';
import { Bundler, IBundler } from '@biconomy/bundler';
import { ChainId, UserOperation } from '@biconomy/core-types';
import {
  BiconomyPaymaster,
  IPaymaster,
  PaymasterAndDataResponse,
  PaymasterMode,
  SponsorUserOperationDto,
} from '@biconomy/paymaster';
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
  const { connected, provider, address } = useWeb3();
  const toast = useToast({});
  const [minting, setMinting] = useState(false);

  const mint = useCallback(async () => {
    try {
      if (!provider) throw new Error('No provider.');
      if (!CONFIG.paymasterURL) throw new Error('No Paymaster URL.');
      if (!CONFIG.bundlerURL) throw new Error('No Bundler URL.');

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
        bundlerUrl: CONFIG.bundlerURL,
        chainId: ChainId.POLYGON_MAINNET,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      });
      const accountConfig: BiconomySmartAccountConfig = {
        signer: provider.getSigner(),
        chainId: ChainId.POLYGON_MAINNET,
        // rpcUrl: '',
        paymaster,
        bundler,
      };
      const accountObject = new BiconomySmartAccount(accountConfig);
      const account = await accountObject.init();
      const accountAddress = await account.getSmartAccountAddress();
      const accountDeployed = await account.isAccountDeployed(accountAddress);

      toast({
        title: 'Smart Account',
        status: 'info',
        description:
          'Created a Biconomy Smart Account at ' +
          `${accountAddress} which is ` +
          `${accountDeployed ? '' : 'not '}deployed.`,
      });

      const contract = new ethers.Contract(chievAddress, ABI, provider);

      // eslint-disable-next-line no-console
      console.debug({ contract });

      const { data: txData } = await contract.populateTransaction[
        'mint(address[],uint256,bytes)'
      ]([address], `0x${chievTokenId.toString(16)}`, []);
      const contractTx = { to: chievAddress, data: txData };

      const chievesInterface = new ethers.utils.Interface(ABI);
      const args = [[address], `0x${chievTokenId.toString(16)}`, []];
      const data = chievesInterface.encodeFunctionData(
        'mint(address[],uint256,bytes)',
        args,
      );
      const interfaceTx = { to: chievAddress, data };

      // eslint-disable-next-line no-console
      console.debug({
        args,
        contractTx,
        interfaceTx,
        chievesInterface,
        sameData: contractTx.data === interfaceTx.data,
      });

      const partialUserOp = await account.buildUserOp([contractTx]);

      const paymasterServiceData = {
        mode: PaymasterMode.SPONSORED,
        smartAccountInfo: {
          name: 'BICONOMY',
          version: '2.0.0',
        },
      };
      const { paymasterAndData } = await (
        account.paymaster.getPaymasterAndData as (
          op: Partial<UserOperation>,
          service: SponsorUserOperationDto,
        ) => Promise<PaymasterAndDataResponse>
      )(partialUserOp, paymasterServiceData);

      Object.assign(partialUserOp, { paymasterAndData });

      // eslint-disable-next-line no-console
      console.debug({ partialUserOp });

      toast({
        title: <code>UserOperation</code>,
        status: 'info',
        description: (
          <p>
            Created an ERC-4337 <code>UserOperation</code>.
          </p>
        ),
      });

      const opResponse = await account.sendUserOp(partialUserOp);

      toast({
        title: 'Bundler',
        status: 'info',
        description: (
          <p>
            Sent the <code>UserOperation</code> to a Bundler.
          </p>
        ),
      });

      const txDetails = await opResponse.wait();

      toast({
        title: 'Minted',
        status: 'success',
        description: (
          <p>
            Minted a token in the{' '}
            <Link href={'#'}>
              transaction {txDetails.receipt.transactionHash}
            </Link>
            .
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
  }, [address, provider, toast]);

  return connected ? (
    <MetaButton onClick={mint} disabled={minting}>
      Mint
    </MetaButton>
  ) : (
    <Text textAlign="center">Connect Your Wallet</Text>
  );
};

export default Gasless;
