import type { components } from '@/shared/api/schema';

/** 약관 동의. 이용약관·개인정보·만 14세 이상은 필수, 마케팅은 선택이에요. */
export type Agreements = components['schemas']['RegisterAgreementsReq'];

export const NO_AGREEMENTS: Agreements = {
  terms: false,
  privacy: false,
  age14: false,
  marketing: false,
};

export const REQUIRED_AGREEMENTS = ['terms', 'privacy', 'age14'] as const;

/** 필수 약관에 모두 동의했는지. 서버도 같은 걸 확인해요. */
export const hasRequiredAgreements = (value: Agreements) =>
  REQUIRED_AGREEMENTS.every((key) => value[key]);

export type Gender = components['schemas']['GENDER'];

/** 가입할 때 고르는 추가 정보. 모두 선택이에요. */
export type ProfileExtras = {
  /** YYYY-MM-DD, 비어 있으면 입력하지 않았어요. */
  birthdate: string;
  /** 비어 있으면 '선택 안 함' */
  gender: Gender | '';
  /** 관심 분야: 토론방·요약과 같은 카테고리 비트마스크 */
  interests: number;
};

export const EMPTY_EXTRAS: ProfileExtras = {
  birthdate: '',
  gender: '',
  interests: 0,
};

/** 서버의 가입 나이 제한(만 14세)과 같아요. */
export const MIN_AGE = 14;
export const EARLIEST_BIRTHDATE = '1900-01-01';

const pad = (value: number) => String(value).padStart(2, '0');
const toDateString = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** 가입할 수 있는 가장 늦은 생년월일 (오늘 만 14세가 되는 날, 내 시간대 기준) */
export function latestBirthdate(today = new Date()) {
  return toDateString(
    new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate())
  );
}

export type BirthdateError = 'invalid' | 'under-14';

/** 생년월일 검사. 비어 있으면 괜찮아요 (선택 입력). */
export function checkBirthdate(
  value: string,
  today = new Date()
): BirthdateError | null {
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < EARLIEST_BIRTHDATE) {
    return 'invalid';
  }
  if (value > toDateString(today)) return 'invalid';
  if (value > latestBirthdate(today)) return 'under-14';
  return null;
}

/** 서버로 보낼 추가 정보. 고르지 않은 값은 null이에요. */
export function extrasToRequest(extras: ProfileExtras) {
  return {
    birthdate: extras.birthdate || null,
    gender: extras.gender || null,
    interests: extras.interests,
  };
}
