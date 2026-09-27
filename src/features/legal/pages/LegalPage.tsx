import { useQuery } from '@tanstack/react-query';
import { FileWarning } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Skeleton } from '@/design-system';
import { PageState } from '@/shared/components/PageState';
import { useFormat } from '@/shared/format';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useScrollToHash } from '@/shared/hooks/useScrollToHash';
import {
  LEGAL_EFFECTIVE_DATE,
  type LegalBlock,
  type LegalDocuments,
  type LegalKind,
} from '../types';
import * as s from './LegalPage.css';

/** 언어마다 문서를 따로 받아요. 약관 화면을 열 때 지금 언어의 문서만 내려받아요. */
const LOADERS: Record<string, () => Promise<{ default: LegalDocuments }>> = {
  kr: () => import('../documents/kr'),
  us: () => import('../documents/us'),
  mn: () => import('../documents/mn'),
};

function useLegalDocuments(language: string) {
  const lang = language in LOADERS ? language : 'kr';
  return useQuery({
    queryKey: ['legal', lang],
    queryFn: async () => (await LOADERS[lang]()).default,
    staleTime: Infinity,
  });
}

/** 시행일 (시간대와 상관없이 그 날짜 그대로) */
function effectiveDate() {
  const [year, month, day] = LEGAL_EFFECTIVE_DATE.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p className={s.paragraph}>{block}</p>;
  const List = block.ordered ? 'ol' : 'ul';
  return (
    <List className={block.ordered ? s.orderedList : s.list}>
      {block.items.map((item) => (
        <li key={item} className={s.item}>
          {item}
        </li>
      ))}
    </List>
  );
}

const sectionId = (id: string | undefined, index: number) =>
  id ?? `section-${index + 1}`;

/** 이용약관(/terms)·개인정보처리방침(/privacy). 로그아웃 상태에서도 볼 수 있어요. */
function LegalPage({ kind }: { kind: LegalKind }) {
  const { t, i18n } = useTranslation();
  const format = useFormat();
  const query = useLegalDocuments(i18n.language);
  const doc = query.data?.[kind];
  const tocId = useId();

  useDocumentTitle(doc?.title);
  useScrollToHash(Boolean(doc));

  if (query.isPending) {
    return (
      <div
        className={s.page}
        role='status'
        aria-label={t('page.legal.loading')}
      >
        <Skeleton width='50%' height={32} />
        <Skeleton height={16} />
        <Skeleton height={16} />
        <Skeleton width='70%' height={16} />
      </div>
    );
  }

  if (!doc) {
    return (
      <PageState
        tone='danger'
        icon={<FileWarning />}
        title={t('page.legal.error')}
        actions={
          <Button variant='outline' onClick={() => void query.refetch()}>
            {t('page.debate.item.retry')}
          </Button>
        }
      />
    );
  }

  return (
    <article className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>{doc.title}</h1>
        <p className={s.effective}>
          {t('page.legal.effective', { date: format.date(effectiveDate()) })}
        </p>
      </header>

      {doc.preface?.map((paragraph) => (
        <p key={paragraph} className={s.preface}>
          {paragraph}
        </p>
      ))}

      <nav aria-labelledby={tocId} className={s.toc}>
        <h2 id={tocId} className={s.tocTitle}>
          {t('page.legal.toc')}
        </h2>
        <ol className={s.tocList}>
          {doc.sections.map((section, index) => (
            <li key={section.heading}>
              <a
                href={`#${sectionId(section.id, index)}`}
                className={s.tocLink}
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {doc.sections.map((section, index) => (
        <section
          key={section.heading}
          id={sectionId(section.id, index)}
          className={s.section}
        >
          <h2 className={s.heading}>{section.heading}</h2>
          {section.blocks.map((block, blockIndex) => (
            <Block key={blockIndex} block={block} />
          ))}
        </section>
      ))}
    </article>
  );
}

export default LegalPage;
