import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { SegmentedControl, TextField } from '@/design-system';
import { CategoryField } from '@/shared/components/CategoryField';
import * as form from '@/shared/components/Form.css';
import {
  EARLIEST_BIRTHDATE,
  latestBirthdate,
  type BirthdateError,
  type Gender,
  type ProfileExtras,
} from '../signup';
import * as s from './ProfileExtrasFields.css';

type GenderChoice = Gender | 'NONE';

/**
 * 가입할 때 고르는 추가 정보: 생년월일·성별·관심 분야. 모두 선택이에요.
 * 생년월일은 만 14세가 되는 날까지만 고를 수 있어요 (필수 동의 '만 14세 이상'과 맞춰요).
 */
export function ProfileExtrasFields({
  value,
  onChange,
  birthdateError,
}: {
  value: ProfileExtras;
  onChange: (next: ProfileExtras) => void;
  birthdateError?: BirthdateError | null;
}) {
  const { t } = useTranslation();
  const titleId = useId();
  const hintId = useId();
  const set = <K extends keyof ProfileExtras>(key: K, next: ProfileExtras[K]) =>
    onChange({ ...value, [key]: next });

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={hintId}
      className={s.section}
    >
      <div className={s.heading}>
        <h2 id={titleId} className={s.title}>
          {t('page.auth.extras.title')}
        </h2>
        <p id={hintId} className={form.hint}>
          {t('page.auth.extras.hint')}
        </p>
      </div>

      <TextField
        label={t('page.auth.extras.birthdate')}
        type='date'
        size='lg'
        autoComplete='bday'
        min={EARLIEST_BIRTHDATE}
        max={latestBirthdate()}
        value={value.birthdate}
        error={
          birthdateError
            ? t(`page.auth.extras.birthdate-${birthdateError}`)
            : undefined
        }
        onChange={(event) => set('birthdate', event.target.value)}
      />

      <div className={form.group}>
        <span className={form.label}>{t('page.auth.extras.gender')}</span>
        <SegmentedControl<GenderChoice>
          aria-label={t('page.auth.extras.gender')}
          options={[
            { value: 'MALE', label: t('page.auth.extras.gender-male') },
            { value: 'FEMALE', label: t('page.auth.extras.gender-female') },
            { value: 'NONE', label: t('page.auth.extras.gender-none') },
          ]}
          value={value.gender || 'NONE'}
          onValueChange={(gender) =>
            set('gender', gender === 'NONE' ? '' : gender)
          }
          className={s.gender}
        />
      </div>

      <CategoryField
        label={t('page.auth.extras.interests')}
        hint={t('page.auth.extras.interests-hint')}
        value={value.interests}
        onChange={(interests) => set('interests', interests)}
      />
    </section>
  );
}
