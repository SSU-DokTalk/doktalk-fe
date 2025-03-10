export function LeftPanel({
  children,
  className = '',
}: {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className={'left-panel hidden w-72! flex-none md:block ' + className}>
      {children}
    </div>
  );
}

export function MiddlePanel({
  children,
  className = '',
}: {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className={'middle-panel min-w-0 w-full block ' + className}>
      {children}
    </div>
  );
}

export function RightPanel({
  children,
  className = '',
}: {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className={'right-panel hidden w-72! flex-none lg:block ' + className}>
      {children}
    </div>
  );
}
