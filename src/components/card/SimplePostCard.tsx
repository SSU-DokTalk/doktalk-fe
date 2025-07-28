import Image from '@/components/base/Image';
import { useNavigate } from 'react-router-dom';

function SimpleCard({
  title,
  content,
  thumbnail,
  navigateTo,
  width = '',
  height = '',
  imageHeight = 'h-36',
}: {
  title: string;
  content: string;
  thumbnail?: string;
  navigateTo: string;
  width?: string;
  height?: string;
  imageHeight?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${width} ${height} `}
      onClick={() => navigate(navigateTo)}
    >
      <div
        className={`bg-gray-300 flex items-center justify-center ${imageHeight}`}
      >
        <Image
          src={thumbnail}
          alt='post image'
          objectFit='contain'
          // objectFit='cover'
          className='w-full h-full'
        />
      </div>
      <div className='p-4!'>
        <h2 className='text-xl font-bold! text-gray-800 line-clamp-1'>
          {title}
        </h2>
        <p className='text-gray-600 mt-2! line-clamp-1'>
          {content || '내용이 없습니다.'}
        </p>
      </div>
    </div>
  );
}

export default SimpleCard;
