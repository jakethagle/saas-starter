import clsx from 'clsx';

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  muted?: boolean;
} & React.ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;

export function Heading({
  className,
  level = 1,
  muted = false,
  ...props
}: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={clsx(
        className,
        'text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white',
        muted ? 'opacity-50' : '',
      )}
    />
  );
}

export function Subheading({
  className,
  level = 2,
  muted = false,
  ...props
}: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={clsx(
        className,
        'text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white',
        muted ? 'opacity-50' : '',
      )}
    />
  );
}
