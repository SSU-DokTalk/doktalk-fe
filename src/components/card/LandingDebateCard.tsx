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
      <div className='debate-thumbnail'>
        <Image
          src={debate.book.image}
          alt={debate.book.title}
          width='100%'
          height='166px'
          objectFit='contain'
          noImageFontSize={30}
          noImageTextFontSize={8}
        />
      </div>
      <div className='debate-info'>
        <div className='debate-title'>{debate.title || debate.book.title}</div>
        <div className='debate-preview'>{debate.content}</div>
      </div>
    </div>
  );
}

export default LandingDebateCard;
