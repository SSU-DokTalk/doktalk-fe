import { ImagePlus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, mq } from '@/design-system';
import { PostComposer } from '@/features/post/components/PostComposer';
import * as prompt from '@/features/post/components/WritePrompt.css';
import { MyLibraryRail } from '@/features/search/components/MyLibraryRail';
import { PopularSummaries } from '@/features/summary/components/PopularSummaries';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useAuth } from '@/shell/hooks';
import { HomeFeed } from './HomeFeed';
import { UpcomingMeetings } from './UpcomingMeetings';
import * as s from './Main.css';

/** 로그인한 첫 화면 (F안): 인사·다가오는 모임, 글쓰기, 피드, 오른쪽 인기 요약·내 서재 */
export function MainHome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isWide = useMediaQuery(mq.xl);
  const { user } = useAuth();
  const viewerId = user.id ?? 0;
  const name = user.name || t('component.user.unknown');
  const [composing, setComposing] = useState(false);

  return (
    <div className={s.page}>
      <div className={s.content}>
        <UpcomingMeetings viewerId={viewerId} name={name} />

        <div className={`${prompt.prompt} ${s.flatPrompt}`}>
          <Avatar name={name} src={user.profile} size={40} />
          <button
            type='button'
            aria-haspopup='dialog'
            className={prompt.field}
            onClick={() => setComposing(true)}
          >
            {t('component.card.write-post.placeholder')}
          </button>
          <IconButton
            variant='ghost'
            aria-label={t('component.modal.write-post.button.add-photo')}
            aria-haspopup='dialog'
            className={s.photoButton}
            onClick={() => setComposing(true)}
          >
            <ImagePlus />
          </IconButton>
        </div>

        <HomeFeed viewerId={viewerId} />

        {!isWide && (
          <div className={s.below}>
            <PopularSummaries />
          </div>
        )}
      </div>

      {isWide && (
        <aside aria-label={t('page.home.main.rail')} className={s.rail}>
          <PopularSummaries />
          <MyLibraryRail viewerId={viewerId} />
        </aside>
      )}

      <PostComposer
        open={composing}
        onOpenChange={setComposing}
        onSaved={(id) => navigate(`/post/${id}`)}
      />
    </div>
  );
}
