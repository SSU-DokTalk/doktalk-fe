import { useEffect } from 'react';

const SITE_NAME = '讀:TALK';

/** 브라우저 탭 제목. 스크린 리더도 페이지가 바뀌면 이 제목을 읽어요. */
export function useDocumentTitle(title: string | undefined) {
  useEffect(() => {
    if (!title) return;
    const previous = document.title;
    document.title = `${title} · ${SITE_NAME}`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
