import { Box, Link } from '@metafam/ds';
import { useAuthenticateDiscordGuildMutation } from 'graphql/autogen/types';
import { get, remove } from 'lib/store';
import { useRouter } from 'next/router';
import React, { lazy,useEffect, useState } from 'react';

import { discordAuthStateGuidKey } from './start';

const PageContainer = lazy(() => import('components/Container'));

const GuildSetupAuthCallback: React.FC = () => {
  const router = useRouter();

  const [authGuildRes, authGuild] = useAuthenticateDiscordGuildMutation();
  const [error, setError] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    // when auth request is denied, we get `error=access_denied` and `error_description` and `state` parameters
    const { code, error_description: discordErrorDetail, state } = router.query;

    const localState = get(discordAuthStateGuidKey);

    if (discordErrorDetail != null) {
      setError(discordErrorDetail as string);
      return;
    }

    const submitAuthCode = async () => {
      const { data, error: mutationError } = await authGuild({
        code: code as string,
      });
      const response = data?.authenticateDiscordGuild;
      if (mutationError || response?.success === false) {
        setError(mutationError?.message || 'An unexpected error occurred.');
      } else if (response?.guildname != null) {
        // clean up guid
        remove(discordAuthStateGuidKey);
        router.push(`/join/guild/${response?.guildname}`);
      }
    };
    if (!fetching && code) {
      if (localState == null || localState !== state) {
        setError('State did not match.');
        return;
      }
      setFetching(true);
      submitAuthCode();
    }
  }, [router, authGuild, error, fetching]);

  return (
    <PageContainer>
      {error && (
        <div style={{ textAlign: 'center' }}>
          Could not load your guild information from Discord: {error}
          <Box mt={2}>
            <Link href="/join/guild" color="blue.400">
              Try again
            </Link>
          </Box>
        </div>
      )}
      {authGuildRes.fetching &&
        'Loading your guild information from Discord...'}
    </PageContainer>
  );
};

export default GuildSetupAuthCallback;