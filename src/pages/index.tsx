import type { NextPageWithLayout } from './_app';
import { Button } from '~/components/ui/button';
import { Heading } from '~/components/ui/heading';
import { Divider } from '~/components/ui/divider';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '~/components/ui/loading-spinner';
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from '~/components/ui/fieldset';
import { Input } from '~/components/ui/input';
import { Text, TextLink } from '~/components/ui/text';
import { Avatar } from '~/components/ui/avatar';

const IndexPage: NextPageWithLayout = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'authenticated') {
    router.push('/dashboard');
  } else if (session.status === 'loading') {
    return (
      <div className="w-full flex flex-row justify-center py-52">
        <LoadingSpinner color="emerald"></LoadingSpinner>
      </div>
    );
  } else {
    return (
      <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-row justify-center">
            <Avatar className="h-10 w-auto" square src="/teams/catalyst.svg" />
          </div>
          <Heading level={2} className="text-2xl/9 text-center mt-10">
            Sign in to your account
          </Heading>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Label>Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </Field>
                <Field>
                  <Label>Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                  />
                  <Legend>Forgot password?</Legend>
                </Field>
              </FieldGroup>
            </Fieldset>

            <div className="flex flex-row">
              <Button className="grow" type="submit">
                Sign In
              </Button>
            </div>
          </form>
          <div>
            <div className="relative mt-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <Divider />
              </div>

              <div className="relative flex justify-center text-sm/6 font-medium">
                <div className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950 p-2">
                  <Text>Or continue with</Text>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button href="#" onClick={() => signIn('google')}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                Google
              </Button>

              <Button href="#" onClick={() => signIn('github')}>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="size-5 "
                >
                  <path
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
                GitHub
              </Button>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <Text>
            Not a member? <TextLink href="#">Get started for free</TextLink>
          </Text>
        </div>
      </>
    );
  }
};

export default IndexPage;
