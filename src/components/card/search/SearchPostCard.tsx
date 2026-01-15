import { useNavigate } from 'react-router-dom';
import Image from '@/components/base/Image';
import { PostType } from '@/types/data';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getFileTypeFromUrl } from '@/functions';
import { ACCEPTABLE_IMAGE } from '@/common/variables';

interface SearchPostCardProps {
  post: PostType;
}

function SearchPostCard({ post }: SearchPostCardProps) {
  const navigate = useNavigate();

  // Logic to find thumbnail (logic taken from PostCard.tsx)
  const thumbnail = post.files?.find((file) =>
    ACCEPTABLE_IMAGE.includes(`.${getFileTypeFromUrl(file.url)}`)
  )?.url;

  return (
    <div
      className='search-card post'
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <div className='card-image-wrapper'>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={post.title}
            objectFit='cover'
            className='w-full h-full'
          />
        ) : (
          <div className='no-image-placeholder'>
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className='card-content-wrapper'>
        <h3 className='card-title'>{post.title}</h3>
        <p className='card-description'>{post.content}</p>

        <div className='card-footer'>
          <div className='user-info'>
            <span className='author'>{post.user.name}</span>
            <span className='divider'>|</span>
            <span className='date'>
              {formatDistanceToNow(new Date(post.created), {
                addSuffix: true,
                locale: ko,
              })}
            </span>
          </div>
          <div className='stats-info'>
            <span className='stat-item'>
              <span className='icon'>💬</span> {post.comments_num}
            </span>
            <span className='stat-item'>
              <span className='icon'>❤️</span> {post.likes_num}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPostCard;
