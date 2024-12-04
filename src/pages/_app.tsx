import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

import { DefaultLayout } from '~/components/default-layout';
import { trpc } from '~/utils/trpc';
import '~/styles/globals.css';
import { SessionProvider } from 'next-auth/react';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type ProviderProps = ComponentProps<'div'> & {
  session: any;
};
const Providers = (props: ProviderProps) => {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <Providers {...pageProps}>
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
