import ProfileIcon from '@/components/base/ProfileIcon';
import CommentCard from '../card/CommentCard';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CommentType } from '@/types/data';
import axios from 'axios';
import { useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';
import InfiniteScroll from '@/components/base/InfiniteScroll';
import { useTranslation } from 'react-i18next';

function CommentSection({
  itemType,
  itemId,
  total,
  setItem,
  api,
  commentsApi,
  commentLikesApi,
}: {
  itemType: 'post' | 'summary' | 'debate';
  itemId: number;
  total: number;
  setItem: Dispatch<SetStateAction<any>>;
  api: string;
  commentsApi: string;
  commentLikesApi: string;
}) {
  const { t } = useTranslation();
  const [commentData, setCommentData] = useState<string>('');
  const [upperComment, setUpperComment] = useState<number | undefined>(
    undefined
  );

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentPage, setCommentPage] = useState<number>(1);
  const [commentHasMore, setCommentHasMore] = useState<boolean>(true);
  const [commentLikes, setCommentLikes] = useState<number[]>([]);

  const [didComment, setDidComment] = useState<boolean>(false);

  const user = useAppSelector(selectUser);

  const doComment = () => {
    axios
      .post(`/api/${api}`, {
        upper_comment_id: upperComment,
        content: commentData,
      })
      .then(() => {
        setItem((prev: any) => {
          return {
            ...prev,
            comments_num: prev.comments_num + 1,
          };
        });
        setDidComment(true);
        setCommentData('');
        setUpperComment(undefined);
      });
  };

  useEffect(() => {}, [itemId, total]);

  return (
    <div id='comment-section'>
      <p className='title'>
        {t('component.section.comment.title')} {total}
      </p>
      <div className='comment-box'>
        <div className='comment-box__upper'>
          <ProfileIcon profile={user.profile} size={34} />
          <textarea
            value={commentData}
            onChange={(e) => setCommentData(e.target.value)}
            className='comment-box__input'
            placeholder={t('component.section.comment.placeholder')}
          />
        </div>
        <div className='comment-box__lower'>
          <button onClick={doComment}>
            {t('component.section.comment.button.submit')}
          </button>
        </div>
      </div>
      <InfiniteScroll
        api={commentsApi}
        likes_api={commentLikesApi}
        setItems={setComments}
        page={commentPage}
        setPage={setCommentPage}
        hasMore={commentHasMore}
        setHasMore={setCommentHasMore}
        likes={commentLikes}
        setLikes={setCommentLikes}
        hasNoItem={comments.length === 0}
        condition={itemId != 0}
        refreshCondition={didComment}
        dependency={[itemId, didComment]}
        afterFetchSuccess={async () => {
          await setDidComment(false);
        }}
        afterFetchFail={async () => {
          await setDidComment(false);
        }}
        hasNoItemComponent={<div></div>}
      >
        {comments.map((comment, idx) => (
          <CommentCard
            key={'comment' + idx}
            itemType={itemType}
            comment={comment}
            hasLiked={commentLikes.includes(comment.id)}
            setHasLiked={setCommentLikes}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default CommentSection;
