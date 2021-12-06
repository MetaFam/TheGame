import { Constants } from '@metafam/utils';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { SCAccount, SCAccountsData } from 'sourcecred';

interface XPProps {
  userTotalXP: number | null;
  variationThisWeek: number | null;
  variationLastWeek: number | null;
  thisWeekXP: number | null;
  lastWeekXP: number | null;
  userWeeklyCred: number[] | null;
}

export const useUserXP = (userAddress: string): XPProps => {
  const [XPDataObj, setXPDataObj] = useState<XPProps>({
    userTotalXP: null,
    variationThisWeek: null,
    variationLastWeek: null,
    thisWeekXP: null,
    lastWeekXP: null,
    userWeeklyCred: null,
  });
  useEffect(() => {
    if (ethers.utils.isAddress(userAddress))
      getXP(userAddress).then((res) => {
        if (res) setXPDataObj(res);
      });
  }, [userAddress]);
  return XPDataObj;
};

const getXP = async (userAddress: string): Promise<XPProps | null> => {
  try {
    const accountsData: SCAccountsData = await (
      await fetch(Constants.SC_ACCOUNTS_FILE)
    ).json();

    const scAccount = await accountsData.accounts.find((account) =>
      accountFilter(account, userAddress),
    );

    if (!scAccount)
      return {
        userTotalXP: null,
        variationThisWeek: null,
        variationLastWeek: null,
        thisWeekXP: null,
        lastWeekXP: null,
        userWeeklyCred: null,
      };

    const userTotalXP = roundToTwoDecimal(scAccount.totalCred);
    const numWeeks = scAccount.cred.length;
    const userWeeklyCred = scAccount.cred;

    let variationThisWeek = calculateVariation(
      userWeeklyCred[numWeeks - 1],
      userWeeklyCred[numWeeks - 2],
    );
    let variationLastWeek = calculateVariation(
      userWeeklyCred[numWeeks - 2],
      userWeeklyCred[numWeeks - 3],
    );

    const thisWeekXP = roundToTwoDecimal(userWeeklyCred[numWeeks - 1]);
    const lastWeekXP = roundToTwoDecimal(userWeeklyCred[numWeeks - 2]);
    variationThisWeek = roundToTwoDecimal(variationThisWeek);
    variationLastWeek = roundToTwoDecimal(variationLastWeek);

    return {
      userTotalXP,
      variationThisWeek,
      variationLastWeek,
      thisWeekXP,
      lastWeekXP,
      userWeeklyCred,
    };
  } catch (err: unknown) {
    // throw new Error(err);
    return null;
  }
};

const accountFilter = (a: SCAccount, userAddress: string) => {
  const { account } = a;

  const acc = account.identity.aliases.find(
    (alias) => alias.description.toLowerCase() === userAddress.toLowerCase(),
  );
  return !!acc;
};

const calculateVariation = (first: number, second: number) =>
  (100 * (first - second)) / second;

const roundToTwoDecimal = (num: number): number => Math.round(num * 100) / 100;
