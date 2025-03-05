import Carousel from "@/components/carousel/Carousel";
import InfiniteScroll from "@/components/base/InfiniteScroll";
import { useEffect, useRef, useState } from "react";
import { DebateType, SummaryType } from "@/types/data";
import SummaryCard from "@/components/card/SummaryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { DUMMY_SUMMARIES } from "@/common/dummy_data";
import CarouselSummaryCard from "@/components/card/CarouselSummaryCard";
import PopularDebateCard from "@/components/card/PopularDebateCard";
import WriteIcon from "@/assets/images/write.svg?react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import useDebounce from "@/hooks/useDebounce";
import CategoryCard from "@/components/card/CategoryCard";
import SearchDropdown from "@/components/dropdown/SearchByDropdown";

import { isMd } from "@/functions/breakpoint";
import { SearchBar } from "@/components/input/searchbar";
import { MiddlePanel, RightPanel } from "@/components/panel/sidePanel";

const searchBys: {
  name: string;
  value: "bt" | "it";
}[] = [
  {
    name: "page.summary.search.book-title",
    value: "bt",
  },
  {
    name: "page.summary.search.item-title",
    value: "it",
  },
];

const sortBys: {
  name: string;
  value: "latest" | "popular";
}[] = [
  {
    name: "page.summary.sort.latest",
    value: "latest",
  },
  {
    name: "page.summary.sort.popular",
    value: "popular",
  },
];

function Summary() {
  const [recommendSummaries, ..._] = useState<SummaryType[]>(DUMMY_SUMMARIES);

  const [summaries, setSummaries] = useState<SummaryType[]>([]);
  const [summaryPage, setSummaryPage] = useState<number>(1);
  const [summaryHasMore, setSummaryHasMore] = useState<boolean>(true);
  const [summaryLikes, setSummaryLikes] = useState<number[]>([]);

  const [popularDebates, setPopularDebates] = useState<DebateType[]>([]);
  const [popularDebateLikes, setPopularDebateLikes] = useState<number[]>([]);
  const [isPopularDebateLoaded, setIsPopularDebateLoaded] =
    useState<boolean>(false);

  const [categories, setCategories] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [searchByIdx, setSearchByIdx] = useState<number>(0);
  const [sortByIdx, setSortByIdx] = useState<number>(0);
  const debouncedSearch = useDebounce(search, 500);
  const prevValueRef = useRef<{
    categories: number;
    debouncedSearch: string;
    searchByIdx: number;
    sortByIdx: number;
  }>({ categories: 0, debouncedSearch: "", searchByIdx: 0, sortByIdx: 0 });

  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      prevValueRef.current.categories === categories &&
      prevValueRef.current.debouncedSearch === debouncedSearch &&
      prevValueRef.current.searchByIdx === searchByIdx &&
      prevValueRef.current.sortByIdx === sortByIdx
    )
      return;
    prevValueRef.current = {
      categories,
      debouncedSearch,
      searchByIdx,
      sortByIdx,
    };
  }, [categories, debouncedSearch, searchByIdx, sortByIdx]);

  useEffect(() => {
    if (popularDebates.length === 0 && !isPopularDebateLoaded) {
      axios
        .get(`/api/debate/popular`)
        .then(async (res) => {
          let { data: items }: { data: DebateType[] } = res;
          setPopularDebates(items);

          if (user.id == 0 || !items || items.length === 0) return;

          await axios
            .get(
              `/api/debates/like?${items
                .map((item) => "ids=" + item.id)
                .join("&")}`
            )
            .then(
              (res) => {
                let { data: itemLikes }: { data: number[] } = res;
                setPopularDebateLikes((prev) => [...prev, ...itemLikes]);
              },
              () => {
                setPopularDebateLikes(new Array(items.length).fill(false));
              }
            );
        })
        .finally(() => {
          setIsPopularDebateLoaded(true);
        });
    }
  });

  return (
    <div id='summary-page'>
      <div className='popular-content-container'>
        <div className='popular-content-title'>
          {t("page.summary.title.recommend")}
        </div>
        <Carousel
          size={isMd() ? 3 : 1}
          className='popular-content mx-auto md:mx-0!'>
          {recommendSummaries.map((summary, index) => (
            <CarouselSummaryCard
              key={"popular-summary" + index}
              summary={summary}
            />
          ))}
        </Carousel>
      </div>

      <div className='content-container mx-4!'>
        <div className='lower-content-container md:flex'>
          <MiddlePanel>
            <CategoryCard
              categories={categories}
              setCategories={setCategories}
              className='left-container'
            />
          </MiddlePanel>
          <RightPanel />
        </div>
        <div className='lower-content-container md:flex'>
          <MiddlePanel className='left-container'>
            <SearchBar
              placeholder={t("page.summary.search.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}>
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
                      key={"sort-by" + index}
                      className='sort-by-text'
                      style={
                        sortByIdx === index
                          ? {
                              color: "#000080",
                            }
                          : {}
                      }
                      onClick={() => setSortByIdx(index)}>
                      {t(sortBy.name)}
                    </div>
                  );
                })}
              </div>
              <button onClick={() => navigate("/summary/create")}>
                <span>{t("page.summary.button.write")}</span>
                <WriteIcon className='write-icon' width={17} fill={"#ffffff"} />
              </button>
            </div>
            <div className='content-container'>
              <InfiniteScroll
                api={`summary?category=${categories}&search=${debouncedSearch}&searchby=${searchBys[searchByIdx].value}&sortby=${sortBys[sortByIdx].value}`}
                likes_api={`summarys/like`}
                setItems={setSummaries}
                page={summaryPage}
                setPage={setSummaryPage}
                hasMore={summaryHasMore}
                setHasMore={setSummaryHasMore}
                likes={summaryLikes}
                setLikes={setSummaryLikes}
                hasNoItem={summaries.length === 0}
                hasNoItemMessage={t("page.summary.item.no-summary-item")}
                refreshCondition={
                  categories !== prevValueRef.current.categories ||
                  debouncedSearch !== prevValueRef.current.debouncedSearch ||
                  searchByIdx !== prevValueRef.current.searchByIdx ||
                  sortByIdx !== prevValueRef.current.sortByIdx
                }
                dependency={[prevValueRef]}>
                {summaries.map((summary, index) => (
                  <SummaryCard
                    key={"summary" + index}
                    summary={summary}
                    hasLiked={summaryLikes.includes(summary.id)}
                    setHasLiked={setSummaryLikes}
                  />
                ))}
              </InfiniteScroll>
            </div>
          </MiddlePanel>

          <RightPanel className='right-container hidden lg:block'>
            <div className='right-container-title'>
              {t("page.summary.title.popular")}
            </div>
            <div className='right-container-content'>
              {popularDebates.map((debate, index) => (
                <PopularDebateCard
                  key={"debate" + index}
                  debate={debate}
                  hasLiked={popularDebateLikes.includes(debate.id)}
                  setHasLiked={setPopularDebateLikes}
                />
              ))}
            </div>
          </RightPanel>
        </div>
      </div>
      <div className='footer' />
    </div>
  );
}

export default Summary;
