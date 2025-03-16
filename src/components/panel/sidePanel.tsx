export function LeftPanel({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={'left-panel hidden w-72! flex-none md:block ' + className}
    >
      {children}
    </div>
  );
}

export function MiddlePanel({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={
        'middle-panel container px-4! mx-auto! min-w-0 w-full block ' +
        className
      }
    >
      {children}
    </div>
  );
}

export function RightPanel({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={
        'right-panel hidden w-14! flex-none md:block lg:w-72! xl:w-96! ' +
        className
      }
    >
      <div className='hidden lg:block'>{children}</div>
    </div>
  );
}
