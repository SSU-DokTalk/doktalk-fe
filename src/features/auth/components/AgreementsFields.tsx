import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Checkbox, visuallyHidden } from '@/design-system';
import type { Agreements } from '../signup';
import * as s from './AgreementsFields.css';

type Row = {
  key: keyof Agreements;
  required: boolean;
  /** 동의하는 내용을 새 창으로 보여줘요. */
  href?: string;
};

const ROWS: Row[] = [
  { key: 'terms', required: true, href: '/terms' },
  { key: 'privacy', required: true, href: '/privacy' },
  { key: 'age14', required: true },
  { key: 'marketing', required: false, href: '/privacy#marketing' },
];

/**
 * 약관 동의 칸: 전체 동의, 필수 셋(이용약관·개인정보·만 14세 이상), 선택 하나(마케팅).
 * 이메일 가입, 소셜 가입 마무리, 예전 회원의 동의 화면이 같이 써요.
 */
export function AgreementsFields({
  value,
  onChange,
  error,
}: {
  value: Agreements;
  onChange: (next: Agreements) => void;
  /** 필수 약관을 빠뜨렸을 때 문구. 빠진 칸만 오류로 표시해요. */
  error?: string;
}) {
  const { t } = useTranslation();
  const errorId = useId();
  const allAgreed = ROWS.every((row) => value[row.key]);

  return (
    <fieldset className={s.agreements}>
      <legend className={visuallyHidden}>
        {t('page.auth.register.agreements')}
      </legend>
      <div className={s.agreeAll}>
        <Checkbox
          label={
            <span className={s.agreeAllLabel}>
              {t('page.register.form.all-agreements')}
            </span>
          }
          checked={allAgreed}
          onChange={(event) => {
            const checked = event.target.checked;
            onChange({
              terms: checked,
              privacy: checked,
              age14: checked,
              marketing: checked,
            });
          }}
        />
      </div>
      {ROWS.map((row) => {
        const invalid = Boolean(error) && row.required && !value[row.key];
        return (
          <div key={row.key} className={s.agreement}>
            <Checkbox
              label={
                <span className={s.agreementLabel}>
                  <span
                    className={row.required ? s.requiredTag : s.optionalTag}
                  >
                    {t(
                      row.required
                        ? 'page.auth.register.required-tag'
                        : 'page.auth.register.optional-tag'
                    )}
                  </span>{' '}
                  {t(`page.auth.register.${row.key}`)}
                </span>
              }
              checked={value[row.key]}
              aria-invalid={invalid ? true : undefined}
              aria-describedby={invalid ? errorId : undefined}
              onChange={(event) =>
                onChange({ ...value, [row.key]: event.target.checked })
              }
            />
            {row.href && (
              <Link to={row.href} target='_blank' className={s.viewLink}>
                <span aria-hidden='true'>{t('page.register.form.view')}</span>
                <span className={visuallyHidden}>
                  {t(`page.auth.register.view-${row.key}`)}
                </span>
              </Link>
            )}
          </div>
        );
      })}
      {error && (
        <p id={errorId} className={s.agreementError}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
