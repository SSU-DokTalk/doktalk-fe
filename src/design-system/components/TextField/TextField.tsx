import clsx from 'clsx';
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { FieldLabel, FieldMessage, type FieldProps } from './Field';
import * as s from './TextField.css';

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  FieldProps &
  Pick<s.ControlVariants, 'size' | 'variant' | 'shape'> & {
    startIcon?: ReactNode;
    /** 입력칸 오른쪽 끝에 붙는 버튼 (비밀번호 보기, 지우기) */
    endSlot?: ReactNode;
    fieldClassName?: string;
  };

function useFieldIds(id: string | undefined) {
  const generated = useId();
  const inputId = id ?? generated;
  return { inputId, messageId: `${inputId}-message` };
}

/** 라벨, 입력칸, 도움말·오류 문구를 한 번에 묶은 입력 필드예요. */
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      id,
      label,
      hideLabel,
      labelSuffix,
      helperText,
      error,
      size,
      variant,
      shape,
      startIcon,
      endSlot,
      disabled,
      className,
      fieldClassName,
      'aria-describedby': describedBy,
      ...rest
    },
    ref
  ) {
    const { inputId, messageId } = useFieldIds(id);
    const hasMessage = Boolean(error || helperText);

    return (
      <div className={clsx(s.field, fieldClassName)}>
        <FieldLabel
          htmlFor={inputId}
          label={label}
          hideLabel={hideLabel}
          labelSuffix={labelSuffix}
        />
        <div
          className={clsx(
            s.control({ size, variant, shape, hasEnd: Boolean(endSlot) }),
            className
          )}
          data-invalid={error ? '' : undefined}
          data-disabled={disabled ? '' : undefined}
        >
          {startIcon}
          <input
            {...rest}
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              clsx(describedBy, hasMessage && messageId) || undefined
            }
            className={s.input}
          />
          {endSlot}
        </div>
        <FieldMessage id={messageId} error={error} helperText={helperText} />
      </div>
    );
  }
);

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldProps & {
    fieldClassName?: string;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      id,
      label,
      hideLabel,
      labelSuffix,
      helperText,
      error,
      disabled,
      className,
      fieldClassName,
      'aria-describedby': describedBy,
      ...rest
    },
    ref
  ) {
    const { inputId, messageId } = useFieldIds(id);
    const hasMessage = Boolean(error || helperText);

    return (
      <div className={clsx(s.field, fieldClassName)}>
        <FieldLabel
          htmlFor={inputId}
          label={label}
          hideLabel={hideLabel}
          labelSuffix={labelSuffix}
        />
        <div
          className={clsx(s.textareaControl, className)}
          data-invalid={error ? '' : undefined}
          data-disabled={disabled ? '' : undefined}
        >
          <textarea
            {...rest}
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              clsx(describedBy, hasMessage && messageId) || undefined
            }
            className={s.textarea}
          />
        </div>
        <FieldMessage id={messageId} error={error} helperText={helperText} />
      </div>
    );
  }
);

export default TextField;
