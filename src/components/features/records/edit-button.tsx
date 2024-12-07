import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '~/components/ui/dialog';
import { Field, FieldGroup, Label } from '~/components/ui/fieldset';
import { Input } from '~/components/ui/input';
import { useState } from 'react';
import { RouterOutput, trpc } from '~/utils/trpc';
import { Textarea } from '~/components/ui/textarea';
import { useZodForm, Form, SubmitButton } from '~/components/application/form';
import { validationSchema } from './form';

type Post = RouterOutput['post']['list']['items'][number];

export function EditButton({
  post,
  ...props
}: { post: Post } & React.ComponentPropsWithoutRef<typeof Button>) {
  let [isOpen, setIsOpen] = useState(false);
  const form = useZodForm({
    schema: validationSchema,
    defaultValues: post,
  });
  const editPost = trpc.post.edit.useMutation({});
  const utils = trpc.useUtils().post;
  async function handleSubmit(values: { title: string; text: string }) {
    await editPost.mutateAsync({
      data: values,
      id: post.id,
    });
    setIsOpen(false);
    utils.byId.invalidate({ id: post.id });
  }

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogDescription>Edit your post details.</DialogDescription>
        <DialogBody>
          <Form form={form} handleSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Label>Title</Label>
                <Input
                  {...form.register('title')}
                  name="title"
                  defaultValue={post.title}
                  autoFocus
                />
              </Field>
              <Field>
                <Label>Text</Label>
                <Textarea
                  {...form.register('text')}
                  name="text"
                  defaultValue={post.text}
                ></Textarea>
              </Field>
            </FieldGroup>
          </Form>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <SubmitButton form={form}>Save</SubmitButton>
          {/* <Button
            onClick={() => {
              editPost.mutateAsync({
                data: post,
                id: post.id,
              });
              setIsOpen(false);
            }}
          >
            Save
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
