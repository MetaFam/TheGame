import { daoHausClient } from '../../../../lib/daoHausClient';
import { QueryResolvers } from '../../autogen/types';

export const getDaoHausMemberships: QueryResolvers['getDaoHausMemberships'] = async (
  _,
  { memberAddress },
) => {
  if (!memberAddress) return [];
  const res = await daoHausClient.GetDaoHausMemberships({ memberAddress });

  return res.members;
};
