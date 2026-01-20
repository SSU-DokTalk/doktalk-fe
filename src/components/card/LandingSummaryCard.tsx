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
      {/* 책 이미지 */}
      <div className='summary-thumbnail'>
        <Image
          src={summary.book.image}
          alt={summary.book.title}
          width='75px'
          height='114px'
          objectFit='cover'
          noImageFontSize={20}
          noImageTextFontSize={8}
        />
      </div>
      {/* 콘텐츠 영역 */}
      <div className='summary-content'>
        <div className='summary-title'>{summary.title}</div>
        <div className='summary-preview'>{summary.free_content}</div>
      </div>
    </div>
  );
}

export default LandingSummaryCard;
