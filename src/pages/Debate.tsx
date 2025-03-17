import { DUMMY_DEBATES } from '@/common/dummy_data';
import CarouselDebateCard from '@/components/card/CarouselDebateCard';
import Carousel from '@/components/carousel/Carousel';
import { DebateType, SummaryType } from '@/types/data';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useEffect, useRef, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import WriteIcon from '@/assets/images/write.svg?react';
import DebateCard from '@/components/card/DebateCard';
import InfiniteScroll from '@/components/base/InfiniteScroll';
import PopularSummaryCard from '@/components/card/PopularSummaryCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';
import axios from 'axios';
import useDebounce from '@/hooks/useDebounce';
import { getDate, range } from '@/functions';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import CategoryCard from '@/components/card/CategoryCard';
import SearchDropdown from '@/components/dropdown/SearchByDropdown';
import { isMd } from '@/functions/breakpoint';
import { SearchBar } from '@/components/input/searchbar';
import { Fab, IconButton } from '@mui/material';
import { MiddlePanel, RightPanel } from '@/components/panel/sidePanel';

const searchBys: {
  name: string;
  value: 'bt' | 'it';
}[] = [
  {
    name: 'page.debate.search.book-title',
    value: 'bt',
  },
  {
    name: 'page.debate.search.item-title',
    value: 'it',
  },
];

const sortBys: {
  name: string;
  value: 'latest' | 'popular' | 'from';
}[] = [
  {
    name: 'page.debate.sort.latest',
    value: 'latest',
  },
  {
    name: 'page.debate.sort.popular',
    value: 'popular',
  },
  {
    name: 'page.debate.sort.from',
    value: 'from',
  },
];

const years = range(10 + getYear(new Date()) - 2025, 2025, 1);
const months = [
  'function.time.months.1',
  'function.time.months.2',
  'function.time.months.3',
  'function.time.months.4',
  'function.time.months.5',
  'function.time.months.6',
  'function.time.months.7',
  'function.time.months.8',
  'function.time.months.9',
  'function.time.months.10',
  'function.time.months.11',
  'function.time.months.12',
];

