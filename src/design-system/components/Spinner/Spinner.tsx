import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { visuallyHidden } from '../../styles/utils.css';
import {
  labelText,
  spinner,
  status,
  type SpinnerVariants,
} from './Spinner.css';

export type SpinnerProps = SpinnerVariants &
  HTMLAttributes<HTMLSpanElement> & {
    /**
     * 스크린 리더가 읽을 문구예요. 없으면 장식으로 취급해서 읽지 않아요.
     * 버튼 안에서 쓸 때는 버튼에 aria-busy를 주고 label은 비워 두세요.
     */
    label?: string;
    /** label을 화면에도 보여줘요 (목록 아래 "로딩 중..." 같은 곳) */
    showLabel?: boolean;
  };

function Spinner({
  size,
  tone,
  label,
  showLabel = false,
  className,
  ...rest
}: SpinnerProps) {
  if (!label) {
    return (
      <span
        aria-hidden='true'
        className={clsx(spinner({ size, tone }), className)}
        {...rest}
      />
    );
  }

  return (
    <span role='status' className={clsx(status, className)} {...rest}>
      <span aria-hidden='true' className={spinner({ size, tone })} />
      <span className={showLabel ? labelText : visuallyHidden}>{label}</span>
    </span>
  );
}

export default Spinner;
