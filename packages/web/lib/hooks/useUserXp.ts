import { Constants } from '@metafam/utils';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { SCAccount, SCAccountsData } from 'sourcecred';

interface XpProps {
  userTotalXp: number;
  absVariationThisWeek: {
    isNegative: boolean;
    value: number;
  };
  absVariationLastWeek: {
    isNegative: boolean;
    value: number;
  };
  thisWeekXp: number;
  lastWeekXp: number;
}

export const useUserXp = (user_address: string): XpProps => {
  const [xpDataObj, setXpDataObj] = useState<XpProps>({
    userTotalXp: 0,
    absVariationThisWeek: {
      isNegative: true,
      value: 0,
    },
    absVariationLastWeek: {
      isNegative: true,
      value: 0,
    },
    thisWeekXp: 0,
    lastWeekXp: 0,
  });
  useEffect(() => {
    if (ethers.utils.isAddress(user_address))
      getXp(user_address).then((res) => {
        if (res) setXpDataObj(res);
      });
  }, [user_address]);
  return xpDataObj;
};

const getXp = async (user_address: string): Promise<XpProps | null> => {
  try {
    const accountsData: SCAccountsData = await (
      await fetch(Constants.SC_ACCOUNTS_FILE)
    ).json();

    const scAccount = await accountsData.accounts.find((account) =>
      filterAccount(account, user_address),
    );

    if (!scAccount)
      return {
        userTotalXp: 0,
        absVariationThisWeek: {
          isNegative: true,
          value: 0,
        },
        absVariationLastWeek: {
          isNegative: true,
          value: 0,
        },
        thisWeekXp: 0,
        lastWeekXp: 0,
      };

    const userTotalXp = roundToTwoDecimal(scAccount.totalCred);
    const numWeeks = scAccount.cred.length;
    const userWeeklyCred = scAccount.cred;

    const variationThisWeek = calculateVariation(
      userWeeklyCred[numWeeks - 1],
      userWeeklyCred[numWeeks - 2],
    );

    const absVariationThisWeek = {
      isNegative: variationThisWeek < 0,
      value: roundToTwoDecimal(Math.abs(variationThisWeek)),
    };

    const variationLastWeek = calculateVariation(
      userWeeklyCred[numWeeks - 2],
      userWeeklyCred[numWeeks - 3],
    );

    const absVariationLastWeek = {
      isNegative: variationLastWeek < 0,
      value: roundToTwoDecimal(Math.abs(variationLastWeek)),
    };

    const thisWeekXp = roundToTwoDecimal(userWeeklyCred[numWeeks - 1]);
    const lastWeekXp = roundToTwoDecimal(userWeeklyCred[numWeeks - 2]);

    return {
      userTotalXp,
      absVariationThisWeek,
      absVariationLastWeek,
      thisWeekXp,
      lastWeekXp,
    };
  } catch (err: unknown) {
    // throw new Error(err);
    return null;
  }
};

const filterAccount = (a: SCAccount, user_address: string) => {
  const { account } = a;

  const acc = account.identity.aliases.filter((alias) => {
    if (alias.description.toLowerCase() === user_address.toLowerCase()) {
      return true;
    }
    return false;
  });
  if (acc.length) {
    return acc;
  }

  return false;
};

const calculateVariation = (first: number, second: number) =>
  (100 * (first - second)) / second;

const roundToTwoDecimal = (num: number): number => Math.round(num * 100) / 100;
