import { PageContainer } from 'components/Container';
import { useAuthenticateDiscordGuildMutation } from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const GuildSetupAuthCallback: React.FC = () => {
  const router = useRouter();

  const [authGuildRes, authGuild] = useAuthenticateDiscordGuildMutation();
  const [error, setError] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    // when auth request is denied, we get `error=access_denied` and `error_description` and `state` parameters
    const { code, error_description: discordErrorDetail } = router.query;
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
        if (response?.exists === true) {
          router.push(`/guild/${response?.guildname}`);
        } else {
          router.push(`/join/guild/${response?.guildname}`);
        }
      }
    };
    if (!fetching && code) {
      setFetching(true);
      submitAuthCode();
    }
  }, [router, authGuild, error, fetching]);

  return (
    <PageContainer>
      {error && `Could not load your guild information from Discord. ${error}`}
      {authGuildRes.fetching &&
        'Loading your guild information from Discord...'}
    </PageContainer>
  );
};

export default GuildSetupAuthCallback;
