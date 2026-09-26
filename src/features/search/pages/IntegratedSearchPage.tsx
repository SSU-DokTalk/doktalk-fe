import type { UseQueryResult } from '@tanstack/react-query';
import {
  ChevronRight,
  Heart,
  MessageCircle,
  Search,
  SearchX,
  X,
} from 'lucide-react';
import { useId, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BookCover,
  bookCoverStage,
  buttonStyles,
  Chip,
  ChipGroup,
  EmptyState,
  IconButton,
  Skeleton,
  TextField,
  visuallyHidden,
} from '@/design-system';
import { placeKindText } from '@/features/debate/display';
import { LibraryActions } from '@/features/library/components';
import { postTitle } from '@/features/post/display';
import { Highlight } from '@/shared/components/Highlight';
import { useFormat } from '@/shared/format';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useQueryParam } from '@/shared/hooks/useQueryParam';
import { useAuth } from '@/shell/hooks';
import { useIntegratedSearch, type SearchSection } from '../api';
import { authorText } from '../display';
import * as s from './IntegratedSearchPage.css';

const SECTIONS: SearchSection[] = ['debate', 'summary', 'post', 'book'];
const isSection = (value: string | null): value is SearchSection =>
  SECTIONS.includes(value as SearchSection);

type SectionProps = {
  title: string;
  count: number | undefined;
  /** 더보기 링크 */
  more?: string;
  status: UseQueryResult['status'];
  onRetry: () => void;
  children: ReactNode;
};

function ResultSection({
  title,
  count,
  more,
  status,
  onRetry,
  children,
}: SectionProps) {
  const { t } = useTranslation();
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className={s.section}>
      <div className={s.sectionHead}>
        <h2 id={headingId} className={s.sectionTitle}>
          {title}
          {count !== undefined && (
            <span className={s.sectionCount}>{count}</span>
          )}
        </h2>
        {more && (
          <Link
            to={more}
            className={buttonStyles({ variant: 'plain', size: 'sm' })}
            aria-label={t('page.integrated-search.more-label', {
              section: title,
            })}
          >
            {t('page.integrated-search.more')}
            <ChevronRight aria-hidden='true' />
          </Link>
        )}
      </div>
      {status === 'pending' ? (
        <div
          role='status'
          aria-label={t('component.base.infinite-scroll.loading')}
        >
          <Skeleton height={96} radius={12} />
        </div>
      ) : status === 'error' ? (
        <p className={s.sectionError}>
          {t('page.integrated-search.error')}{' '}
          <button
            type='button'
            className={buttonStyles({ variant: 'ghost', size: 'sm' })}
            onClick={onRetry}
          >
            {t('page.debate.item.retry')}
          </button>
        </p>
      ) : (
        children
      )}
    </section>
  );
}

function Stats({ likes, comments }: { likes: number; comments: number }) {
  const { t } = useTranslation();
  return (
    <>
      <span className={s.stat}>
        <Heart aria-hidden='true' />
        <span className={visuallyHidden}>
          {t('component.stats.likes', { count: likes })}
        </span>
        <span aria-hidden='true'>{likes}</span>
      </span>
      <span className={s.stat}>
        <MessageCircle aria-hidden='true' />
        <span className={visuallyHidden}>
          {t('component.stats.comments', { count: comments })}
        </span>
        <span aria-hidden='true'>{comments}</span>
      </span>
    </>
  );
}

