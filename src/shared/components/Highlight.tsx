import { Fragment } from 'react';
import * as s from './Highlight.css';

/** 검색어와 같은 부분을 <mark>로 표시해요 (대소문자 무시). */
export function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim();
  if (!needle) return <>{text}</>;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === needle.toLowerCase() ? (
          <mark key={index} className={s.mark}>
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  );
}
