import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from './_app';
import { Fragment } from 'react';
import { Form, SubmitButton, useZodForm } from '~/features/form';
import { z } from 'zod';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Text, TextLink } from '~/components/ui/text';
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from '~/components/ui/fieldset';
import { Button } from '~/components/ui/button';
import { Heading } from '~/components/ui/heading';
export const validationSchema = z.object({
  title: z.string().min(2),
  text: z.string().min(5),
});

function AddPostForm() {
  const utils = trpc.useUtils().post;

  const mutation = trpc.post.add.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
    },
  });

  const form = useZodForm({
    schema: validationSchema,
    defaultValues: {
      title: '',
      text: '',
    },
  });

  return (
    <>
      <Form
        form={form}
        handleSubmit={async (values) => {
          await mutation.mutateAsync(values);
          form.reset();
        }}
      >
        <Fieldset className="pt-4">
          <Legend>Post Details</Legend>
          <Text>Provide the subject and details of your post.</Text>
          <FieldGroup className="">
            <Field>
              <Label>Title</Label>
              <Input {...form.register('title')} />
              <ErrorMessage>
                {form.formState.errors.title?.message}
              </ErrorMessage>
            </Field>
            <Field>
              <Label>Text</Label>
              <Textarea {...form.register('text')} />
              <ErrorMessage>{form.formState.errors.text?.message}</ErrorMessage>
            </Field>
          </FieldGroup>
        </Fieldset>
        {/* {form.formState.errors.title?.message && (
          <p className="text-red-700">{form.formState.errors.title?.message}</p>
        )}
        <div>
          {form.formState.errors.text?.message && (
            <p className="text-red-700">
              {form.formState.errors.text?.message}
            </p>
          )}
        </div> */}
      </Form>
      <SubmitButton
        form={form} // If you place the submit button outside of the form, you need to specify the form to submit
        // className="border bg-primary-500 text-white p-2 font-bold"
      >
        Add post
      </SubmitButton>
    </>
  );
}
const IndexPage: NextPageWithLayout = () => {
  // const utils = trpc.useUtils();
  const postsQuery = trpc.post.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <div>
      <Heading>Welcome to your SaaS Starter!</Heading>
      <div className="flex flex-col py-8 items-start gap-y-2">
        <div className="flex flex-row w-full justify-between">
          <Heading level={2}>
            Latest Posts {postsQuery.status === 'pending' && '(loading)'}
          </Heading>
          <Button
            onClick={() => postsQuery.fetchNextPage()}
            disabled={!postsQuery.hasNextPage || postsQuery.isFetchingNextPage}
          >
            {postsQuery.isFetchingNextPage
              ? 'Loading more...'
              : postsQuery.hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {postsQuery.data?.pages.map((page, index) => (
            <Fragment key={page.items[0]?.id || index}>
              {page.items.map((item) => (
                <article
                  className="col-span-1 rounded-lg shadow bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75 p-4 w-full"
                  key={item.id}
                >
                  <Heading level={3}>{item.title}</Heading>
                  <TextLink className="" href={`/post/${item.id}`}>
                    View more
                  </TextLink>
                </article>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <hr />

      <div className="flex flex-col py-8">
        <Heading level={3}>Add a Post</Heading>
        <div className="">
          <AddPostForm />
        </div>
        {/* <form
          className="py-2 w-4/6"
          onSubmit={async (e) => {
            e.preventDefault();
            const $form = e.currentTarget;
            const values = Object.fromEntries(new FormData($form));
            type Input = inferProcedureInput<AppRouter['post']['add']>;
            //    ^?
            const input: Input = {
              title: values.title as string,
              text: values.text as string,
            };
            try {
              await addPost.mutateAsync(input);

              $form.reset();
            } catch (cause) {
              console.error({ cause }, 'Failed to add post');
            }
          }}
        >
          <div className="flex flex-col gap-y-4 font-semibold">
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              disabled={addPost.isPending}
            />
            <textarea
              className="resize-none focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900"
              id="text"
              name="text"
              placeholder="Text"
              disabled={addPost.isPending}
              rows={6}
            />

            <div className="flex justify-center">
              <input
                className="cursor-pointer bg-gray-900 p-2 rounded-md px-16"
                type="submit"
                disabled={addPost.isPending}
              />
              {addPost.error && (
                <p style={{ color: 'red' }}>{addPost.error.message}</p>
              )}
            </div>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @see https://trpc.io/docs/v11/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
