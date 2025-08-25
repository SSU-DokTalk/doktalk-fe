import { SummaryType } from '@/types/data';
import Image from '@/components/base/Image';
import ProfileIcon from '@/components/base/ProfileIcon';
import { useNavigate } from 'react-router-dom';

function CarouselSummaryCard({ summary }: { summary: SummaryType }) {
  const navigate = useNavigate();

  return (
    <div
      id='carousel-summary-card'
      className='cursor-pointer'
      onClick={() => navigate(`/summary/${summary.id}`)}
    >
      <Image
        src={summary.book.image}
        alt='book cover'
        width={65}
        height={100}
        noImageFontSize={40}
        noImageTextFontSize={10}
      />
      <div className='summary-info'>
        <div className='summary-content-container'>
          <div className='summary-title'>{summary.title}</div>
          <div className='summary-content'>{summary.free_content}</div>
        </div>
        <div className='user-info'>
          <ProfileIcon profile={summary.user.profile} size={20} />
          <div className='user-name'>{summary.user.name}</div>
        </div>
      </div>
    </div>
  );
}

export default CarouselSummaryCard;
