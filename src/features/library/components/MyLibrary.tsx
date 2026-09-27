import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mq, Tabs } from '@/design-system';
import { productIds, usePurchaseHistory } from '@/features/payment/api';
import { maskLanguageFor, useSummariesByIds } from '@/features/summary/api';
import { useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useLibraryBooks } from '../api';
import { LibraryShelf } from './LibraryShelf';
import { ReadingSummaries } from './ReadingSummaries';
import * as s from './MyLibrary.css';

type Section = 'books' | 'summaries';

/** 탭 이름 옆 숫자. 아직 모르면 비워 둬요. */
function useCounts(viewerId: number) {
  const { i18n } = useTranslation();
  const books = useLibraryBooks(viewerId);
  const history = usePurchaseHistory(viewerId);
  const ids = useMemo(() => productIds(history.data, 'S'), [history.data]);
  const summaries = useSummariesByIds(ids, maskLanguageFor(i18n.language));
  return {
    books: books.data?.pages[0]?.total ?? undefined,
    summaries:
      history.data && !summaries.isPending
        ? summaries.summaries.length
        : undefined,
  };
}

/**
 * 내 서재 (읽고 있는 책 + 읽고 있는 요약).
 * 데스크톱은 두 구역을 차례로, 모바일은 알약 탭으로 나눠 보여줘요.
 */
export function MyLibrary({ viewerId }: { viewerId: number }) {
  const { t } = useTranslation();
  const format = useFormat();
  const isDesktop = useMediaQuery(mq.md);
  const [section, setSection] = useState<Section>('books');
  const counts = useCounts(viewerId);

  if (isDesktop) {
    return (
      <div className={s.stack}>
        <LibraryShelf userId={viewerId} editable />
        <ReadingSummaries viewerId={viewerId} />
      </div>
    );
  }

  const label = (key: Section) => {
    const count = counts[key];
    const name = t(`page.profile.library.${key}-tab`);
    return count === undefined ? name : `${name} ${format.number(count)}`;
  };

  return (
    <Tabs.Root
      value={section}
      onValueChange={(value) => setSection(value as Section)}
    >
      <div className={s.tabsBar}>
        <Tabs.List aria-label={t('page.profile.library.sections')} segmented>
          <Tabs.Tab value='books'>{label('books')}</Tabs.Tab>
          <Tabs.Tab value='summaries'>{label('summaries')}</Tabs.Tab>
        </Tabs.List>
      </div>
      <Tabs.Panel value='books'>
        <LibraryShelf userId={viewerId} editable hideHeading />
      </Tabs.Panel>
      <Tabs.Panel value='summaries'>
        <ReadingSummaries viewerId={viewerId} hideHeading />
      </Tabs.Panel>
    </Tabs.Root>
  );
}
