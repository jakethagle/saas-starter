import { Form, UseZodForm } from '~/components/application/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Text } from '~/components/ui/text';
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from '~/components/ui/fieldset';
import { z } from 'zod';
import { SubmitHandler } from 'react-hook-form';
export const validationSchema = z.object({
  title: z.string().min(2),
  text: z.string().min(5),
});

function AddRecordForm({
  form,
  handleSubmit,
}: {
  form: UseZodForm<{ title: string; text: string }>;
  handleSubmit: SubmitHandler<{
    title: string;
    text: string;
  }>;
}) {
  return (
    <>
      <Form form={form} handleSubmit={handleSubmit}>
        <Fieldset className="pt-4">
          <Legend>Record Details</Legend>
          <Text>Provide the subject and details of your new record.</Text>
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
      </Form>
    </>
  );
}

export default AddRecordForm;
