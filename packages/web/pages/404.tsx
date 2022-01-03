import { MetaButton } from '@metafam/ds';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const Custom404: FC = () => {
  const router = useRouter();

  return (
    <>
      <h1>Oops!</h1>
      <h3>We can't seem to find the page you're looking for.</h3>
      <p>Here are some good places to start exploring MetaGame, instead:</p>
      <MetaButton onClick={() => router.push('/')}>Home</MetaButton>
      <MetaButton onClick={() => router.push('/learn/wiki')}>Wiki</MetaButton>
      <Link href="https://forum.metagame.wtf">
        <MetaButton>Forum</MetaButton>
      </Link>
      <Link href="https://discord.gg/metagame">
        <MetaButton>Discord</MetaButton>
      </Link>
    </>
  );
};

export default Custom404;
