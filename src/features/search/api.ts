import { useQuery } from '@tanstack/react-query';
import { bookProviderFor } from '@/features/book/api';
import { maskLanguageFor } from '@/features/summary/api';
import { api } from '@/shared/api/client';

export type SearchSection = 'debate' | 'summary' | 'post' | 'book';

/** 전체 보기일 때 영역마다 보여줄 개수. 한 종류만 고르면 20개까지 보여줘요. */
export const PREVIEW_SIZE: Record<SearchSection, number> = {
  debate: 6,
  summary: 4,
  post: 3,
  book: 5,
};
const FOCUSED_SIZE = 20;

const searchKeys = {
  all: ['search'] as const,
  section: (section: SearchSection, query: string, size: number, extra = '') =>
    [...searchKeys.all, section, query, size, extra] as const,
};

/**
 * 통합 검색. 토론방·요약·게시글은 제목으로, 도서는 외부 도서 검색으로 찾아요.
 * 영역마다 따로 불러와서 하나가 실패해도 나머지는 보여줘요.
 */
export function useIntegratedSearch(
  query: string,
  focus: SearchSection | null,
  language: string,
  viewerId: number
) {
  const enabled = query.trim().length > 0;
  const size = (section: SearchSection) =>
    focus === section ? FOCUSED_SIZE : PREVIEW_SIZE[section];
  // 한 종류만 볼 때 다른 영역은 개수만 알면 돼서 1개만 받아요.
  const sizeFor = (section: SearchSection) =>
    focus && focus !== section ? 1 : size(section);

  const debates = useQuery({
    queryKey: searchKeys.section('debate', query, sizeFor('debate')),
    queryFn: ({ signal }) =>
      api.get('/debate', {
        query: {
          search: query,
          searchby: 'it',
          sortby: 'latest',
          page: 1,
          size: sizeFor('debate'),
        },
        signal,
      }),
    enabled,
  });

  const lang = maskLanguageFor(language);
  const summaries = useQuery({
    queryKey: searchKeys.section('summary', query, sizeFor('summary'), lang),
    queryFn: ({ signal }) =>
      api.get('/summary', {
        query: {
          search: query,
          searchby: 'it',
          sortby: 'latest',
          lang,
          page: 1,
          size: sizeFor('summary'),
        },
        signal,
      }),
    enabled,
  });

  const posts = useQuery({
    queryKey: searchKeys.section('post', query, sizeFor('post')),
    queryFn: ({ signal }) =>
      api.get('/post', {
        query: {
          search: query,
          sortby: 'latest',
          page: 1,
          size: sizeFor('post'),
        },
        signal,
      }),
    enabled,
  });

  const provider = bookProviderFor(language);
  const books = useQuery({
    queryKey: searchKeys.section(
      'book',
      query,
      sizeFor('book'),
      `${provider}-${viewerId}`
    ),
    queryFn: async ({ signal }) => {
      const page = await api.get('/books', {
        query: {
          search: query,
          page: 1,
          size: sizeFor('book'),
          sortby: 'latest',
          api_provider: provider,
        },
        signal,
      });
      const ids = page.items.map((book) => book.isbn);
      const inLibrary =
        viewerId > 0 && ids.length > 0
          ? ((await api.get('/librarys/is_in_library', {
              query: { ids },
              signal,
            })) as number[])
          : [];
      return { ...page, inLibrary };
    },
    enabled,
    staleTime: 5 * 60_000,
  });

  return { debates, summaries, posts, books };
}
