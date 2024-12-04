import clsx from 'clsx';

const colors = {
  red: 'bg-red-500/15 text-red-700 group-data-[hover]:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-[hover]:bg-red-500/20',
  orange:
    'bg-orange-500/15 text-orange-700 group-data-[hover]:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:group-data-[hover]:bg-orange-500/20',
  amber:
    'bg-amber-400/20 text-amber-700 group-data-[hover]:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-[hover]:bg-amber-400/15',
  yellow:
    'bg-yellow-400/20 text-yellow-700 group-data-[hover]:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-data-[hover]:bg-yellow-400/15',
  lime: 'bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15',
  green:
    'bg-green-500/15 text-green-700 group-data-[hover]:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-[hover]:bg-green-500/20',
  emerald:
    'bg-emerald-500/15 text-emerald-700 group-data-[hover]:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-[hover]:bg-emerald-500/20',
  teal: 'bg-teal-500/15 text-teal-700 group-data-[hover]:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:group-data-[hover]:bg-teal-500/20',
  cyan: 'bg-cyan-400/20 text-cyan-700 group-data-[hover]:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-data-[hover]:bg-cyan-400/15',
  sky: 'bg-sky-500/15 text-sky-700 group-data-[hover]:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-[hover]:bg-sky-500/20',
  blue: 'bg-blue-500/15 text-blue-700 group-data-[hover]:bg-blue-500/25 dark:text-blue-400 dark:group-data-[hover]:bg-blue-500/25',
  indigo:
    'bg-indigo-500/15 text-indigo-700 group-data-[hover]:bg-indigo-500/25 dark:text-indigo-400 dark:group-data-[hover]:bg-indigo-500/20',
  violet:
    'bg-violet-500/15 text-violet-700 group-data-[hover]:bg-violet-500/25 dark:text-violet-400 dark:group-data-[hover]:bg-violet-500/20',
  purple:
    'bg-purple-500/15 text-purple-700 group-data-[hover]:bg-purple-500/25 dark:text-purple-400 dark:group-data-[hover]:bg-purple-500/20',
  fuchsia:
    'bg-fuchsia-400/15 text-fuchsia-700 group-data-[hover]:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:group-data-[hover]:bg-fuchsia-400/20',
  pink: 'bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-data-[hover]:bg-pink-400/20',
  rose: 'bg-rose-400/15 text-rose-700 group-data-[hover]:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-data-[hover]:bg-rose-400/20',
  zinc: 'bg-zinc-600/10 text-zinc-700 group-data-[hover]:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-[hover]:bg-white/10',
};

type LoadingSpinnerProps = { color?: keyof typeof colors };

export function LoadingSpinner({
  color = 'zinc',
  className,
  ...props
}: LoadingSpinnerProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <svg
      className={clsx(
        `animate-spin -ml-1 mr-3 h-10 w-10 text-${color}`,
        colors[color],
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    // //<span
    //   {...props}
    //   className={clsx(
    //     className,
    //     'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
    //     colors[color]
    //   )}
    // />
  );
}
