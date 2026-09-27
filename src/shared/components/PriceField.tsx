import { Checkbox, TextField } from '@/design-system';
import { useFormat } from '@/shared/format';
import * as s from './Form.css';

type PriceFieldProps = {
  label: string;
  /** 원 */
  unit: string;
  /** 무료로 열기 */
  freeLabel: string;
  price: number;
  free: boolean;
  onPriceChange: (price: number) => void;
  onFreeChange: (free: boolean) => void;
  error?: string;
};

/** 가격 입력(천 단위 쉼표) + 무료 체크. 무료면 가격 칸이 잠겨요. */
export function PriceField({
  label,
  unit,
  freeLabel,
  price,
  free,
  onPriceChange,
  onFreeChange,
  error,
}: PriceFieldProps) {
  const format = useFormat();
  const text = Number.isFinite(price) ? format.number(price) : '';

  return (
    <div className={s.priceGroup}>
      <TextField
        label={label}
        inputMode='numeric'
        value={free ? '0' : text}
        disabled={free}
        error={free ? undefined : error}
        endSlot={<span className={s.unit}>{unit}</span>}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, '').slice(0, 7);
          onPriceChange(digits ? Number(digits) : Number.NaN);
        }}
      />
      <Checkbox
        label={freeLabel}
        checked={free}
        onChange={(event) => onFreeChange(event.target.checked)}
      />
    </div>
  );
}
