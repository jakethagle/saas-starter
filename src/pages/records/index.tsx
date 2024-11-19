import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from '../_app';
import { Heading, Subheading } from '~/components/ui/heading';
import { Divider } from '~/components/ui/divider';

import RecordTable from '~/features/records/table';
import AddRecordButton from '~/features/records/add-button';

const IndexPage: NextPageWithLayout = () => {
  const postQuery = trpc.post.list.useQuery({ limit: 10 });

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <Heading>Records</Heading>
        <AddRecordButton />
      </div>

      <Divider className="my-10 mt-6" />
      <section className="items-start gap-y-2 w-full">
        <div className="flex flex-row justify-between">
          <Subheading>
            All Records {postQuery.status === 'pending' && '(loading)'}
          </Subheading>
        </div>

        <RecordTable records={postQuery.data} />
      </section>
    </div>
  );
};

export default IndexPage;
