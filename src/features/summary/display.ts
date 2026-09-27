import type { Summary } from '@/shared/api/models';

/** 넛지 · 리처드 탈러 (네이버는 공동 저자를 ^로 이어 줘요) */
export function bookLine(book: Summary['book']) {
  const author = book.author?.replace(/\^/g, ', ');
  return [book.title, author].filter(Boolean).join(' · ');
}
