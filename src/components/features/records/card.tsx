import Link from 'next/link';
import { Post } from '~/components/types';
import { Avatar } from '~/components/ui/avatar';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article
      key={post.id}
      className="relative flex items-center space-x-3 rounded-lg border  border-white/75  dark:border-zinc-800/75 p-4 w-full dark:text-white dark:active:bg-white/10 dark:hover:bg-white/10"
    >
      <Avatar
        initials={post.title[0]}
        src={''}
        className="size-10 rounded-full"
      />
      <div className="min-w-0 flex-1">
        <Link href={`/post/${post.id}`} className="focus:outline-none">
          <span aria-hidden="true" className="absolute inset-0" />
          <p className="text-sm font-medium ">{post.title}</p>
          <p className="truncate text-sm ">{post.text}</p>
        </Link>
      </div>
    </article>
  );
}
