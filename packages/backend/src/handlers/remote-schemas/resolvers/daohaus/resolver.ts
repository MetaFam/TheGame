import { daoHausClient } from '../../../../lib/daoHausClient';
import { QueryResolvers } from '../../autogen/types';

type MembershipsType = QueryResolvers['getDaoHausMemberships'];

export const getDaoHausMemberships: MembershipsType = (
  async (
    _,
    { memberAddress },
  ) => {
    if (!memberAddress) return [];
    const res = await (
      daoHausClient.GetDaoHausMemberships({ memberAddress })
    );

    return res.members;
  }
);
