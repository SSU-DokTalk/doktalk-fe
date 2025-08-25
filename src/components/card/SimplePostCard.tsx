import Image from '@/components/base/Image';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer ${width} ${height} `}
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
          {content || t('component.card.simple-post.no-content')}
        </p>
      </div>
    </div>
  );
}

export default SimpleCard;
