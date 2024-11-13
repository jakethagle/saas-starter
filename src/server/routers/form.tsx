import { validationSchema } from '~/pages';
import { router, publicProcedure } from '../trpc';

const items = [
  {
    id: '1',
    title: 'Hello tRPC',
    text: 'Hello world',
  },
];

export const formRouter = router({
  list: publicProcedure.query(async () => {
    return items;
  }),

  add: publicProcedure?.input(validationSchema).mutation(({ input }) => {
    const id = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .slice(0, 6);
    const item = {
      id,
      ...input,
    };
    items.push(item);

    return item;
  }),
});
