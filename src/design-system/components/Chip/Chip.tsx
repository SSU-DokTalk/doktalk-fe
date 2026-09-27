import clsx from 'clsx';
import { Check } from 'lucide-react';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  chipStyles,
  count as countStyle,
  group,
  groupScroll,
  type ChipVariants,
} from './Chip.css';

export type ChipProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-pressed'
> &
  ChipVariants & {
    /** 선택 여부. aria-pressed로 전달돼요. */
    pressed: boolean;
    onPressedChange?: (pressed: boolean) => void;
    /** 라벨 옆에 작게 붙는 개수 */
    count?: ReactNode;
    icon?: ReactNode;
  };

/** 필터·선택용 칩이에요. 누르면 선택 상태가 바뀌는 토글 버튼이에요. */
const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    pressed,
    onPressedChange,
    count,
    icon,
    size,
    selection,
    type = 'button',
    className,
    children,
    onClick,
    ...rest
  },
  ref
) {
  const showCheck = selection === 'multi' && pressed;

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      aria-pressed={pressed}
      className={clsx(chipStyles({ size, selection }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onPressedChange?.(!pressed);
      }}
    >
      {showCheck ? <Check strokeWidth={3} aria-hidden='true' /> : icon}
      {children}
      {count !== undefined && <span className={countStyle}>{count}</span>}
    </button>
  );
});

export type ChipGroupProps = HTMLAttributes<HTMLDivElement> & {
  /** 스크린 리더가 읽을 묶음 이름 (예: 카테고리) */
  'aria-label': string;
  /** 줄바꿈 대신 옆으로 넘겨 보기 */
  scroll?: boolean;
};

export function ChipGroup({
  scroll = false,
  className,
  ...rest
}: ChipGroupProps) {
  return (
    <div
      role='group'
      {...rest}
      className={clsx(group, scroll && groupScroll, className)}
    />
  );
}

export default Chip;
