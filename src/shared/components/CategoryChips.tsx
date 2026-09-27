import { useTranslation } from 'react-i18next';
import { Chip, ChipGroup, type ChipProps } from '@/design-system';
import { CATEGORY_OPTIONS } from '@/shared/categories';

type CategoryChipsProps = {
  /** 고른 카테고리 비트마스크. 0이면 전체 */
  value: number;
  onChange: (value: number) => void;
  /** 묶음 이름 (스크린 리더) */
  label: string;
  allLabel: string;
  size?: ChipProps['size'];
  /** 줄바꿈 대신 옆으로 넘겨 봐요 (모바일) */
  scroll?: boolean;
  className?: string;
};

/** 카테고리 하나 고르기 (전체 + 9개). 다시 누르면 전체로 돌아가요. */
export function CategoryChips({
  value,
  onChange,
  label,
  allLabel,
  size,
  scroll = false,
  className,
}: CategoryChipsProps) {
  const { t } = useTranslation();
  return (
    <ChipGroup aria-label={label} scroll={scroll} className={className}>
      <Chip
        size={size}
        pressed={value === 0}
        onPressedChange={() => onChange(0)}
      >
        {allLabel}
      </Chip>
      {CATEGORY_OPTIONS.map((option) => (
        <Chip
          key={option.key}
          size={size}
          pressed={value === option.value}
          onPressedChange={(pressed) => onChange(pressed ? option.value : 0)}
        >
          {t(option.labelKey)}
        </Chip>
      ))}
    </ChipGroup>
  );
}
