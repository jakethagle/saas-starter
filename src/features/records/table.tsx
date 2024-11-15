import { Avatar } from '~/components/ui/avatar';
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { RouterOutput } from '~/utils/trpc';

type PostList = RouterOutput['post']['list'];

function RecordTable({ records }: { records?: PostList }) {
  return (
    <>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Text</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {records?.items.map((record) => (
            <TableRow
              key={record.id}
              href={`/post/${record.id}`}
              title={record.title}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={''} className="size-6" />
                  <span>{record.title}</span>
                </div>
              </TableCell>

              <TableCell>{record.text}</TableCell>
              <TableCell className="text-zinc-500">
                {record.createdAt.toString()}
              </TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-6">
        <PaginationPrevious />
        <PaginationList></PaginationList>
        <PaginationNext href={null} />
      </Pagination>
    </>
  );
}

export default RecordTable;
