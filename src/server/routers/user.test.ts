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
    id: '551728f1-deb4-47d0-ac11-46a7a0bd4bd3',
  };

  const byId = await caller.users.byId(input);

  expect(byId).toMatchObject(input);
});
