import { SummaryType } from '@/types/data';
import Image from '@/components/base/Image';
import ProfileIcon from '@/components/base/ProfileIcon';
import { getTimeDiff } from '@/functions';
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faHeart as faHeartRegular,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div id='summary-card'>
      <div className='image-container'>
        <Image
          src={summary.book.image}
          alt='summary image'
          width='97px'
          height='142px'
        />
      </div>
      <div className='item-container'>
        <div
          className='item-content-container'
          onClick={() => navigate(`/summary/${summary.id}`)}
        >
          <div className='title'>{summary.title}</div>
          <div className='content'>{summary.free_content}</div>
        </div>
        <div className='info-container'>
          <div className='user-info'>
            <ProfileIcon
              profile={summary.user.profile}
              size={28}
              className='user-icon'
            />
            <div className='user-name'>{summary.user.name}</div>
            <div className='created-time'>{getTimeDiff(summary.created)}</div>
          </div>
          <div className='additional-info'>
            <div className='like-container'>
              {hasLiked ? (
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  onClick={doUnlike}
                  className='like-icon liked'
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeartRegular}
                  onClick={doLike}
                  className='like-icon'
                />
              )}
              <div className='like-text'>{summary.likes_num}</div>
            </div>
            <div className='comment-container'>
              <FontAwesomeIcon icon={faComment} />
              <div className='comment-text'>{summary.comments_num}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
