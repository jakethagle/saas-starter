/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from '../trpc';
import { postRouter } from './post';
import { userRouter } from './user';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  users: userRouter,
  post: postRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