function Debate() {
  const [recommendDebates, ..._] = useState<DebateType[]>(DUMMY_DEBATES);

  const [debates, setDebates] = useState<DebateType[]>([]);
  const [debatePage, setDebatePage] = useState<number>(1);
  const [debateHasMore, setDebateHasMore] = useState<boolean>(true);
  const [debateLikes, setDebateLikes] = useState<number[]>([]);

  const [popularSummaries, setPopularSummaries] = useState<SummaryType[]>([]);
  const [popularSummaryLikes, setPopularSummaryLikes] = useState<number[]>([]);
  const [isPopularSummaryLoaded, setIsPopularSummaryLoaded] =
    useState<boolean>(false);

  const [categories, setCategories] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [searchByIdx, setSearchByIdx] = useState<number>(0);
  const [sortByIdx, setSortByIdx] = useState<number>(0);
  const [from, setFrom] = useState<Date>(new Date());
  const debouncedSearch = useDebounce(search, 500);
  const prevValueRef = useRef<{
    categories: number;
    debouncedSearch: string;
    searchByIdx: number;
    sortByIdx: number;
    from: Date;
  }>({
    categories: 0,
    debouncedSearch: '',
    searchByIdx: 0,
    sortByIdx: 0,
    from: new Date(),
  });

  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const CustomDatePicker = forwardRef<any, any>(
    ({ value, onClick, className }, ref) => (
      <div className={className} onClick={onClick} ref={ref}>
        <IonIcon name='calendar-outline' className='sort-by-icon' />
        <span className='date-text'>{value}</span>
      </div>
    )
  );

  useEffect(() => {
    if (
      prevValueRef.current.categories === categories &&
      prevValueRef.current.debouncedSearch === debouncedSearch &&
      prevValueRef.current.searchByIdx === searchByIdx &&
      prevValueRef.current.sortByIdx === sortByIdx &&
      prevValueRef.current.from === from
    )
      return;
    prevValueRef.current = {
      categories,
      debouncedSearch,
      searchByIdx,
      sortByIdx,
      from,
    };
  }, [categories, debouncedSearch, searchByIdx, sortByIdx, from]);

  useEffect(() => {
    if (popularSummaries.length === 0 && !isPopularSummaryLoaded) {
      axios
        .get(`/api/summary/popular`)
        .then(async (res) => {
          let { data: items }: { data: SummaryType[] } = res;
          setPopularSummaries(items);

          if (user.id == 0 || !items || items.length === 0) return;

          await axios
            .get(
              `/api/summarys/like?${items
                .map((item) => 'ids=' + item.id)
                .join('&')}`
            )
            .then((res) => {
              let { data: itemLikes }: { data: number[] } = res;
              setPopularSummaryLikes((prev) => prev.concat(itemLikes));
            });
        })
        .finally(() => {
          setIsPopularSummaryLoaded(true);
        });
    }
  });

  return (
    <div id='debate-page'>
      <div className='upper-content flex'>
        <MiddlePanel>
          <div className='recommend-content-container md:my-9!'>
            <div className='recommend-content-title ml-6!'>
              {t('page.debate.title.recommend')}
            </div>
            <Carousel
              size={isMd() ? 3 : 1}
              className='recommend-content mx-auto! md:m-0!'
            >
              {recommendDebates.map((debate, idx) => (
                <CarouselDebateCard
                  key={'recommend-debate' + idx}
                  debate={debate}
                />
              ))}
            </Carousel>
          </div>

          <CategoryCard categories={categories} setCategories={setCategories} />
        </MiddlePanel>

        <RightPanel />
      </div>

      <div className='lower-content flex'>
        <MiddlePanel>
          <div className='left-container w-full'>
            <SearchBar
              placeholder={t('page.debate.search.placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <SearchDropdown
                searchBys={searchBys}
                searchByIdx={searchByIdx}
                setSearchByIdx={setSearchByIdx}
              />
            </SearchBar>

            <div className='content-header'>
              <div className='sort-by'>
                {sortBys.map((sortBy, index) => {
                  return (
                    <div
                      key={'sort-by' + index}
                      className='sort-by-text'
                      style={
                        sortByIdx === index
                          ? {
                              color: '#000080',
                            }
                          : {}
                      }
                      onClick={() => setSortByIdx(index)}
                    >
                      {t(sortBy.name)}
                      {sortBy.value == 'from' ? (
                        <DatePicker
                          selected={from}
                          onChange={(date) => setFrom(date ?? new Date())}
                          dateFormat='yyyy/MM/dd'
                          minDate={new Date('2025-01-01')}
                          maxDate={
                            new Date(`${getYear(new Date()) + 10}-12-31`)
                          }
                          customInput={
                            <CustomDatePicker className='custom-input' />
                          }
                          showDisabledMonthNavigation
                          renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                          }) => (
                            <div
                              style={{
                                margin: 10,
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <button
                                onClick={decreaseMonth}
                                disabled={prevMonthButtonDisabled}
                              >
                                {'<'}
                              </button>
                              <select
                                value={getYear(date)}
                                onChange={({ target: { value } }) =>
                                  changeYear(parseInt(value))
                                }
                              >
                                {years.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>

                              <select
                                value={months[getMonth(date)]}
                                onChange={({ target: { value } }) =>
                                  changeMonth(months.indexOf(value))
                                }
                              >
                                {months.map((option) => (
                                  <option key={option} value={option}>
                                    {t(option)}
                                  </option>
                                ))}
                              </select>

                              <button
                                onClick={increaseMonth}
                                disabled={nextMonthButtonDisabled}
                              >
                                {'>'}
                              </button>
                            </div>
                          )}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className='create-debate'>
                <div className='for-pc hidden md:block'>
                  <button
                    className='create-debate-button'
                    onClick={() => navigate('/debate/create')}
                  >
                    <span>{t('page.debate.button.create')}</span>
                    <WriteIcon
                      className='write-icon'
                      width={17}
                      fill={'#ffffff'}
                    />
                  </button>
                </div>
                <div className='for-mobile md:hidden'>
                  <Fab className='create-debate-floating-button fixed! bottom-20 right-4 bg-brand1!'>
                    <IconButton onClick={() => navigate('/debate/create')}>
                      <FontAwesomeIcon icon={faPen} color='white' />
                    </IconButton>
                  </Fab>
                </div>
              </div>
            </div>

            <div className='content-container'>
              <InfiniteScroll
                api={`debate?category=${categories}&search=${debouncedSearch}&searchby=${
                  searchBys[searchByIdx].value
                }&sortby=${sortBys[sortByIdx].value}${
                  sortByIdx == 2 ? '&from_=' + getDate(from) : ''
                }`}
                likes_api={`debates/like`}
                setItems={setDebates}
                page={debatePage}
                setPage={setDebatePage}
                hasMore={debateHasMore}
                setHasMore={setDebateHasMore}
                likes={debateLikes}
                setLikes={setDebateLikes}
                hasNoItem={debates.length === 0}
                hasNoItemMessage={t('page.debate.item.no-debate-item')}
                refreshCondition={
                  categories !== prevValueRef.current.categories ||
                  debouncedSearch !== prevValueRef.current.debouncedSearch ||
                  searchByIdx !== prevValueRef.current.searchByIdx ||
                  sortByIdx !== prevValueRef.current.sortByIdx ||
                  from !== prevValueRef.current.from
                }
                dependency={[prevValueRef]}
              >
                {debates.map((debate, index) => (
                  <DebateCard
                    key={'debate' + index}
                    debate={debate}
                    hasLiked={debateLikes.includes(debate.id)}
                    setHasLiked={setDebateLikes}
                  />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </MiddlePanel>

        <RightPanel>
          <div className='right-container ml-4! mr-8!'>
            <div className='right-container-title'>
              {t('page.debate.title.popular')}
            </div>
            <div className='right-container-content'>
              {popularSummaries.map((summary, index) => (
                <PopularSummaryCard
                  key={'summary' + index}
                  summary={summary}
                  hasLiked={popularSummaryLikes.includes(summary.id)}
                  setHasLiked={setPopularSummaryLikes}
                />
              ))}
            </div>
          </div>
        </RightPanel>
      </div>

      <div className='footer' />
    </div>
  );
}

export default Debate;
