import { useNavigate } from 'react-router-dom';
import Image from '@/components/base/Image';
import { SummaryType } from '@/types/data';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface SearchSummaryCardProps {
  summary: SummaryType;
}

function SearchSummaryCard({ summary }: SearchSummaryCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className='search-card summary'
      onClick={() => navigate(`/summary/${summary.id}`)}
    >
      <div className='card-image-wrapper'>
        <Image
          src={summary.book.image}
          alt={summary.book.title}
          objectFit='contain'
          className='w-full h-full'
        />
      </div>
      <div className='card-content-wrapper'>
        <h3 className='card-title'>{summary.book.title}</h3>
        <p className='card-description'>{summary.free_content}</p>

        <div className='card-footer'>
          <div className='user-info'>
            <span className='author'>{summary.user.name}</span>
            <span className='divider'>|</span>
            <span className='date'>
              {formatDistanceToNow(new Date(summary.created), {
                addSuffix: true,
                locale: ko,
              })}
            </span>
          </div>
          <div className='stats-info'>
            <span className='stat-item'>
              <span className='icon'>💬</span> {summary.comments_num}
            </span>
            <span className='stat-item'>
              <span className='icon'>❤️</span> {summary.likes_num}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSummaryCard;
