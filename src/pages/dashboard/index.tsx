import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from '../_app';
import { Fragment } from 'react';
import { Button } from '~/components/ui/button';
import { Heading, Subheading } from '~/components/ui/heading';
import { Divider } from '~/components/ui/divider';
import { RouterOutput } from '~/utils/trpc';
import { Avatar } from '~/components/ui/avatar';
import { Link } from '~/components/ui/link';
import Template from '~/components/empty-state/templates';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Post = RouterOutput['post']['list']['items'][0];

function PostCard({ post }: { post: Post }) {
  return (
    <article
      key={post.id}
      className="relative flex items-center space-x-3 rounded-lg border  border-white/75  dark:border-zinc-800/75 p-4 w-full dark:text-white dark:active:bg-white/10 dark:hover:bg-white/10"
    >
      <Avatar
        initials={post.title[0]}
        src={''}
        className="size-10 rounded-full"
      />
      <div className="min-w-0 flex-1">
        <Link href={`/post/${post.id}`} className="focus:outline-none">
          <span aria-hidden="true" className="absolute inset-0" />
          <p className="text-sm font-medium ">{post.title}</p>
          <p className="truncate text-sm ">{post.text}</p>
        </Link>
      </div>
    </article>
  );
}
const IndexPage: NextPageWithLayout = () => {
  const postsQuery = trpc.post.list.useInfiniteQuery(
    {
      limit: 8,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );
  const session = useSession();
  if (session.status === 'unauthenticated') {
    redirect('/404');
  }
  return (
    <div>
      <Heading>Welcome to your SaaS Starter!</Heading>
      <Divider className="my-10 mt-6" />

      <button onClick={() => signIn('github')}>Sign In</button>
      <section className="flex flex-col py-8 items-start gap-y-2">
        <div className="flex flex-row w-full justify-between">
          <Subheading>
            Latest Posts {postsQuery.status === 'pending' && '(loading)'}
          </Subheading>
          <Button plain href={'/records'}>
            View More
          </Button>
        </div>
        <Divider soft className="mb-6" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {postsQuery.data?.pages.map((page, index) => (
            <Fragment key={page.items[0]?.id || index}>
              {page.items.map((item) => (
                <PostCard post={item} />
              ))}
            </Fragment>
          ))}
        </div>
      </section>
      <section className="my-10">
        <Template />
      </section>
    </div>
  );
};

export default IndexPage;
