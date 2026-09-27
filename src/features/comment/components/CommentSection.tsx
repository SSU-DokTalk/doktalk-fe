import clsx from 'clsx';
import { useId, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  buttonStyles,
  Skeleton,
  TextField,
} from '@/design-system';
import type { Comment } from '@/shared/api/models';
import { parseServerDate, useFormat } from '@/shared/format';
import * as s from './CommentSection.css';
import { useAuthHref } from '@/features/auth/redirect';

const PAGE_SIZE = 10;

type Thread = { comment: Comment; replies: Comment[] };

/** 답글은 맨 위 댓글 아래에 한 단계로 모아요. 댓글은 최신순, 답글은 쓴 순서대로예요. */
function toThreads(comments: Comment[]): Thread[] {
  const byId = new Map(comments.map((comment) => [comment.id, comment]));
  const rootOf = (comment: Comment): Comment => {
    let current = comment;
    const seen = new Set<number>();
    while (current.upper_comment_id && !seen.has(current.id)) {
      seen.add(current.id);
      const parent = byId.get(current.upper_comment_id);
      if (!parent) break;
      current = parent;
    }
    return current;
  };

  const threads = new Map<number, Thread>();
  const byTime = (a: Comment, b: Comment) =>
    parseServerDate(a.created).getTime() - parseServerDate(b.created).getTime();

  for (const comment of [...comments].sort(byTime)) {
    const root = rootOf(comment);
    if (root.id === comment.id) {
      threads.set(comment.id, { comment, replies: [] });
    } else {
      const thread = threads.get(root.id) ?? { comment: root, replies: [] };
      thread.replies.push(comment);
      threads.set(root.id, thread);
    }
  }
  return [...threads.values()].reverse();
}

type ComposerProps = {
  label: string;
  placeholder: string;
  onSubmit: (content: string) => Promise<unknown>;
  onCancel?: () => void;
  autoFocus?: boolean;
};

function CommentComposer({
  label,
  placeholder,
  onSubmit,
  onCancel,
  autoFocus,
}: ComposerProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const errorId = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = value.trim();
    if (!content || pending) return;
    setPending(true);
    setFailed(false);
    try {
      await onSubmit(content);
      setValue('');
      onCancel?.();
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <form className={s.composer} onSubmit={handleSubmit}>
        <TextField
          label={label}
          hideLabel
          size='sm'
          placeholder={placeholder}
          value={value}
          maxLength={1000}
          autoFocus={autoFocus}
          aria-describedby={failed ? errorId : undefined}
          onChange={(event) => setValue(event.target.value)}
          fieldClassName={s.composerField}
        />
        <Button type='submit' loading={pending} disabled={!value.trim()}>
          {t('component.comments.submit')}
        </Button>
        {onCancel && (
          <Button type='button' variant='ghost' onClick={onCancel}>
            {t('component.comments.cancel')}
          </Button>
        )}
      </form>
      {failed && (
        <p id={errorId} role='alert' className={s.alert}>
          {t('component.comments.submit-error')}
        </p>
      )}
    </>
  );
}

function CommentItem({
  comment,
  onReply,
}: {
  comment: Comment;
  onReply?: () => void;
}) {
  const { t } = useTranslation();
  const format = useFormat();
  const author = comment.user.name || t('component.user.unknown');

  return (
    <div className={s.item}>
      <Avatar name={author} src={comment.user.profile} size={32} />
      <div className={s.body}>
        <p className={s.meta}>
          <span className={s.author}>{author}</span>
          <time
            dateTime={parseServerDate(comment.created).toISOString()}
            className={s.time}
          >
            {format.relativeTime(comment.created)}
          </time>
        </p>
        <p className={s.content}>{comment.content}</p>
        {onReply && (
          <button type='button' className={s.replyButton} onClick={onReply}>
            {t('component.comments.reply')}
          </button>
        )}
      </div>
    </div>
  );
}