/** 통합 검색 (/integrated-search?search=&type=) */
function IntegratedSearchPage() {
  const { t, i18n } = useTranslation();
  const format = useFormat();
  const { user, isLoggedIn } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const search = useQueryParam('search', 0);
  const [params, setParams] = useSearchParams();
  const typeParam = params.get('type');
  const focus = isSection(typeParam) ? typeParam : null;
  const query = search.value;
  const { debates, summaries, posts, books } = useIntegratedSearch(
    query,
    focus,
    i18n.language,
    viewerId
  );

  useDocumentTitle(t('page.integrated-search.title'));

  const totals: Record<SearchSection, number | undefined> = {
    debate: debates.data?.total ?? undefined,
    summary: summaries.data?.total ?? undefined,
    post: posts.data?.total ?? undefined,
    book: books.data?.total ?? undefined,
  };
  const known = SECTIONS.map((key) => totals[key]).filter(
    (value): value is number => value !== undefined
  );
  const total = known.reduce((sum, value) => sum + value, 0);
  // 실패한 영역은 빼고, 모든 영역이 끝났을 때 합계를 보여줘요.
  const allLoaded = [debates, summaries, posts, books].every(
    (result) => result.status !== 'pending'
  );
  const sectionTitles: Record<SearchSection, string> = {
    debate: t('component.topnav.debate'),
    summary: t('component.topnav.summary'),
    post: t('component.topnav.post'),
    book: t('page.integrated-search.book'),
  };
  const setFocus = (section: SearchSection | null) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (section) next.set('type', section);
        else next.delete('type');
        return next;
      },
      { replace: true }
    );
  const shows = (section: SearchSection) => !focus || focus === section;
  const encoded = encodeURIComponent(query);

  return (
    <div className={s.page}>
      <form
        role='search'
        aria-label={t('page.integrated-search.search-label')}
        className={s.searchForm}
        onSubmit={(event) => {
          event.preventDefault();
          search.submit();
        }}
      >
        <TextField
          label={t('page.integrated-search.search-label')}
          hideLabel
          type='search'
          variant='filled'
          enterKeyHint='search'
          placeholder={t('component.topnav.search-bar.placeholder')}
          startIcon={<Search aria-hidden='true' />}
          value={search.text}
          onChange={(event) => search.setText(event.target.value)}
          endSlot={
            search.text ? (
              <IconButton
                size='sm'
                aria-label={t('page.search.clear')}
                onClick={search.clear}
              >
                <X />
              </IconButton>
            ) : undefined
          }
        />
      </form>

      {!query ? (
        <div className={s.section}>
          <EmptyState
            titleAs='h1'
            icon={<Search />}
            title={t('page.integrated-search.prompt-title')}
            description={t('page.integrated-search.prompt-description')}
          />
        </div>
      ) : (
        <>
          <div className={s.heading}>
            <span className={s.eyebrow}>
              {t('page.integrated-search.title')}
            </span>
            <h1 className={s.title} aria-live='polite'>
              {allLoaded
                ? t('page.integrated-search.heading', { query, count: total })
                : `‘${query}’`}
            </h1>
          </div>

          <ChipGroup
            aria-label={t('page.integrated-search.filters')}
            className={s.chips}
          >
            <Chip
              pressed={!focus}
              count={allLoaded ? total : undefined}
              onPressedChange={() => setFocus(null)}
            >
              {t('page.integrated-search.all')}
            </Chip>
            {SECTIONS.map((section) => (
              <Chip
                key={section}
                pressed={focus === section}
                count={totals[section]}
                onPressedChange={(pressed) =>
                  setFocus(pressed ? section : null)
                }
              >
                {sectionTitles[section]}
              </Chip>
            ))}
          </ChipGroup>

          {allLoaded && total === 0 ? (
            <div className={s.section}>
              <EmptyState
                icon={<SearchX />}
                title={t('page.integrated-search.no-results')}
                description={t('page.integrated-search.empty-description')}
              />
            </div>
          ) : (
            <>
              {shows('debate') && totals.debate !== 0 && (
                <ResultSection
                  title={sectionTitles.debate}
                  count={totals.debate}
                  more={`/debate?q=${encoded}&by=it`}
                  status={debates.status}
                  onRetry={() => void debates.refetch()}
                >
                  <ul className={s.grid3}>
                    {debates.data?.items.map((debate) => (
                      <li key={debate.id}>
                        <article className={s.card}>
                          <BookCover
                            title={debate.book.title}
                            src={debate.book.image}
                            width={60}
                          />
                          <div className={s.cardBody}>
                            <h3 className={s.cardTitle}>
                              <Link
                                to={`/debate/${debate.id}`}
                                className={s.link}
                              >
                                <Highlight text={debate.title} query={query} />
                              </Link>
                            </h3>
                            <p className={s.cardMeta}>
                              {[
                                debate.held_at &&
                                  format.meetingDateTime(debate.held_at),
                                placeKindText(debate, t),
                                debate.price > 0
                                  ? format.price(debate.price)
                                  : t('component.stats.free'),
                              ]
                                .filter(Boolean)
                                .join(' · ')}
                            </p>
                            <div className={s.cardFoot}>
                              <span className={s.author}>
                                {debate.user.name ||
                                  t('component.user.unknown')}
                              </span>
                              <Stats
                                likes={debate.likes_num}
                                comments={debate.comments_num}
                              />
                            </div>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </ResultSection>
              )}

              {shows('summary') && totals.summary !== 0 && (
                <ResultSection
                  title={sectionTitles.summary}
                  count={totals.summary}
                  more={`/summary?q=${encoded}&by=it`}
                  status={summaries.status}
                  onRetry={() => void summaries.refetch()}
                >
                  <ul className={s.grid2}>
                    {summaries.data?.items.map((summary) => (
                      <li key={summary.id}>
                        <article className={s.card}>
                          <BookCover
                            title={summary.book.title}
                            src={summary.book.image}
                            width={64}
                          />
                          <div className={s.cardBody}>
                            <h3 className={s.cardTitle}>
                              <Link
                                to={`/summary/${summary.id}`}
                                className={s.link}
                              >
                                <Highlight text={summary.title} query={query} />
                              </Link>
                            </h3>
                            {summary.free_content && (
                              <p className={s.excerpt}>
                                {summary.free_content}
                              </p>
                            )}
                            <div className={s.cardFoot}>
                              <span className={s.author}>
                                {summary.user.name ||
                                  t('component.user.unknown')}
                              </span>
                              <Stats
                                likes={summary.likes_num}
                                comments={summary.comments_num}
                              />
                            </div>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </ResultSection>
              )}

              {shows('post') && totals.post !== 0 && (
                <ResultSection
                  title={sectionTitles.post}
                  count={totals.post}
                  more={
                    focus === 'post'
                      ? undefined
                      : `/integrated-search?search=${encoded}&type=post`
                  }
                  status={posts.status}
                  onRetry={() => void posts.refetch()}
                >
                  <ul className={s.posts}>
                    {posts.data?.items.map((post) => (
                      <li key={post.id}>
                        <article className={s.postRow}>
                          <p className={s.cardMeta}>
                            <span className={s.author}>
                              {post.user.name || t('component.user.unknown')}
                            </span>{' '}
                            · {format.relativeTime(post.created)}
                          </p>
                          <h3 className={s.cardTitle}>
                            <Link to={`/post/${post.id}`} className={s.link}>
                              <Highlight
                                text={postTitle(post, t)}
                                query={query}
                              />
                            </Link>
                          </h3>
                          {post.content && (
                            <p className={s.excerpt}>{post.content}</p>
                          )}
                          <div className={s.cardFoot}>
                            <Stats
                              likes={post.likes_num}
                              comments={post.comments_num}
                            />
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </ResultSection>
              )}

              {shows('book') && totals.book !== 0 && (
                <ResultSection
                  title={sectionTitles.book}
                  count={totals.book}
                  more={`/search?q=${encoded}`}
                  status={books.status}
                  onRetry={() => void books.refetch()}
                >
                  <ul className={s.books}>
                    {books.data?.items.map((book) => (
                      <li key={book.isbn} className={s.book}>
                        <div className={`${bookCoverStage} ${s.bookStage}`}>
                          <BookCover
                            title={book.title}
                            src={book.image}
                            width={100}
                          />
                        </div>
                        <h3 className={s.bookTitle}>
                          <Highlight text={book.title} query={query} />
                        </h3>
                        <p className={s.cardMeta}>{authorText(book.author)}</p>
                        <LibraryActions
                          compact
                          size='sm'
                          isbn={book.isbn}
                          title={book.title}
                          inLibrary={
                            books.data?.inLibrary.includes(book.isbn) ?? false
                          }
                          viewerId={viewerId}
                        />
                      </li>
                    ))}
                  </ul>
                </ResultSection>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default IntegratedSearchPage;
