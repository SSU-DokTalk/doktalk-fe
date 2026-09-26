import type { PickedBook } from '@/features/book/components/BookPicker';
import type { components } from '@/shared/api/schema';
import type { AttachedFile, Debate } from '@/shared/api/models';
import { createDraftStore } from '@/shared/draft';
import { parseServerDate } from '@/shared/format';

export const LIMIT_RANGE = { min: 2, max: 99 } as const;
export const PRICE_RANGE = { min: 1_000, max: 1_000_000 } as const;
export const TITLE_MAX = 255;

export type DebateFormValues = {
  title: string;
  book: PickedBook | null;
  /** 카테고리 비트마스크 */
  category: number;
  mode: 'online' | 'offline';
  link: string;
  location: string;
  /** YYYY-MM-DD (내 시간대) */
  date: string;
  /** HH:mm */
  time: string;
  limit: number;
  free: boolean;
  price: number;
  content: string;
  /** 이미 올라가 있는 첨부 파일 */
  existingFiles: AttachedFile[];
};

export type DebateFormField =
  | 'title'
  | 'book'
  | 'category'
  | 'link'
  | 'location'
  | 'date'
  | 'limit'
  | 'price';

/** 필드별 오류 (번역 키와 값) */
export type DebateFormErrors = Partial<
  Record<DebateFormField, { key: string; values?: Record<string, number> }>
>;

export const EMPTY_DEBATE_FORM: DebateFormValues = {
  title: '',
  book: null,
  category: 0,
  mode: 'online',
  link: '',
  location: '',
  date: '',
  time: '',
  limit: LIMIT_RANGE.min,
  free: false,
  price: PRICE_RANGE.min,
  content: '',
  existingFiles: [],
};

const pad = (value: number) => String(value).padStart(2, '0');

export function toDateInput(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** 입력칸 값(내 시간대)을 Date로 */
export function combineDateTime(date: string, time: string) {
  return new Date(`${date}T${time}`);
}

/** 수정할 때 서버 값을 폼 값으로 바꿔요. 서버 시각(UTC)은 내 시간대로 보여줘요. */
export function debateToForm(debate: Debate): DebateFormValues {
  const heldAt = debate.held_at ? parseServerDate(debate.held_at) : null;
  const location = debate.location?.trim() ?? '';
  return {
    title: debate.title,
    book: {
      isbn: debate.book.isbn,
      title: debate.book.title,
      author: debate.book.author,
      publisher: debate.book.publisher,
      image: debate.book.image,
    },
    category: debate.category,
    mode: location ? 'offline' : 'online',
    link: debate.link ?? '',
    location,
    date: heldAt ? toDateInput(heldAt) : '',
    time: heldAt ? `${pad(heldAt.getHours())}:${pad(heldAt.getMinutes())}` : '',
    limit: debate.limit,
    free: debate.price <= 0,
    price: debate.price > 0 ? debate.price : PRICE_RANGE.min,
    content: debate.content ?? '',
    existingFiles: debate.files ?? [],
  };
}

const isWebUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * 폼 검사. 서버 규칙(제목 255자, 링크는 http(s) 주소)에 화면 규칙을 더했어요.
 * requireFuture: 새로 만들 때, 또는 수정하면서 일시를 바꿨을 때만 지난 시간을 막아요.
 */
export function validateDebateForm(
  values: DebateFormValues,
  { requireFuture }: { requireFuture: boolean }
): DebateFormErrors {
  const errors: DebateFormErrors = {};
  const prefix = 'page.create-debate.error';

  if (!values.title.trim()) errors.title = { key: `${prefix}.title-required` };
  if (!values.book) errors.book = { key: `${prefix}.book-required` };
  if (values.category === 0) {
    errors.category = { key: `${prefix}.category-required` };
  }

  if (values.mode === 'online') {
    if (!values.link.trim()) errors.link = { key: `${prefix}.link-required` };
    else if (!isWebUrl(values.link.trim())) {
      errors.link = { key: 'page.create-debate.input.link-error' };
    }
  } else if (!values.location.trim()) {
    errors.location = { key: `${prefix}.location-required` };
  }

  if (!values.date || !values.time) {
    errors.date = { key: `${prefix}.date-required` };
  } else if (
    requireFuture &&
    combineDateTime(values.date, values.time).getTime() <= Date.now()
  ) {
    errors.date = { key: `${prefix}.date-past` };
  }

  if (
    !Number.isInteger(values.limit) ||
    values.limit < LIMIT_RANGE.min ||
    values.limit > LIMIT_RANGE.max
  ) {
    errors.limit = { key: `${prefix}.limit-range`, values: { ...LIMIT_RANGE } };
  }

  if (
    !values.free &&
    (!Number.isInteger(values.price) ||
      values.price < PRICE_RANGE.min ||
      values.price > PRICE_RANGE.max)
  ) {
    errors.price = { key: `${prefix}.price-range`, values: { ...PRICE_RANGE } };
  }

  return errors;
}

type DebateRequest = components['schemas']['CreateDebateReq'];

/** 서버로 보낼 값. 시간은 UTC(ISO)로 보내요. */
export function formToRequest(
  values: DebateFormValues,
  uploaded: AttachedFile[]
): DebateRequest {
  return {
    title: values.title.trim(),
    isbn: values.book?.isbn ?? 0,
    category: values.category,
    link: values.mode === 'online' ? values.link.trim() : null,
    location: values.mode === 'offline' ? values.location.trim() : null,
    held_at: combineDateTime(values.date, values.time).toISOString(),
    limit: values.limit,
    price: values.free ? 0 : values.price,
    content: values.content.trim() || null,
    files: [...values.existingFiles, ...uploaded],
  };
}

/* ---------- 임시 저장 (이 브라우저에만) ---------- */

// 첨부 파일은 저장하지 않아요 (새 파일은 브라우저를 닫으면 사라져요).
const draftStore = createDraftStore<DebateFormValues>(
  'doktalk:debate-draft:v1',
  EMPTY_DEBATE_FORM
);

export function loadDebateDraft(): DebateFormValues | null {
  const draft = draftStore.load();
  return draft ? { ...draft, existingFiles: [] } : null;
}

export function saveDebateDraft(values: DebateFormValues) {
  return draftStore.save({ ...values, existingFiles: [] });
}

export function clearDebateDraft() {
  draftStore.clear();
}
