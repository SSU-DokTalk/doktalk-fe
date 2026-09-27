import { Globe, MapPin, Minus, Plus } from 'lucide-react';
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  IconButton,
  SegmentedControl,
  TextField,
  Textarea,
  visuallyHidden,
} from '@/design-system';
import { BookPicker } from '@/features/book/components/BookPicker';
import { CategoryField } from '@/shared/components/CategoryField';
import { FileAttachments } from '@/shared/components/FileAttachments';
import { PriceField } from '@/shared/components/PriceField';
import { focusFirstInvalid } from '@/shared/draft';
import { useLeaveGuard } from '@/shared/hooks/useLeaveGuard';
import {
  LIMIT_RANGE,
  TITLE_MAX,
  toDateInput,
  validateDebateForm,
  type DebateFormErrors,
  type DebateFormField,
  type DebateFormValues,
} from '../form';
import * as s from '@/shared/components/Form.css';

/** 값 → 그 값이 틀렸을 때 오류가 붙는 칸 */
const ERROR_FIELD: Partial<Record<keyof DebateFormValues, DebateFormField>> = {
  title: 'title',
  book: 'book',
  category: 'category',
  link: 'link',
  location: 'location',
  date: 'date',
  time: 'date',
  limit: 'limit',
  price: 'price',
  free: 'price',
};

type NumberStepperProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
  decreaseLabel: string;
  increaseLabel: string;
  error?: string;
};

