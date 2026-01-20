import { useNavigate } from 'react-router-dom';
import Image from '@/components/base/Image';
import { DebateType } from '@/types/data';
import { formatDistanceToNow } from 'date-fns';
import { ko, enUS, mn } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

interface SearchDebateCardProps {
  debate: DebateType;
}

function SearchDebateCard({ debate }: SearchDebateCardProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const locales: { [key: string]: any } = {
    kr: ko,
    us: enUS,
    mn: mn,
  };

  return (
    <div
      className='search-card debate'
      onClick={() => navigate(`/debate/${debate.id}`)}
    >
      <div className='card-image-wrapper'>
        <Image
          src={debate.book.image}
          alt={debate.title}
          objectFit='contain' // Book covers usually look better contained
          className='w-full h-full'
        />
      </div>
      <div className='card-content-wrapper'>
        <h3 className='card-title'>{debate.title}</h3>
        <p className='card-description'>{debate.content}</p>

        <div className='card-footer'>
          <div className='user-info'>
            <span className='author'>{debate.user.name}</span>
            <span className='divider'>|</span>
            <span className='date'>
              {formatDistanceToNow(new Date(debate.created), {
                addSuffix: true,
                locale: locales[i18n.language] || ko,
              })}
            </span>
          </div>
          <div className='stats-info'>
            <span className='stat-item'>
              <span className='icon'>💬</span> {debate.comments_num}
            </span>
            <span className='stat-item'>
              <span className='icon'>❤️</span> {debate.likes_num}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchDebateCard;
