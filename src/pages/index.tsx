import type { NextPageWithLayout } from './_app';
import { Button } from '~/components/ui/button';
import { Heading } from '~/components/ui/heading';
import { Divider } from '~/components/ui/divider';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const IndexPage: NextPageWithLayout = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === 'authenticated') {
    router.push('/dashboard');
  }
  return (
    <div>
      <Heading>Please Log In</Heading>
      <Divider className="my-10 mt-6" />

      <Button onClick={() => signIn('github')}>Sign In</Button>
    </div>
  );
};

export default IndexPage;
