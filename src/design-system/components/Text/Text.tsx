import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { clamp, text, truncate, type TextVariants } from './Text.css';

type TextOwnProps<T extends ElementType> = TextVariants & {
  /** 렌더링할 태그. 제목은 h1~h3, 본문은 p처럼 의미에 맞게 골라요. */
  as?: T;
  /** 한 줄 말줄임(1) 또는 여러 줄 제한(2 이상) */
  lines?: number;
};

export type TextProps<T extends ElementType = 'p'> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

/** 타입 스케일(display~label)을 적용하는 텍스트예요. */
function Text<T extends ElementType = 'p'>({
  as,
  variant,
  tone,
  weight,
  align,
  lines,
  className,
  style,
  ...rest
}: TextProps<T>) {
  const Component: ElementType = as ?? 'p';
  const multiLine = lines !== undefined && lines > 1;

  return (
    <Component
      {...rest}
      className={clsx(
        text({ variant, tone, weight, align }),
        lines === 1 && truncate,
        multiLine && clamp,
        className
      )}
      style={multiLine ? { WebkitLineClamp: lines, ...style } : style}
    />
  );
}

export default Text;