export type CommentSectionProps = {
  id?: string;
  comments: Comment[] | undefined;
  /** 불러오기 전에 제목에 보여줄 댓글 수 */
  total: number;
  status: 'pending' | 'error' | 'success';
  onRetry: () => void;
  /** 로그인했을 때만 쓸 수 있어요. */
  canWrite: boolean;
  onSubmit: (input: {
    content: string;
    upperCommentId?: number;
  }) => Promise<unknown>;
  /** 서버에서 페이지로 받는 댓글(게시글)은 더보기를 눌렀을 때 다음 페이지를 불러와요. */
  serverPaging?: {
    hasMore: boolean;
    loadingMore: boolean;
    onLoadMore: () => void;
  };
  className?: string;
};

/** 댓글 목록과 입력칸. 답글은 한 단계까지 보여줘요. */
export function CommentSection({
  id,
  comments,
  total,
  status,
  onRetry,
  canWrite,
  onSubmit,
  serverPaging,
  className,
}: CommentSectionProps) {
  const { t } = useTranslation();
  const loginHref = useAuthHref();
  const headingId = useId();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const threads = useMemo(() => toThreads(comments ?? []), [comments]);
  const count = comments?.length ?? total;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={clsx(s.section, className)}
    >
      <h2 id={headingId} className={s.heading}>
        {t('component.comments.heading', { count })}
      </h2>

      {canWrite ? (
        <CommentComposer
          label={t('component.comments.label')}
          placeholder={t('component.comments.placeholder')}
          onSubmit={(content) => onSubmit({ content })}
        />
      ) : (
        <p className={s.loginPrompt}>
          {t('component.comments.login')}
          <Link
            to={loginHref}
            className={buttonStyles({ variant: 'secondary', size: 'sm' })}
          >
            {t('component.topnav.login')}
          </Link>
        </p>
      )}

      {status === 'pending' && (
        <div
          role='status'
          aria-label={t('component.base.infinite-scroll.loading')}
        >
          {[0, 1].map((index) => (
            <div key={index} className={s.item} aria-hidden='true'>
              <Skeleton width={32} height={32} radius='50%' />
              <div className={s.body}>
                <Skeleton width={120} height={12} />
                <Skeleton width='80%' height={14} />
              </div>
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className={s.status}>
          {t('component.comments.error')}{' '}
          <Button variant='ghost' size='sm' onClick={onRetry}>
            {t('page.debate.item.retry')}
          </Button>
        </p>
      )}

      {status === 'success' && threads.length === 0 && (
        <p className={s.status}>{t('component.comments.empty')}</p>
      )}

      {threads.length > 0 && (
        <ul className={s.list}>
          {(serverPaging ? threads : threads.slice(0, visible)).map(
            ({ comment, replies }) => {
              const author = comment.user.name || t('component.user.unknown');
              return (
                <li key={comment.id}>
                  <CommentItem
                    comment={comment}
                    onReply={
                      canWrite
                        ? () =>
                            setReplyTo((current) =>
                              current === comment.id ? null : comment.id
                            )
                        : undefined
                    }
                  />
                  {replies.length > 0 && (
                    <ul
                      className={s.replies}
                      aria-label={t('component.comments.replies', {
                        name: author,
                      })}
                    >
                      {replies.map((reply) => (
                        <li key={reply.id}>
                          <CommentItem comment={reply} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {replyTo === comment.id && (
                    <div className={s.replyForm}>
                      <CommentComposer
                        label={t('component.comments.reply-label', {
                          name: author,
                        })}
                        placeholder={t('component.comments.reply-placeholder')}
                        autoFocus
                        onCancel={() => setReplyTo(null)}
                        onSubmit={(content) =>
                          onSubmit({ content, upperCommentId: comment.id })
                        }
                      />
                    </div>
                  )}
                </li>
              );
            }
          )}
        </ul>
      )}

      {serverPaging
        ? serverPaging.hasMore && (
            <Button
              variant='neutral'
              fullWidth
              className={s.more}
              loading={serverPaging.loadingMore}
              onClick={serverPaging.onLoadMore}
            >
              {t('component.comments.more')}
            </Button>
          )
        : threads.length > visible && (
            <Button
              variant='neutral'
              fullWidth
              className={s.more}
              onClick={() => setVisible((current) => current + PAGE_SIZE)}
            >
              {t('component.comments.more')}
            </Button>
          )}
    </section>
  );
}
