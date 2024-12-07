import { RouterOutput } from '~/utils/trpc';

export type Post = RouterOutput['post']['list']['items'][0];
