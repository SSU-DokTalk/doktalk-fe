/**
 * 약관·개인정보처리방침의 시행일. 가입 때 이 날짜를 동의한 약관의 버전으로 남겨요.
 * 문서를 고치면 백엔드 Agreement.CURRENT_VERSION(app/model/Agreement.py)도 같은 날짜로 바꿔요.
 */
export const LEGAL_EFFECTIVE_DATE = '2026-09-27';

/** 문단 하나: 글이거나 목록이에요. */
export type LegalBlock = string | { items: string[]; ordered?: boolean };

export type LegalSection = {
  /** 주소 뒤 #id로 바로 갈 수 있어요 (예: /privacy#marketing). */
  id?: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  /** 문서 맨 위 문단 (번역본 안내 등) */
  preface?: string[];
  sections: LegalSection[];
};

export type LegalDocuments = {
  terms: LegalDocument;
  privacy: LegalDocument;
};

export type LegalKind = keyof LegalDocuments;
