import NextError from 'next/error';
import { useRouter } from 'next/router';
import { Divider } from '~/components/ui/divider';
import { Heading, Subheading } from '~/components/ui/heading';
import { Code, Text, TextLink } from '~/components/ui/text';

import type { NextPageWithLayout } from '~/pages/_app';
import type { RouterOutput } from '~/utils/trpc';
import { trpc } from '~/utils/trpc';

type PostByIdOutput = RouterOutput['post']['byId'];

function PostItem(props: { post: PostByIdOutput }) {
  const { post } = props;
  return (
    <div className="flex flex-col justify-center h-full px-8">
      <div className="pb-8">
        <TextLink className="" href="/">
          Home
        </TextLink>
      </div>

      <Heading>{post.title}</Heading>
      <Subheading level={2} muted>
        Created {post.createdAt.toLocaleDateString('en-us')}
      </Subheading>
      <Divider />

      <Text className="py-4 break-all">{post.text}</Text>

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
  return <PostItem post={data} />;
};

export default PostViewPage;
