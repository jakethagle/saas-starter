import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from '~/components/ui/dialog';
import { useState } from 'react';
import AddRecordForm, { validationSchema } from './form';
import { SubmitButton, useZodForm } from '~/components/form';
import { trpc } from '~/utils/trpc';

function RecordDialog() {
  let [isOpen, setIsOpen] = useState(false);
  const form = useZodForm({
    schema: validationSchema,
    defaultValues: {
      title: '',
      text: '',
    },
  });
  const utils = trpc.useUtils().post;

  const mutation = trpc.post.add.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
      setIsOpen(false);
    },
  });
  async function handleSubmit(values: { title: string; text: string }) {
    await mutation.mutateAsync(values);
  }

  return (
    <>
      <Button plain type="button" onClick={() => setIsOpen(true)}>
        Add Record
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Record</DialogTitle>
        <DialogBody>
          <AddRecordForm form={form} handleSubmit={handleSubmit} />
        </DialogBody>
        <DialogActions>
          <SubmitButton form={form}>Add Record</SubmitButton>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default RecordDialog;
