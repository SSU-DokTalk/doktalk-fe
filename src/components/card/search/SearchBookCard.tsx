import { BookType } from '@/types/data';
import Image from '@/components/base/Image';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { updateGlobalState } from '@/stores/globalStates';
import { useAppDispatch } from '@/stores/hooks';

interface SearchBookCardProps {
  book: BookType;
  isInLibrary: boolean;
  setIsInLibrary: React.Dispatch<React.SetStateAction<number[]>>;
}

function SearchBookCard({
  book,
  isInLibrary,
  setIsInLibrary,
}: SearchBookCardProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const addToLibrary = () => {
    axios.post(`/api/library/${book.isbn}`).then(() => {
      setIsInLibrary((prv) => prv.concat([book.isbn]));
      book.in_library_num++;
      dispatch(updateGlobalState({ isLibraryUpdated: true }));
    });
  };

  const removeFromLibrary = () => {
    axios.delete(`/api/library/${book.isbn}`).then(() => {
      setIsInLibrary((prv) => prv.filter((isbn) => isbn !== book.isbn));
      book.in_library_num--;
      dispatch(updateGlobalState({ isLibraryUpdated: true }));
    });
  };

  return (
    <div className='search-card book'>
      <div className='card-main-content'>
        <div className='card-image-wrapper'>
          <Image
            src={book.image}
            className='w-full h-full'
            objectFit='contain'
          />
        </div>
        <div className='card-content-wrapper'>
          <h3 className='card-title'>{book.title}</h3>

          <div className='book-meta'>
            <div className='meta-row'>
              <span className='label'>저자</span>
              <span className='value'>
                {book.author &&
                  (book.author.split('^').length > 2
                    ? `${book.author.split('^').slice(0, 2).join(', ')} 외`
                    : `${book.author.split('^').slice(0, 2)}`)}
              </span>
            </div>
            <div className='meta-row'>
              <span className='label'>출판</span>
              <span className='value'>{book.publisher}</span>
            </div>
            <div className='meta-row'>
              <span className='label'>발행</span>
              <span className='value'>{`${book.pubdate.slice(0, 4)}.${book.pubdate.slice(4, 6)}`}</span>
            </div>
          </div>

          <p className='card-description'>
            {book.description?.replace('\n', ' ')}
          </p>
        </div>
      </div>

      <div className='card-buttons'>
        <button
          className={`action-btn ${isInLibrary ? 'remove' : 'add'}`}
          onClick={isInLibrary ? removeFromLibrary : addToLibrary}
        >
          {isInLibrary
            ? t('component.card.book.button.remove-from-library')
            : t('component.card.book.button.add-to-library')}
        </button>
        <div className='library-count'>
          <span className='icon'>📚</span>
          <span>
            {t('component.card.book.button.in-library-num')}{' '}
            {book.in_library_num}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchBookCard;
