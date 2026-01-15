import { DebateType } from '@/types/data';
import Image from '@/components/base/Image';
import { useNavigate } from 'react-router-dom';

function LandingDebateCard({ debate }: { debate: DebateType }) {
  const navigate = useNavigate();

  return (
    <div
      className='landing-debate-card'
      onClick={() => navigate(`/debate/${debate.id}`)}
    >
      <div className='relative'>
        <Image
          src={debate.book.image}
          alt={debate.book.title}
          width='100%'
          height='18rem'
          className='rounded-lg shadow-md w-full'
          noImageFontSize={40}
          noImageTextFontSize={10}
        />
      </div>
      <div className='book-info'>
        <div className='book-author'>{debate.book.author}</div>
        <div className='book-title'>{debate.book.title}</div>
      </div>
    </div>
  );
}

export default LandingDebateCard;
