import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from '../_app';
import { Heading, Subheading } from '~/components/ui/heading';
import { Divider } from '~/components/ui/divider';

import RecordTable from '~/components/features/records/table';
import AddRecordButton from '~/components/features/records/add-button';
import { Fragment } from 'react';
import PostCard from '~/components/features/records/card';

const IndexPage: NextPageWithLayout = () => {
  const postQuery = trpc.post.list.useInfiniteQuery(
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
    <div className="w-full">
      <div className="flex flex-col lg:flex-row justify-between lg:items-end">
        <Heading>Records</Heading>
        <AddRecordButton />
      </div>
      <Divider className="mt-6" />
      <div className="flex flex-col gap-y-8 py-8 h-full">
        <section className="flex flex-col items-start gap-y-4">
          <div className="flex flex-row w-full justify-between">
            <Subheading>
              Recently Viewed {postQuery.status === 'pending' && '(loading)'}
            </Subheading>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
            {postQuery.data?.pages.map((page, index) => (
              <Fragment>
                {page.items.map((item) => (
                  <PostCard key={page.items[0]?.id || index} post={item} />
                ))}
              </Fragment>
            ))}
          </div>
        </section>

        <section className="items-start w-full">
          <div className="flex flex-row justify-between">
            <Subheading>
              All Records {postQuery.status === 'pending' && '(loading)'}
            </Subheading>
          </div>
          <RecordTable records={postQuery.data?.pages[0]} />
        </section>
      </div>
    </div>
  );
};

export default IndexPage;
