import clsx from 'clsx';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { iconButtonStyles, type IconButtonVariants } from './IconButton.css';

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label' | 'children'
> &
  IconButtonVariants & {
    /** 아이콘만 있는 버튼이라 스크린 리더용 이름이 꼭 필요해요. */
    'aria-label': string;
    children: ReactNode;
  };

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant, size, shape, elevated, type = 'button', className, ...rest },
    ref
  ) {
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={clsx(
          iconButtonStyles({ variant, size, shape, elevated }),
          className
        )}
      />
    );
  }
);

export default IconButton;
