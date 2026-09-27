import type { PickedBook } from '@/features/book/components/BookPicker';
import type { AttachedFile, Summary } from '@/shared/api/models';
import type { components } from '@/shared/api/schema';
import { createDraftStore } from '@/shared/draft';

export const SUMMARY_PRICE_RANGE = { min: 100, max: 1_000_000 } as const;
export const SUMMARY_TITLE_MAX = 255;

export type SummaryFormValues = {
  title: string;
  book: PickedBook | null;
  category: number;
  /** 무료 미리보기 */
  freeContent: string;
  /** 유료 내용 */
  chargedContent: string;
  free: boolean;
  price: number;
  existingFiles: AttachedFile[];
};

export type SummaryFormField =
  | 'title'
  | 'book'
  | 'category'
  | 'freeContent'
  | 'chargedContent'
  | 'price';

export type SummaryFormErrors = Partial<
  Record<SummaryFormField, { key: string; values?: Record<string, number> }>
>;

export const EMPTY_SUMMARY_FORM: SummaryFormValues = {
  title: '',
  book: null,
  category: 0,
  freeContent: '',
  chargedContent: '',
  free: false,
  price: 3_000,
  existingFiles: [],
};

/**
 * 수정할 때 서버 값을 폼 값으로 바꿔요.
 * 유료 내용은 서버가 가짜 문장으로 가려서 보내므로, 따로 받은 진짜 내용(charged)만 써요.
 */
export function summaryToForm(
  summary: Summary,
  charged: string | null
): SummaryFormValues {
  return {
    title: summary.title,
    book: {
      isbn: summary.book.isbn,
      title: summary.book.title,
      author: summary.book.author,
      publisher: summary.book.publisher,
      image: summary.book.image,
    },
    category: summary.category,
    freeContent: summary.free_content ?? '',
    chargedContent: charged ?? '',
    free: summary.price <= 0,
    price: summary.price > 0 ? summary.price : EMPTY_SUMMARY_FORM.price,
    existingFiles: summary.files ?? [],
  };
}

/**
 * requireCharged: 수정 화면에서 기존 유료 내용을 못 불러왔을 때는 무료여도 다시 입력하게 해요.
 * (비워서 저장하면 기존 유료 내용이 지워져요.)
 */
export function validateSummaryForm(
  values: SummaryFormValues,
  { requireCharged = false }: { requireCharged?: boolean } = {}
) {
  const errors: SummaryFormErrors = {};
  const prefix = 'page.create-summary.error';

  if (!values.title.trim()) errors.title = { key: `${prefix}.title-required` };
  if (!values.book) errors.book = { key: `${prefix}.book-required` };
  if (values.category === 0) {
    errors.category = { key: `${prefix}.category-required` };
  }
  if (!values.freeContent.trim()) {
    errors.freeContent = { key: `${prefix}.free-required` };
  }
  // 무료 공개면 유료 내용은 비워 둬도 돼요.
  if ((!values.free || requireCharged) && !values.chargedContent.trim()) {
    errors.chargedContent = { key: `${prefix}.charged-required` };
  }
  if (
    !values.free &&
    (!Number.isInteger(values.price) ||
      values.price < SUMMARY_PRICE_RANGE.min ||
      values.price > SUMMARY_PRICE_RANGE.max)
  ) {
    errors.price = {
      key: `${prefix}.price-range`,
      values: { ...SUMMARY_PRICE_RANGE },
    };
  }
  return errors;
}

type SummaryRequest = components['schemas']['CreateSummaryReq'];

/**
 * 서버로 보낼 값. 유료 내용은 null 대신 빈 문자열을 보내요
 * (서버가 목록에서 charged_content[:200]을 잘라 쓰기 때문에 null이면 오류가 나요).
 */
export function summaryFormToRequest(
  values: SummaryFormValues,
  uploaded: AttachedFile[]
): SummaryRequest {
  return {
    isbn: values.book?.isbn ?? 0,
    title: values.title.trim(),
    category: values.category,
    free_content: values.freeContent.trim(),
    charged_content: values.chargedContent.trim(),
    price: values.free ? 0 : values.price,
    files: [...values.existingFiles, ...uploaded],
  };
}

const draftStore = createDraftStore<SummaryFormValues>(
  'doktalk:summary-draft:v1',
  EMPTY_SUMMARY_FORM
);

export function loadSummaryDraft(): SummaryFormValues | null {
  const draft = draftStore.load();
  return draft ? { ...draft, existingFiles: [] } : null;
}

export function saveSummaryDraft(values: SummaryFormValues) {
  return draftStore.save({ ...values, existingFiles: [] });
}

export function clearSummaryDraft() {
  draftStore.clear();
}
