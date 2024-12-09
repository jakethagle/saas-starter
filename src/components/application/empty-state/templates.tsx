import {
  Bars4Icon,
  CalendarIcon,
  ClockIcon,
  PhotoIcon,
  TableCellsIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline';
import { Button } from '~/components/ui/button';
import { Subheading } from '~/components/ui/heading';
import { Text } from '~/components/ui/text';

const items = [
  {
    title: 'Create a Team',
    description: 'Get your team together and start collaborating.',
    icon: Bars4Icon,
    background: 'bg-pink-500',
  },
  {
    title: 'Invite Teammates',
    description: 'Start collaborating with your team.',
    icon: CalendarIcon,
    background: 'bg-yellow-500',
  },
  {
    title: 'Create a Post',
    description: 'Share updates with your team and get feedback.',
    icon: PhotoIcon,
    background: 'bg-green-500',
  },
  {
    title: 'Manage Tasks',
    description: 'Track tasks in different stages of your project.',
    icon: ViewColumnsIcon,
    background: 'bg-blue-500',
  },
  {
    title: 'Connect Integrations',
    description: 'Automate your workflow with third-party services.',
    icon: TableCellsIcon,
    background: 'bg-indigo-500',
  },
  {
    title: 'Setup Your Profile',
    description: 'Add your profile picture and update your settings.',
    icon: ClockIcon,
    background: 'bg-purple-500',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Template() {
  return (
    <div>
      <Subheading className="">Getting Started</Subheading>
      <Subheading muted>
        Get started by inviting teamates, setting up your account, or start
        creating new records.
      </Subheading>
      <ul role="list" className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2">
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="flow-root">
            <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50 dark:hover:bg-white/10">
              <div
                className={classNames(
                  item.background,
                  'flex size-16 shrink-0 items-center justify-center rounded-lg',
                )}
              >
                <item.icon aria-hidden="true" className="size-6 text-white" />
              </div>
              <div>
                <Subheading>
                  <a href="#" className="focus:outline-none">
                    <span aria-hidden="true" className="absolute inset-0" />
                    <span>{item.title}</span>
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </Subheading>
                <Text className="mt-1 text-base/7 sm:text-sm/6 font-normal dark:text-white/50">
                  {item.description}
                </Text>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex">
        <Button plain href="#" className="">
          Or start from an empty project
          <span aria-hidden="true"> &rarr;</span>
        </Button>
      </div>
    </div>
  );
}
