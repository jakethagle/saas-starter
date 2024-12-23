/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for user.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultuserSelect = {
  id: true,
  accounts: true,
  email: true,
  name: true,
  sessions: true,
  emailVerified: true,
  tenants: { include: { tenant: true } },
} satisfies Prisma.UserSelect;

export const userRouter = router({
  //   list: publicProcedure
  //     .input(
  //       z.object({
  //         limit: z.number().min(1).max(100).nullish(),
  //         tenantId: z.string().nullish(),
  //         cursor: z.string().nullish(),
  //       }),
  //     )
  //     .query(async ({ input }) => {
  //       /**
  //        * For pagination docs you can have a look here
  //        * @see https://trpc.io/docs/v11/useInfiniteQuery
  //        * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
  //        */

  //       const limit = input.limit ?? 50;
  //       const { cursor, id } = input;

  //       const items = await prisma.user.findMany({
  //         select: defaultuserSelect,
  //         // get an extra item at the end which we'll use as next cursor
  //         take: limit + 1,
  //         where: {},
  //         cursor: cursor
  //           ? {
  //               id: id ? id : cursor,
  //             }
  //           : undefined,
  //         orderBy: {
  //           createdAt: 'desc',
  //         },
  //       });
  //       // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  //       let nextCursor: typeof cursor | undefined = undefined;
  //       if (items.length > limit) {
  //         // Remove the last item and use it as next cursor

  //         const nextItem = items.pop()!;
  //         nextCursor = nextItem.id;
  //       }

  //       return {
  //         items: items.reverse(),
  //         nextCursor,
  //       };
  //     }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const user = await prisma.user.findUnique({
        where: { id },
        select: defaultuserSelect,
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }
      return user;
    }),
});
