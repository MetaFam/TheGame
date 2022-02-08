import { Web3Context, Web3ContextType } from 'contexts/Web3Context';
import { useContext } from 'react';

export const useWeb3 = (): Web3ContextType => useContext(Web3Context);
