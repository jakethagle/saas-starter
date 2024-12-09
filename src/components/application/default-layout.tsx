import Head from 'next/head';
import type { ReactNode } from 'react';
import { SidebarLayout } from '../ui/sidebar-layout';
import LayoutSidebar from './sidebar/sidebar';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '../ui/loading-spinner';

type DefaultLayoutProps = { children: ReactNode };
export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const session = useSession();
  return (
    <>
      <Head>
        <title>SaaS Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session.status === 'authenticated' ? (
        <SidebarLayout
          navbar={undefined}
          sidebar={LayoutSidebar({ session: session.data })}
        >
          {children}
        </SidebarLayout>
      ) : (
        <main className="flex min-h-full flex-1 flex-col justify-center px-2.5 py-12 sm:px-6 lg:px-8">
          {session.status === 'loading' ? <LoadingSpinner /> : children};
        </main>
      )}
    </>
  );
};
