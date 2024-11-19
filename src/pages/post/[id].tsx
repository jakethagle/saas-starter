import {
  CalendarIcon,
  ChevronLeftIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Heading, Subheading } from '~/components/ui/heading';
import { Link } from '~/components/ui/link';
import { Code, Text } from '~/components/ui/text';
import { EditButton } from '~/features/records/edit-button';

import type { NextPageWithLayout } from '~/pages/_app';
import type { RouterOutput } from '~/utils/trpc';
import { trpc } from '~/utils/trpc';

type PostByIdOutput = RouterOutput['post']['byId'];

function PostItem(props: { post: PostByIdOutput }) {
  const { post } = props;
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex items-center gap-4">
        <Heading>{post.title}</Heading>
        <Badge color="lime">{'New'}</Badge>
      </div>

      <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
        <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
          <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
            <UserCircleIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
            <span>FrostyDog</span>
          </span>
          <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
            <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
            <span>{post.updatedAt.toLocaleDateString('en-us')}</span>
          </span>
        </div>
        <div className="flex gap-4">
          <Button plain>
            <TrashIcon></TrashIcon>
          </Button>
          <EditButton post={post}>Edit</EditButton>
        </div>
      </div>

      <Text className="py-4 break-all ">{post.text}</Text>

      <Subheading className="text-2xl/10" level={3}>
        Raw data:
      </Subheading>
      <Code className="overflow-x-scroll max-w-xl text-wrap">
        {JSON.stringify(post, null, 2)}
      </Code>
    </div>
  );
}

const PostViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const postQuery = trpc.post.byId.useQuery({ id });

  if (postQuery.error) {
    return (
      <NextError
        title={postQuery.error.message}
        statusCode={postQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (postQuery.status !== 'success') {
    return (
      <div className="flex flex-col justify-center h-full px-8 ">
        <div className="w-full bg-zinc-900/70 rounded-md h-10 animate-pulse mb-2"></div>
        <div className="w-2/6 bg-zinc-900/70 rounded-md h-5 animate-pulse mb-8"></div>

        <div className="w-full bg-zinc-900/70 rounded-md h-40 animate-pulse"></div>
      </div>
    );
  }
  const { data } = postQuery;
  return (
    <div className="">
      <div className="">
        <Link
          href="/records"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Posts
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        {/* <Heading>Post</Heading> */}
        {/* <Divider className="my-10 mt-6" /> */}
        <PostItem post={data} />
      </div>
    </div>
  );
};

export default PostViewPage;
