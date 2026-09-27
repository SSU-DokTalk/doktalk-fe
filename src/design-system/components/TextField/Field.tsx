import type { ReactNode } from 'react';
import { visuallyHidden } from '../../styles/utils.css';
import * as s from './TextField.css';

/** 입력칸 공통 props (TextField·Textarea·Select) */
export type FieldProps = {
  label: ReactNode;
  /** 검색창처럼 라벨을 화면에 안 보이게 할 때. 스크린 리더는 계속 읽어요. */
  hideLabel?: boolean;
  /** 라벨 옆 표시 (예: 필수) */
  labelSuffix?: ReactNode;
  helperText?: ReactNode;
  /** 값이 있으면 오류 상태로 바뀌고 도움말 대신 보여줘요. */
  error?: ReactNode;
};

export function FieldLabel({
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

export function FieldMessage({
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
