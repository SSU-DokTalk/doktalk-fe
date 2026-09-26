import clsx from 'clsx';
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { visuallyHidden } from '../../styles/utils.css';
import * as s from './TextField.css';

type FieldProps = {
  label: ReactNode;
  /** 검색창처럼 라벨을 화면에 안 보이게 할 때. 스크린 리더는 계속 읽어요. */
  hideLabel?: boolean;
  /** 라벨 옆 표시 (예: 필수) */
  labelSuffix?: ReactNode;
  helperText?: ReactNode;
  /** 값이 있으면 오류 상태로 바뀌고 도움말 대신 보여줘요. */
  error?: ReactNode;
};

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  FieldProps &
  Pick<s.ControlVariants, 'size' | 'variant'> & {
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

function FieldLabel({
  htmlFor,
  label,
  hideLabel,
  labelSuffix,
}: {
  htmlFor: string;
  label: ReactNode;
  hideLabel?: boolean;
  labelSuffix?: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={hideLabel ? visuallyHidden : s.label}>
      {label}
      {/* 스크린 리더가 "닉네임필수"처럼 붙여 읽지 않게 띄어 둬요 */}
      {labelSuffix ? ' ' : null}
      {labelSuffix}
    </label>
  );
}

function FieldMessage({
  id,
  error,
  helperText,
}: {
  id: string;
  error?: ReactNode;
  helperText?: ReactNode;
}) {
  if (error) {
    return (
      <p id={id} className={s.error}>
        {error}
      </p>
    );
  }
  if (helperText) {
    return (
      <p id={id} className={s.helper}>
        {helperText}
      </p>
    );
  }
  return null;
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
            s.control({ size, variant, hasEnd: Boolean(endSlot) }),
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
