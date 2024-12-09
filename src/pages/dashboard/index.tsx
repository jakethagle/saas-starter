import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from '../_app';
import { Fragment } from 'react';
import { Button } from '~/components/ui/button';
import { Heading, Subheading } from '~/components/ui/heading';
import { Divider } from '~/components/ui/divider';
import Template from '~/components/application/empty-state/templates';
import RecordCard from '~/components/features/records/card';

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

  return (
    <div>
      <Heading>Welcome to your SaaS Starter!</Heading>
      <Divider className="mt-6" />
      <section className="flex flex-col py-8 items-start">
        <div className="flex flex-row w-full justify-between">
          <Subheading>
            Pinned Records {postsQuery.status === 'pending' && '(loading)'}
          </Subheading>
          <Button plain href={'/records'}>
            View More
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {postsQuery.data?.pages.map((page, index) => (
            <Fragment>
              {page.items.map((item) => (
                <RecordCard key={page.items[0]?.id || index} post={item} />
              ))}
            </Fragment>
          ))}
        </div>
      </section>
      <section className="py-8">
        <Template />
      </section>
    </div>
  );
};

export default IndexPage;
