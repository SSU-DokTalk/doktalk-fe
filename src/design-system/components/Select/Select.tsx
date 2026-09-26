import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { FieldLabel, FieldMessage, type FieldProps } from '../TextField/Field';
import {
  control as fieldControl,
  field,
  type ControlVariants,
} from '../TextField/TextField.css';
import * as s from './Select.css';

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> &
  FieldProps &
  Pick<ControlVariants, 'size' | 'variant'> & {
    fieldClassName?: string;
  };

/**
 * 목록에서 하나를 고르는 선택 상자예요. 브라우저 기본 select라서
 * 모바일에서는 OS 선택 화면이 뜨고, 키보드·스크린 리더도 그대로 동작해요.
 *
 * ```tsx
 * <Select label='검색 기준' hideLabel value={by} onChange={(e) => setBy(e.target.value)}>
 *   <option value='bt'>도서 제목</option>
 * </Select>
 * ```
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    id,
    label,
    hideLabel,
    labelSuffix,
    helperText,
    error,
    size,
    variant,
    disabled,
    className,
    fieldClassName,
    children,
    'aria-describedby': describedBy,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = `${selectId}-message`;
  const hasMessage = Boolean(error || helperText);

  return (
    <div className={clsx(field, fieldClassName)}>
      <FieldLabel
        htmlFor={selectId}
        label={label}
        hideLabel={hideLabel}
        labelSuffix={labelSuffix}
      />
      <div
        className={clsx(fieldControl({ size, variant }), s.control, className)}
        data-invalid={error ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
      >
        <select
          {...rest}
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            clsx(describedBy, hasMessage && messageId) || undefined
          }
          className={s.select}
        >
          {children}
        </select>
        <ChevronDown aria-hidden='true' className={s.chevron} />
      </div>
      <FieldMessage id={messageId} error={error} helperText={helperText} />
    </div>
  );
});

export default Select;
