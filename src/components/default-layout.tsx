import Head from 'next/head';
import type { ReactNode } from 'react';
import { SidebarLayout } from './ui/sidebar-layout';
import LayoutSidebar from './sidebar/sidebar';
type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SidebarLayout navbar={undefined} sidebar={LayoutSidebar()}>
        {children}
      </SidebarLayout>
    </>
  );
};
