import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, ChipGroup } from '@/design-system';
import { CATEGORY_OPTIONS } from '@/shared/categories';
import * as s from './Form.css';

type CategoryFieldProps = {
  label: string;
  hint: string;
  /** 카테고리 비트마스크 */
  value: number;
  onChange: (mask: number) => void;
  error?: string;
};

/** 여러 개 고르는 카테고리 칩. 오류가 있으면 첫 칩으로 포커스가 가요. */
export function CategoryField({
  label,
  hint,
  value,
  onChange,
  error,
}: CategoryFieldProps) {
  const { t } = useTranslation();
  const labelId = useId();
  const hintId = useId();
  const errorId = useId();

  return (
    <div className={s.group}>
      <span id={labelId} className={s.label}>
        {label}
      </span>
      <p id={hintId} className={s.hint}>
        {hint}
      </p>
      <ChipGroup
        aria-label={label}
        aria-labelledby={labelId}
        aria-describedby={[hintId, error && errorId].filter(Boolean).join(' ')}
      >
        {CATEGORY_OPTIONS.map((option, index) => (
          <Chip
            key={option.key}
            size='md'
            selection='multi'
            pressed={(value & option.value) !== 0}
            data-invalid-focus={error && index === 0 ? '' : undefined}
            onPressedChange={(pressed) =>
              onChange(pressed ? value | option.value : value & ~option.value)
            }
          >
            {t(option.labelKey)}
          </Chip>
        ))}
      </ChipGroup>
      {error && (
        <p id={errorId} className={s.error}>
          {error}
        </p>
      )}
    </div>
  );
}
