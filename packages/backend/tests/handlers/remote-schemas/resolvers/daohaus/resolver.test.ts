/* eslint-disable @typescript-eslint/no-explicit-any */
import nock from 'nock';

import {
  Resolver,
  ResolverFn,
} from '../../../../../src/handlers/remote-schemas/autogen/types';
import { getDaoHausMemberships } from '../../../../../src/handlers/remote-schemas/resolvers/daohaus/resolver';

type MockResolver<TResult, TParent, TContext, TArgs> = (
  parent?: TParent | any,
  args?: TArgs | any,
  context?: TContext | any,
  info?: any,
) => Promise<TResult> | TResult;

function mockResolver<TResult, TParent, TContext, TArgs>(
  resolver: Resolver<TResult, TParent, TContext, TArgs>,
): MockResolver<TResult, TParent, TContext, TArgs> {
  return (parent: TParent, args: TArgs, context: TContext, info) =>
    (resolver as ResolverFn<TResult, TParent, TContext, TArgs>)(
      parent,
      args,
      context,
      info,
    );
}

// NOTE for integration tests, this address always needs to be part of at least one dao
const VALID_ADDRESS = '0xb53b0255895c4f9e3a185e484e5b674bccfbc076';

describe('getDaoHausMemberships', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should return an empty array when no wallet address passed', async () => {
    const membershipResolver = mockResolver(getDaoHausMemberships);

    const members = await membershipResolver({}, {});
    expect(members).toStrictEqual([]);
  });

  it('should return an empty array when all dao subgraphs fail', async () => {
    const membershipResolver = mockResolver(getDaoHausMemberships);

    const graphs = nock('https://api.thegraph.com:443')
      .post('/subgraphs/name/odyssy-automaton/daohaus')
      .reply(400, { errors: [{ message: 'Subgraph unavailable' }] })
      .post('/subgraphs/name/odyssy-automaton/daohaus-xdai')
      .reply(400, { errors: [{ message: 'Subgraph unavailable' }] })
      .post('/subgraphs/name/odyssy-automaton/daohaus-matic')
      .reply(400, { errors: [{ message: 'Subgraph unavailable' }] });

    const result = await membershipResolver(
      {},
      { memberAddress: VALID_ADDRESS },
    );

    expect(result).toStrictEqual([]);

    expect(graphs.isDone()).toBeTruthy();
  });
});
