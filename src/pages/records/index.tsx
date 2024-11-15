import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from '../_app';
import { Heading, Subheading } from '~/components/ui/heading';
import { Divider } from '~/components/ui/divider';

import RecordTable from '~/features/records/table';
import RecordDialog from '~/features/records/dialog';

const IndexPage: NextPageWithLayout = () => {
  const postQuery = trpc.post.list.useQuery(
    {},
    {
      // getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return (
    <div className="w-full">
      <Heading>Records</Heading>
      <Divider className="my-10 mt-6" />
      <section className="py-8 items-start gap-y-2 w-full">
        <div className="flex flex-row justify-between">
          <Subheading>
            All Records {postQuery.status === 'pending' && '(loading)'}
          </Subheading>
          <RecordDialog />
        </div>

        <RecordTable records={postQuery.data} />
      </section>
    </div>
  );
};

export default IndexPage;
