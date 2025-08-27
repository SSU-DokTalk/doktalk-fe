import { BookType } from '@/types/data';
import Image from '@/components/base/Image';

function Book({ book }: { book: BookType }) {
  return (
    <div id='book' className='mx-1!'>
      <div className='aspect-2/3'>
        <Image
          src={book.image}
          alt={'book thumbnail'}
          className='book-thumbnail w-full h-full object-fill'
          objectFit='fill'
          style={{
            boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.25)',
          }}
        />
      </div>
      <div
        className='book-title'
        style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#000080',
          marginTop: '10px',

          textAlign: 'center',
          overflow: 'hidden',
          whiteSpace: 'normal',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          lineClamp: '2',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
          wordBreak: 'break-word',
        }}
      >
        {book.title}
      </div>
      <div
        className='book-author'
        style={{
          fontSize: '15px',
          color: '#666565',
          width: '100%',

          textAlign: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          wordBreak: 'break-all',
        }}
      >
        {book.author}
      </div>
    </div>
  );
}

export default Book;
