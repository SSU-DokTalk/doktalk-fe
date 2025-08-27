import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { MyBookType, SummaryType } from '@/types/data';
import { useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';
import Book from '@/components/base/Book';
import SummaryCard from '@/components/card/SummaryCard';
import { CircularProgress } from '@mui/material';
import noImage from '@/assets/images/no-item.svg';
import { Link } from 'react-router-dom';
import InfiniteScroll from '@/components/base/InfiniteScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function MyLibrary() {
  const [myBooks, setMyBooks] = useState<MyBookType[]>([]);
  const [totalMyBooks, setTotalMyBooks] = useState<number>(0);
  const [hasLoadedMyBook, setHasLoadedMyBook] = useState<boolean>(false);

  const [purchasedSummaries, setPurchasedSummaries] = useState<SummaryType[]>(
    []
  );
  const [summaryPage, setSummaryPage] = useState<number>(1);
  const [summaryHasMore, setSummaryHasMore] = useState<boolean>(true);
  const [purchasedSummaryLikes, setPurchasedSummaryLikes] = useState<number[]>(
    []
  );

  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  useEffect(() => {
    if (user.id !== 0 && !hasLoadedMyBook) {
      axios
        .get(`/api/user/${user.id}/mybooks`)
        .then((res) => {
          let { items, total }: { items: MyBookType[]; total: number } =
            res.data;
          setMyBooks(items);
          setTotalMyBooks(total);
          setHasLoadedMyBook(true);
        })
        .catch((error) => {
          console.error('Error fetching my books:', error);
          setHasLoadedMyBook(true);
        });
    }
  }, [user.id, hasLoadedMyBook]);

  const handleDeleteBook = async (isbn: number) => {
    if (confirm(t('page.mypage.library.delete.confirm'))) {
      try {
        await axios.delete(`/api/library/${isbn}`);
        setMyBooks((prevBooks) =>
          prevBooks.filter((book) => book.book.isbn !== isbn)
        );
        setTotalMyBooks((prevTotal) => prevTotal - 1);
        alert(t('page.mypage.library.delete.success'));
      } catch (error) {
        console.error('Delete error:', error);
        alert(t('page.mypage.library.delete.error'));
      }
    }
  };

  return (
    <div className='my-library-page !max-w-6xl !mx-auto !px-4 !py-8'>
      {/* Page Header */}
      <div className='page-header !mb-8'>
        <h1 className='!text-3xl !font-bold !text-brand1 !mb-2'>
          {t('page.mypage.library.title')}
        </h1>
        <p className='!text-lg !text-gray-600'>
          {t('page.mypage.library.description')}
        </p>
      </div>

      {/* My Books Section */}
      <section className='my-books-section !mb-12'>
        <div className='section-header !mb-6'>
          <h2 className='!text-2xl !font-bold !text-gray-800 !mb-2'>
            {t('page.mypage.library.sections.my-books')}
            <span className='!ml-2 !text-brand1'>({totalMyBooks})</span>
          </h2>
          <div className='!w-full !h-px !bg-gray-200'></div>
        </div>

        <div className='books-container'>
          {!hasLoadedMyBook ? (
            <div className='loading !text-center !py-8'>
              <CircularProgress className='loading-spinner' />
              <p className='!mt-4 !text-gray-500'>{t('common.loading')}</p>
            </div>
          ) : myBooks.length === 0 ? (
            <div className='no-item !text-center !py-12'>
              <img
                src={noImage}
                alt='no image'
                width='122px'
                className='!mx-auto !mb-4'
              />
              <p className='!text-gray-500 !mb-4'>
                {t('page.mypage.library.no-books')}
              </p>
              <Link
                to='/search'
                className='!inline-block !px-6 !py-2 !bg-brand1 !text-white !rounded-lg hover:!bg-brand1/80 !transition-colors'
              >
                {t('page.mypage.library.go-to-search')}
              </Link>
            </div>
          ) : (
            <div className='books-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
              {myBooks.map((mybook, index) => (
                <div key={'book' + index} className='relative group'>
                  <button
                    className='absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full transition-all duration-200 z-10 shadow-lg flex items-center justify-center border-2 border-white cursor-pointer'
                    onClick={() => handleDeleteBook(mybook.book.isbn)}
                    title='도서 삭제'
                  >
                    <FontAwesomeIcon icon={faTimes} className='text-sm' />
                  </button>
                  <Book book={mybook.book} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Purchased Summaries Section */}
      <section className='purchased-summaries-section'>
        <div className='section-header !mb-6'>
          <h2 className='!text-2xl !font-bold !text-gray-800 !mb-2'>
            {t('page.mypage.library.sections.purchased-summaries')}
          </h2>
          <div className='!w-full !h-px !bg-gray-200'></div>
        </div>

        <div className='summaries-container'>
          <InfiniteScroll
            api={`user/${user.id}/summaries`}
            likes_api={`summarys/like`}
            setItems={setPurchasedSummaries}
            page={summaryPage}
            setPage={setSummaryPage}
            hasMore={summaryHasMore}
            setHasMore={setSummaryHasMore}
            likes={purchasedSummaryLikes}
            setLikes={setPurchasedSummaryLikes}
            hasNoItem={purchasedSummaries.length === 0}
            hasNoItemMessage={t('page.mypage.library.no-summaries')}
            condition={user.id !== 0}
          >
            {purchasedSummaries.map((summary, index) => (
              <div key={'purchased_summary' + index} className='!mb-4'>
                <SummaryCard
                  summary={summary}
                  hasLiked={purchasedSummaryLikes.includes(summary.id)}
                  setHasLiked={setPurchasedSummaryLikes}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}

export default MyLibrary;
