import { SummaryType } from '@/types/data';
import Image from '@/components/base/Image';
import { useNavigate } from 'react-router-dom';

function LandingSummaryCard({ summary }: { summary: SummaryType }) {
  const navigate = useNavigate();

  return (
    <div
      className='landing-summary-card'
      onClick={() => navigate(`/summary/${summary.id}`)}
    >
      <div className='relative'>
        <Image
          src={summary.book.image}
          alt={summary.book.title}
          width='100%'
          height='18rem'
          className='rounded-lg shadow-md w-full'
          noImageFontSize={40}
          noImageTextFontSize={10}
        />
      </div>
      <div className='book-info'>
        <div className='book-author'>{summary.book.author}</div>
        <div className='book-title'>{summary.book.title}</div>
      </div>
    </div>
  );
}

export default LandingSummaryCard;
