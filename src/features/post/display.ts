import type { TFunction } from 'i18next';
import type { Post } from '@/shared/api/models';

/** 제목이 빈 옛 글은 본문 첫 줄(40자까지), 그것도 없으면 '제목 없는 글' */
export function postTitle(post: Pick<Post, 'title' | 'content'>, t: TFunction) {
  const title = post.title?.trim();
  if (title) return title;
  const firstLine = post.content?.trim().split('\n')[0]?.trim();
  if (firstLine) {
    return firstLine.length > 40 ? `${firstLine.slice(0, 40)}…` : firstLine;
  }
  return t('page.post.untitled');
}
