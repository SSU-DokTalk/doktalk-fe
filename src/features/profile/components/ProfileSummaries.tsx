import { useInfiniteQuery } from '@tanstack/react-query';
import { FileText, NotebookPen, PenLine } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState, mq } from '@/design-system';
import { userSummariesQuery } from '@/features/summary/api';
import {
  SummaryListItem,
  SummaryListItemSkeleton,
} from '@/features/summary/components/SummaryListItem';
import type { Summary } from '@/shared/api/models';
import { COVER_WIDTH } from '@/shared/components/FeedItem.css';
import { InfiniteFeed } from '@/shared/components/InfiniteFeed';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { CreatePrompt } from './CreatePrompt';

/** 내 요약 탭 */
export function ProfileSummaries({ userId }: { userId: number }) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const query = useInfiniteQuery({
    ...userSummariesQuery(userId),
    enabled: userId > 0,
  });
  const coverWidth = isDesktop ? COVER_WIDTH.desktop : COVER_WIDTH.mobile;
  const getKey = useCallback((summary: Summary) => summary.id, []);

  return (
    <>
      <CreatePrompt
        icon={<NotebookPen />}
        actionIcon={<PenLine aria-hidden='true' />}
        title={t('page.profile.summaries.prompt-title')}
        description={t('page.profile.summaries.prompt-description')}
        to='/summary/create'
        label={t('page.summary.button.write')}
      />
      <InfiniteFeed
        heading={t('page.profile.summaries.heading')}
        query={query}
        getKey={getKey}
        renderItem={(summary) => (
          <SummaryListItem summary={summary} coverWidth={coverWidth} />
        )}
        renderSkeleton={() => (
          <SummaryListItemSkeleton coverWidth={coverWidth} />
        )}
        errorIcon={<FileText />}
        errorTitle={t('page.profile.summaries.error')}
        errorDescription={t('page.profile.state.error-description')}
        empty={
          <EmptyState
            icon={<FileText />}
            title={t('page.profile.summaries.empty')}
          />
        }
      />
    </>
  );
}
