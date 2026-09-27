import { Lock } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TextField, Textarea, visuallyHidden } from '@/design-system';
import { BookPicker } from '@/features/book/components/BookPicker';
import { CategoryField } from '@/shared/components/CategoryField';
import { FileAttachments } from '@/shared/components/FileAttachments';
import * as s from '@/shared/components/Form.css';
import { PriceField } from '@/shared/components/PriceField';
import { focusFirstInvalid } from '@/shared/draft';
import { useLeaveGuard } from '@/shared/hooks/useLeaveGuard';
import {
  SUMMARY_TITLE_MAX,
  validateSummaryForm,
  type SummaryFormErrors,
  type SummaryFormField,
  type SummaryFormValues,
} from '../form';

const ERROR_FIELD: Partial<Record<keyof SummaryFormValues, SummaryFormField>> =
  {
    title: 'title',
    book: 'book',
    category: 'category',
    freeContent: 'freeContent',
    chargedContent: 'chargedContent',
    price: 'price',
  };

export type SummaryFormProps = {
  mode: 'create' | 'edit';
  initialValues: SummaryFormValues;
  onSubmit: (values: SummaryFormValues, files: File[]) => Promise<void>;
  submitting: boolean;
  submitError?: string | null;
  onSaveDraft?: (values: SummaryFormValues) => boolean;
  /** 폼 위 안내 (임시 저장 불러옴) */
  notice?: ReactNode;
  /** 유료 내용 칸 위 안내 (수정할 때 유료 내용을 못 불러온 경우) */
  chargedNotice?: ReactNode;
  /** 무료여도 유료 내용을 꼭 입력하게 해요 (기존 내용을 못 불러왔을 때) */
  requireCharged?: boolean;
  cancelAction?: ReactNode;
};

/** 요약 쓰기·수정 폼 */
export function SummaryForm({
  mode,
  initialValues,
  onSubmit,
  submitting,
  submitError,
  onSaveDraft,
  notice,
  chargedNotice,
  requireCharged = false,
  cancelAction,
}: SummaryFormProps) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<SummaryFormErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    setValues(initialValues);
    setFiles([]);
    setErrors({});
  }, [initialValues]);

  const dirty = useMemo(
    () =>
      files.length > 0 ||
      JSON.stringify(values) !== JSON.stringify(initialValues),
    [values, files, initialValues]
  );
  useLeaveGuard(dirty && !submitting);

  useEffect(() => {
    if (!draftSaved) return;
    const timer = window.setTimeout(() => setDraftSaved(false), 2400);
    return () => window.clearTimeout(timer);
  }, [draftSaved]);

  const update = <K extends keyof SummaryFormValues>(
    key: K,
    value: SummaryFormValues[K]
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    // 무료로 바꾸면 가격·유료 내용 오류가 함께 사라져요.
    const fields: (SummaryFormField | undefined)[] =
      key === 'free' ? ['price', 'chargedContent'] : [ERROR_FIELD[key]];
    setErrors((current) => {
      if (!fields.some((name) => name && current[name])) return current;
      const next = { ...current };
      for (const name of fields) if (name) delete next[name];
      return next;
    });
  };

  const errorText = (field: SummaryFormField) => {
    const error = errors[field];
    return error ? t(error.key, error.values) : undefined;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateSummaryForm(values, { requireCharged });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setShowSummary(true);
      focusFirstInvalid(formRef.current, summaryRef.current);
      return;
    }
    setShowSummary(false);
    await onSubmit(values, files);
  };

  return (
    <form ref={formRef} noValidate className={s.form} onSubmit={handleSubmit}>
      {notice}
      {showSummary && Object.keys(errors).length > 0 && (
        <p ref={summaryRef} role='alert' tabIndex={-1} className={s.alert}>
          {t('component.form.summary')}
        </p>
      )}

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>
          {t('page.create-summary.section.basic')}
        </legend>
        <TextField
          label={t('page.create-summary.input.title-label')}
          placeholder={t('page.create-summary.input.title-placeholder')}
          value={values.title}
          maxLength={SUMMARY_TITLE_MAX}
          error={errorText('title')}
          onChange={(event) => update('title', event.target.value)}
        />
        <BookPicker
          label={t('page.create-summary.input.book-select')}
          placeholder={t('component.topnav.search-bar.placeholder')}
          value={values.book}
          error={errorText('book')}
          onChange={(book) => update('book', book)}
        />
        <CategoryField
          label={t('page.create-summary.input.category')}
          hint={t('page.create-summary.input.category-hint')}
          value={values.category}
          error={errorText('category')}
          onChange={(category) => update('category', category)}
        />
      </fieldset>

      <hr className={s.divider} />

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>
          {t('page.create-summary.section.content')}
        </legend>
        <Textarea
          label={t('page.create-summary.input.free-label')}
          helperText={t('page.create-summary.input.free-hint')}
          placeholder={t('page.create-summary.input.free-content-placeholder')}
          rows={8}
          value={values.freeContent}
          error={errorText('freeContent')}
          onChange={(event) => update('freeContent', event.target.value)}
        />
        <div className={s.paywallDivider} aria-hidden='true'>
          <span className={s.paywallDividerLabel}>
            <Lock />
            {t('page.create-summary.input.paywall-divider')}
          </span>
        </div>
        {chargedNotice}
        <Textarea
          label={t('page.create-summary.input.charged-label')}
          helperText={t('page.create-summary.input.charged-hint')}
          placeholder={t(
            'page.create-summary.input.charged-content-placeholder'
          )}
          rows={12}
          value={values.chargedContent}
          error={errorText('chargedContent')}
          onChange={(event) => update('chargedContent', event.target.value)}
        />
      </fieldset>

      <hr className={s.divider} />

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>
          {t('page.create-summary.section.sale')}
        </legend>
        <div className={s.twoColumns}>
          <PriceField
            label={t('page.create-summary.input.price')}
            unit={t('page.create-summary.input.price-unit')}
            freeLabel={t('page.create-summary.input.free')}
            price={values.price}
            free={values.free}
            error={errorText('price')}
            onPriceChange={(price) => update('price', price)}
            onFreeChange={(free) => update('free', free)}
          />
        </div>
        <FileAttachments
          existing={values.existingFiles}
          onExistingChange={(existingFiles) =>
            update('existingFiles', existingFiles)
          }
          files={files}
          onFilesChange={setFiles}
        />
      </fieldset>

      {submitError && (
        <p role='alert' className={s.alert}>
          {submitError}
        </p>
      )}

      <div className={s.actions}>
        {onSaveDraft && (
          <Button
            variant='secondary'
            size='lg'
            disabled={submitting}
            onClick={() => setDraftSaved(onSaveDraft(values))}
          >
            {t('page.create-summary.button.temp-save')}
          </Button>
        )}
        {cancelAction}
        <Button type='submit' size='lg' loading={submitting}>
          {mode === 'create'
            ? t('page.create-summary.button.submit')
            : t('page.update-summary.button.submit')}
        </Button>
      </div>
      <span role='status' className={visuallyHidden}>
        {draftSaved ? t('component.draft.saved') : ''}
      </span>
    </form>
  );
}
