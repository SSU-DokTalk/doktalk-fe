import { BasicUserType } from '@/types/data';
import Image from '@/components/base/Image';
import ProfileIcon from '@/components/base/ProfileIcon';
import { getTimeDiff } from '@/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faHeart as faHeartRegular,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

export function PostBaseCard({
  user,
  title,
  content,
  created,
  imgSrc,
  likes_num,
  comments_num,
  hasLiked,
  onClick,
  doLike,
  doUnlike,
}: {
  user: BasicUserType;
  title: string;
  content: string;
  created: Date;
  imgSrc?: string;
  likes_num: number;
  comments_num: number;
  hasLiked?: boolean;
  onClick: () => void;
  doLike: () => void;
  doUnlike: () => void;
}) {
  return (
    <div className='post-base-card cursor-pointer w-full py-4! px-4! md:py-5! md:px-11!'>
      <div className='user-info-for-mobile mb-2! flex md:hidden'>
        <ProfileIcon profile={user.profile} size={28} className='user-icon' />
        <div className='user-name'>{user.name}</div>
        <div className='created-time'>{getTimeDiff(created)}</div>
      </div>

      <div className='flex items-center h-36 gap-5 flex-row-reverse md:flex-row'>
        <div className='image-container'>
          <Image src={imgSrc} alt='summary image' width='97px' height='142px' />
        </div>

        <div className='item-container'>
          <div className='item-content-container' onClick={onClick}>
            <div className='title'>{title}</div>
            <div className='content'>{content}</div>
          </div>

          <div className='info-container'>
            <div className='user-info-for-pc hidden md:flex'>
              <ProfileIcon
                profile={user.profile}
                size={28}
                className='user-icon'
              />
              <div className='user-name'>{user.name}</div>
              <div className='created-time'>{getTimeDiff(created)}</div>
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
                <div className='like-text'>{likes_num}</div>
              </div>

              <div className='comment-container'>
                <FontAwesomeIcon icon={faComment} />
                <div className='comment-text'>{comments_num}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
