import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { input } from '../Checkbox/Checkbox.css';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * 브랜드 색을 입힌 라디오 버튼이에요 (Checkbox와 같은 크기·포커스 링).
 * 라벨은 쓰는 쪽에서 `<label>`로 감싸요. 그래야 카드·목록 줄 전체를 눌러도 골라져요.
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, ...rest },
  ref
) {
  return (
    <input
      {...rest}
      ref={ref}
      type='radio'
      className={clsx(input, className)}
    />
  );
});

export default Radio;
