import clsx from 'clsx';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import Spinner from '../Spinner/Spinner';
import { buttonStyles, type ButtonVariants } from './Button.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    /** 처리 중이면 스피너를 보여주고 클릭을 막아요. 색은 그대로 두어요. */
    loading?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
  };

/**
 * 기본 버튼이에요.
 * 링크를 버튼처럼 보이게 하려면 `buttonStyles()`를 `<Link className>`에 넘기세요.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    fullWidth,
    wrap,
    loading = false,
    startIcon,
    endIcon,
    type = 'button',
    className,
    children,
    onClick,
    'aria-disabled': ariaDisabled,
    ...rest
  },
  ref
) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const spinnerTone =
    variant === undefined || variant === 'primary' ? 'onBrand' : 'current';

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={clsx(
        buttonStyles({ variant, size, fullWidth, wrap }),
        className
      )}
      aria-busy={loading || undefined}
      aria-disabled={loading || ariaDisabled || undefined}
      data-loading={loading ? '' : undefined}
      onClick={handleClick}
    >
      {loading ? <Spinner size='sm' tone={spinnerTone} /> : startIcon}
      {children}
      {!loading && endIcon}
    </button>
  );
});

export default Button;
