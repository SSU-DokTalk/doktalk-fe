import { SummaryType } from '@/types/data';
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PostBaseCard } from './PostBaseCard';

function SummaryCard({
  summary,
  hasLiked = false,
  setHasLiked,
}: {
  summary: SummaryType;
  hasLiked?: boolean;
  setHasLiked: Dispatch<SetStateAction<number[]>>;
}) {
  const navigate = useNavigate();

  const doLike = () => {
    // Like API 호출
    axios.post(`/api/summary/${summary.id}/like`).then(() => {
      // 좋아요 성공
      setHasLiked((prv) => prv.concat([summary.id]));
      summary.likes_num++;
    });
  };

  const doUnlike = () => {
    axios.delete(`/api/summary/${summary.id}/like`).then(() => {
      setHasLiked((prv) => prv.filter((val) => val !== summary.id));
      summary.likes_num--;
    });
  };

  const onClick = () => navigate(`/summary/${summary.id}`);

  return (
    <div id='summary-card'>
      <PostBaseCard
        // user={summary.user}
        // title={summary.title}
        // created={summary.created}
        // imgSrc={summary.book.image}
        // likes_num={summary.likes_num}
        // comments_num={summary.comments_num}
        {...summary}
        content={summary.free_content}
        imgSrc={summary.book.image}
        hasLiked={hasLiked}
        onClick={onClick}
        doLike={doLike}
        doUnlike={doUnlike}
      />
    </div>
  );
}

export default SummaryCard;