/** 인원처럼 작은 수를 −/+ 버튼이나 직접 입력으로 정해요. */
function NumberStepper({
  label,
  value,
  onChange,
  min,
  max,
  unit,
  decreaseLabel,
  increaseLabel,
  error,
}: NumberStepperProps) {
  const labelId = useId();
  const inputId = useId();
  const errorId = useId();
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <div role='group' aria-labelledby={labelId} className={s.group}>
      <label id={labelId} htmlFor={inputId} className={s.label}>
        {label}
      </label>
      <div className={s.stepper}>
        <IconButton
          variant='outline'
          size='md'
          aria-label={decreaseLabel}
          disabled={value <= min}
          onClick={() => onChange(clamp(value - 1))}
        >
          <Minus />
        </IconButton>
        <input
          id={inputId}
          type='text'
          inputMode='numeric'
          className={s.stepperInput}
          value={Number.isFinite(value) ? String(value) : ''}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            const digits = event.target.value.replace(/\D/g, '').slice(0, 3);
            onChange(digits ? Number(digits) : Number.NaN);
          }}
          onBlur={() => {
            if (Number.isFinite(value)) onChange(clamp(value));
          }}
        />
        <IconButton
          variant='outline'
          size='md'
          aria-label={increaseLabel}
          disabled={value >= max}
          onClick={() =>
            onChange(clamp((Number.isFinite(value) ? value : min - 1) + 1))
          }
        >
          <Plus />
        </IconButton>
        <span className={s.unit} aria-hidden='true'>
          {unit}
        </span>
      </div>
      {error && (
        <p id={errorId} className={s.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export type DebateFormProps = {
  mode: 'create' | 'edit';
  initialValues: DebateFormValues;
  /** 새로 고른 첨부 파일과 함께 저장해요. 실패하면 오류 문구 번역 키를 던져요. */
  onSubmit: (values: DebateFormValues, files: File[]) => Promise<void>;
  submitting: boolean;
  /** 저장 실패 문구 */
  submitError?: string | null;
  /** 만들기 화면: 임시 저장 */
  onSaveDraft?: (values: DebateFormValues) => boolean;
  /** 폼 위에 보여줄 안내 (임시 저장 불러옴 등) */
  notice?: ReactNode;
  /** 수정 화면: 취소 링크 */
  cancelAction?: ReactNode;
  /** 수정 화면: 이미 모인 인원(주최자 포함). 정원을 이보다 줄일 수 없어요. */
  members?: number;
};

/** 토론방 만들기·수정 폼 */
export function DebateForm({
  mode,
  initialValues,
  onSubmit,
  submitting,
  submitError,
  onSaveDraft,
  notice,
  cancelAction,
  members = 0,
}: DebateFormProps) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const modeLabelId = useId();

  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<DebateFormErrors>({});
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

  const update = <K extends keyof DebateFormValues>(
    key: K,
    value: DebateFormValues[K]
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    // 고친 칸의 오류는 바로 지워요. 나머지는 다시 제출할 때 검사해요.
    const fields =
      key === 'mode' ? (['link', 'location'] as const) : [ERROR_FIELD[key]];
    setErrors((current) => {
      if (!fields.some((field) => field && current[field])) return current;
      const next = { ...current };
      for (const field of fields) if (field) delete next[field];
      return next;
    });
  };

  const errorText = (field: keyof DebateFormErrors) => {
    const error = errors[field];
    return error ? t(error.key, error.values) : undefined;
  };

  const heldAtChanged =
    values.date !== initialValues.date || values.time !== initialValues.time;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateDebateForm(values, {
      requireFuture: mode === 'create' || heldAtChanged,
      members,
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setShowSummary(true);
      // 첫 번째 오류 칸으로 옮겨서 무엇을 고쳐야 하는지 바로 알 수 있게 해요.
      focusFirstInvalid(formRef.current, summaryRef.current);
      return;
    }
    setShowSummary(false);
    await onSubmit(values, files);
  };

  const today = toDateInput(new Date());

  return (
    <form ref={formRef} noValidate className={s.form} onSubmit={handleSubmit}>
      {notice}
      {showSummary && Object.keys(errors).length > 0 && (
        <p ref={summaryRef} role='alert' tabIndex={-1} className={s.alert}>
          {t('page.create-debate.error.summary')}
        </p>
      )}

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>
          {t('page.create-debate.section.basic')}
        </legend>
        <TextField
          label={t('page.create-debate.input.title-label')}
          placeholder={t('page.create-debate.input.title-placeholder')}
          value={values.title}
          maxLength={TITLE_MAX}
          error={errorText('title')}
          onChange={(event) => update('title', event.target.value)}
        />
        <BookPicker
          label={t('page.create-debate.input.book-select')}
          placeholder={t('component.dropdown.book-search.placeholder')}
          value={values.book}
          error={errorText('book')}
          onChange={(book) => update('book', book)}
        />
        <CategoryField
          label={t('page.create-debate.input.category')}
          hint={t('page.create-debate.input.category-hint')}
          value={values.category}
          error={errorText('category')}
          onChange={(category) => update('category', category)}
        />
      </fieldset>

      <hr className={s.divider} />

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>
          {t('page.create-debate.section.meeting')}
        </legend>
        <div className={s.group}>
          <span id={modeLabelId} className={s.label}>
            {t('page.create-debate.input.mode')}
          </span>
          <SegmentedControl
            aria-label={t('page.create-debate.input.mode')}
            options={[
              {
                value: 'online',
                label: (
                  <span className={s.modeOption}>
                    <Globe aria-hidden='true' />
                    {t('page.create-debate.input.mode-online')}
                  </span>
                ),
              },
              {
                value: 'offline',
                label: (
                  <span className={s.modeOption}>
                    <MapPin aria-hidden='true' />
                    {t('page.create-debate.input.mode-offline')}
                  </span>
                ),
              },
            ]}
            value={values.mode}
            onValueChange={(mode) => update('mode', mode)}
            className={s.modeControl}
          />
        </div>
        {values.mode === 'online' ? (
          <TextField
            label={t('page.create-debate.input.link-label')}
            type='url'
            inputMode='url'
            placeholder='https://'
            helperText={t('page.create-debate.input.link-error')}
            value={values.link}
            error={errorText('link')}
            onChange={(event) => update('link', event.target.value)}
          />
        ) : (
          <TextField
            label={t('page.create-debate.input.location-label')}
            placeholder={t('page.create-debate.input.location-placeholder')}
            value={values.location}
            error={errorText('location')}
            onChange={(event) => update('location', event.target.value)}
          />
        )}
        <div className={s.twoColumns}>
          <TextField
            label={t('page.create-debate.input.date')}
            type='date'
            min={mode === 'create' ? today : undefined}
            value={values.date}
            error={errorText('date')}
            onChange={(event) => update('date', event.target.value)}
          />
          <TextField
            label={t('page.create-debate.input.time')}
            type='time'
            value={values.time}
            aria-invalid={errors.date ? true : undefined}
            onChange={(event) => update('time', event.target.value)}
          />
        </div>
        <div className={s.twoColumns}>
          <NumberStepper
            label={t('page.create-debate.input.limit')}
            value={values.limit}
            min={Math.max(LIMIT_RANGE.min, members)}
            max={LIMIT_RANGE.max}
            unit={t('page.create-debate.input.limit-unit')}
            decreaseLabel={t('page.create-debate.input.limit-decrease')}
            increaseLabel={t('page.create-debate.input.limit-increase')}
            error={errorText('limit')}
            onChange={(limit) => update('limit', limit)}
          />
          <PriceField
            label={t('page.create-debate.input.price')}
            unit={t('page.create-debate.input.price-unit')}
            freeLabel={t('page.create-debate.input.free')}
            price={values.price}
            free={values.free}
            error={errorText('price')}
            onPriceChange={(price) => update('price', price)}
            onFreeChange={(free) => update('free', free)}
          />
        </div>
      </fieldset>

      <hr className={s.divider} />

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>
          {t('page.create-debate.section.intro')}
        </legend>
        <Textarea
          label={t('page.create-debate.input.content-label')}
          placeholder={t('page.create-debate.input.content-placeholder')}
          rows={8}
          value={values.content}
          onChange={(event) => update('content', event.target.value)}
        />
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
            {t('page.create-debate.button.temp-save')}
          </Button>
        )}
        {cancelAction}
        <Button type='submit' size='lg' loading={submitting}>
          {mode === 'create'
            ? t('page.create-debate.button.submit')
            : t('page.update-debate.button.submit')}
        </Button>
      </div>
      <span role='status' className={visuallyHidden}>
        {draftSaved ? t('page.create-debate.draft.saved') : ''}
      </span>
    </form>
  );
}
