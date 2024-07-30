import { useContext } from 'react';

import { Web3Context, Web3ContextType } from '#contexts/Web3Context';

export const useWeb3 = (): Web3ContextType => useContext(Web3Context);
