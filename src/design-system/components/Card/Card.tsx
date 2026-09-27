import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { card, type CardVariants } from './Card.css';

export type CardProps = HTMLAttributes<HTMLElement> &
  CardVariants & {
    as?: 'div' | 'section' | 'article' | 'aside' | 'li';
  };

/** 흰 배경 카드예요. 회색 페이지 위에 내용을 묶을 때 써요. */
function Card({
  as: Component = 'div',
  padding,
  radius,
  bordered,
  elevated,
  className,
  ...rest
}: CardProps) {
  return (
    <Component
      {...rest}
      className={clsx(card({ padding, radius, bordered, elevated }), className)}
    />
  );
}

export default Card;
