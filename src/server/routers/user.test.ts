/**
 * Integration test example for the `post` router
 */
import type { inferProcedureInput } from '@trpc/server';
import { createContextInner } from '../context';
import type { AppRouter } from './_app';
import { createCaller } from './_app';

test('get user information', async () => {
  const ctx = await createContextInner({});
  const caller = createCaller(ctx);

  const input: inferProcedureInput<AppRouter['users']['byId']> = {
    id: 'cm4a3olcz0000h37t2sirpgkn',
  };

  const byId = await caller.users.byId(input);

  expect(byId).toMatchObject(input);
});
