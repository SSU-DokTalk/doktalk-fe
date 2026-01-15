import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// Import card components
import SearchDebateCard from '@/components/card/search/SearchDebateCard';
import SearchSummaryCard from '@/components/card/search/SearchSummaryCard';
import SearchPostCard from '@/components/card/search/SearchPostCard';
import SearchBookCard from '@/components/card/search/SearchBookCard';

// Import types
import { DebateType, SummaryType, PostType, BookType } from '@/types/data';
import { useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';

function IntegratedSearch() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  const [booksInLibrary, setBooksInLibrary] = useState<number[]>([]);

  // Results state
  const [debates, setDebates] = useState<DebateType[]>([]);
  const [summaries, setSummaries] = useState<SummaryType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch data when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      fetchAllData();
    }
  }, [searchQuery]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const results = await Promise.allSettled([
        fetchDebates(),
        fetchSummaries(),
        fetchPosts(),
        fetchBooks(),
      ]);

      results.forEach((result, idx) => {
        if (result.status === 'rejected') {
          const source = ['Debates', 'Summaries', 'Posts', 'Books'][idx];
          console.error(`Error fetching ${source}:`, result.reason);
        }
      });
    } catch (error) {
      console.error('Unexpected error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDebates = async () => {
    try {
      const response = await axios.get(
        `/api/debate?search=${searchQuery}&searchby=it&sortby=latest`
      );
      setDebates(response.data.items || []);
    } catch (error) {
      console.error('Error fetching debates:', error);
      setDebates([]);
    }
  };

  const fetchSummaries = async () => {
    try {
      const response = await axios.get(
        `/api/summary?search=${searchQuery}&searchby=it&sortby=latest`
      );
      setSummaries(response.data.items || []);
    } catch (error) {
      console.error('Error fetching summaries:', error);
      setSummaries([]);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/post?search=${searchQuery}`);
      setPosts(response.data.items || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `/api/books?search=${searchQuery}&sortby=latest&api_provider=naver`
      );
      const bookItems = response.data.items || [];
      setBooks(bookItems);

      // Fetch library status if user is logged in
      if (user.id !== 0 && bookItems.length > 0) {
        try {
          const params = new URLSearchParams();
          bookItems.forEach((item: BookType) =>
            params.append('isbns', String(item.isbn))
          );
          const libraryResponse = await axios.get(
            `/api/books/library?${params.toString()}`
          );
          setBooksInLibrary(libraryResponse.data || []);
        } catch (error) {
          console.error('Error fetching book library status:', error);
          setBooksInLibrary([]);
        }
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

  return (
    <div id='integrated-search-page'>
      {/* Search Header */}
      <div className='search-header'>
        <h1>{t('page.integrated-search.title')}</h1>
        {searchQuery && (
          <p className='search-query-text'>
            "<span className='query-highlight'>{searchQuery}</span>"
            {t('page.integrated-search.search-result')}
          </p>
        )}
      </div>

      {/* 독서토론 섹션 */}
      <section className='search-section'>
        <div className='section-header'>
          <h2>{t('page.integrated-search.sections.debate')}</h2>
          <div className='section-divider'></div>
        </div>
        <div className='results-container'>
          {isLoading ? (
            <div className='loading'>
              <p>{t('common.loading')}</p>
            </div>
          ) : debates.length > 0 ? (
            <div className='results-list'>
              {debates.map((debate) => (
                <div key={debate.id} className='result-card'>
                  <SearchDebateCard debate={debate} />
                </div>
              ))}
            </div>
          ) : (
            <div className='no-results'>
              <p>{t('page.integrated-search.no-results')}</p>
            </div>
          )}
        </div>
      </section>

      {/* 도서 요약 섹션 */}
      <section className='search-section'>
        <div className='section-header'>
          <h2>{t('page.integrated-search.sections.summary')}</h2>
          <div className='section-divider'></div>
        </div>
        <div className='results-container'>
          {isLoading ? (
            <div className='loading'>
              <p>{t('common.loading')}</p>
            </div>
          ) : summaries.length > 0 ? (
            <div className='results-list'>
              {summaries.map((summary) => (
                <div key={summary.id} className='result-card'>
                  <SearchSummaryCard summary={summary} />
                </div>
              ))}
            </div>
          ) : (
            <div className='no-results'>
              <p>{t('page.integrated-search.no-results')}</p>
            </div>
          )}
        </div>
      </section>

      {/* 게시글 섹션 */}
      <section className='search-section'>
        <div className='section-header'>
          <h2>{t('page.integrated-search.sections.post')}</h2>
          <div className='section-divider'></div>
        </div>
        <div className='results-container'>
          {isLoading ? (
            <div className='loading'>
              <p>{t('common.loading')}</p>
            </div>
          ) : posts.length > 0 ? (
            <div className='results-list'>
              {posts.map((post) => (
                <div key={post.id} className='result-card'>
                  <SearchPostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className='no-results'>
              <p>{t('page.integrated-search.no-results')}</p>
            </div>
          )}
        </div>
      </section>

      {/* 도서 검색 섹션 */}
      <section className='search-section'>
        <div className='section-header'>
          <h2>{t('page.integrated-search.sections.book')}</h2>
          <div className='section-divider'></div>
        </div>
        <div className='results-container'>
          {isLoading ? (
            <div className='loading'>
              <p>{t('common.loading')}</p>
            </div>
          ) : books.length > 0 ? (
            <div className='results-list'>
              {books.map((book) => (
                <div key={book.isbn} className='result-card book-card-wrapper'>
                  <SearchBookCard
                    book={book}
                    isInLibrary={booksInLibrary.includes(book.isbn)}
                    setIsInLibrary={setBooksInLibrary}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='no-results'>
              <p>{t('page.integrated-search.no-results')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default IntegratedSearch;
