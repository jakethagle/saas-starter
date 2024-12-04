import type { NextPageWithLayout } from './_app';
import { Button } from '~/components/ui/button';
import { Heading } from '~/components/ui/heading';
import { Divider } from '~/components/ui/divider';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '~/components/ui/loading-spinner';

const IndexPage: NextPageWithLayout = () => {
  const session = useSession();
  console.log('SESSION STATE: ', session.status);
  const router = useRouter();
  if (session.status === 'authenticated') {
    router.push('/dashboard');
  } else if ((session.status as any) === 'loading') {
    return (
      <div className="w-full flex flex-row justify-center py-52">
        <LoadingSpinner color="emerald"></LoadingSpinner>
      </div>
    );
  } else {
    return (
      <div>
        <Heading>Please Log In</Heading>
        <Divider className="my-10 mt-6" />

        <Button onClick={() => signIn('github')}>Sign In</Button>
      </div>
    );
  }
};

export default IndexPage;
