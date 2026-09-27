import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import * as s from './Checkbox.css';

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'children'
> & {
  label: ReactNode;
};

/** 브라우저 기본 체크박스에 브랜드 색을 입혔어요. */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, disabled, ...rest },
  ref
) {
  return (
    <label
      className={clsx(s.root, className)}
      data-disabled={disabled ? '' : undefined}
    >
      <input
        {...rest}
        ref={ref}
        type='checkbox'
        disabled={disabled}
        className={s.input}
      />
      {label}
    </label>
  );
});

export default Checkbox;
