import { delegate } from "pages/api/w3up-client";
import { Client } from "@web3-storage/w3up-client";

export async function useW3upClient(did: string) {
  try {
    const result = await delegate(did);
    console.log('result', result);
    if (result) {
      const res = (result[1] as Client)?.uploadFile(new File(['hello, is this working???'], 'file.txt'));
      console.log('res', res);
      return result[1];
    } else {
      console.log('Delegation failed');
    }
  } catch (error) {
    console.error('Error occurred during delegation:', error);
  }
}