import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  item,
  root,
  type SegmentedControlVariants,
} from './SegmentedControl.css';

export type SegmentedOption<V extends string> = {
  value: V;
  label: ReactNode;
};

export type SegmentedControlProps<V extends string> =
  SegmentedControlVariants & {
    /** 묶음 이름 (예: 정렬) */
    'aria-label': string;
    options: readonly SegmentedOption<V>[];
    value: V;
    onValueChange: (value: V) => void;
    className?: string;
  };

/**
 * 정렬처럼 여러 개 중 하나를 고르는 버튼 묶음이에요.
 * 화살표 키로 옮겨 다닐 수 있고, 선택된 항목을 다시 눌러도 해제되지 않아요.
 */
function SegmentedControl<V extends string>({
  options,
  value,
  onValueChange,
  size,
  on,
  fullWidth,
  className,
  'aria-label': ariaLabel,
}: SegmentedControlProps<V>) {
  return (
    <ToggleGroup
      aria-label={ariaLabel}
      value={[value]}
      onValueChange={(next) => {
        if (next[0] !== undefined) onValueChange(next[0] as V);
      }}
      className={clsx(root({ size, on, fullWidth }), className)}
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          value={option.value}
          className={item({ size })}
        >
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

export default SegmentedControl;
