import Image from '@/components/base/Image';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface LandingPostCardProps {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  likeCount?: number;
  commentCount?: number;
  author?: string;
  createdAt?: Date;
}

function LandingPostCard({
  id,
  title,
  content,
  thumbnail,
  likeCount = 0,
  commentCount = 0,
  author = '익명',
  createdAt = new Date(),
}: LandingPostCardProps) {
  const navigate = useNavigate();

  return (
    <div className='landing-post-card' onClick={() => navigate(`/post/${id}`)}>
      <div className='post-content-wrapper'>
        {/* 썸네일 이미지 */}
        <div className='post-thumbnail'>
          <Image
            src={thumbnail}
            alt={title}
            objectFit='cover'
            className='w-full h-full'
          />
        </div>

        {/* 콘텐츠 영역 */}
        <div className='post-info'>
          {/* 제목과 내용 */}
          <div className='post-text'>
            <h3 className='post-title'>{title}</h3>
            <p className='post-content'>{content}</p>
          </div>

          {/* 하단 정보 */}
          <div className='post-meta'>
            <span className='meta-item author'>{author}</span>
            <span className='divider'>|</span>
            <span className='meta-item date'>
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
                locale: ko,
              })}
            </span>
            <span className='divider'>|</span>
            {/* 댓글 */}
            <div className='meta-item stats'>
              <svg
                className='w-4 h-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              <span>{commentCount}</span>
            </div>
            <span className='divider'>|</span>
            {/* 좋아요 */}
            <div className='meta-item stats'>
              <svg
                className='w-4 h-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
              <span>{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPostCard;
