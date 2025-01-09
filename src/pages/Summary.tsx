import Carousel from "@/components/carousel/Carousel";
import InfiniteScroll from "@/components/base/InfiniteScroll";
import { useEffect, useState } from "react";
import { DebateType, SummaryType } from "@/types/data";
import SummaryCard from "@/components/card/SummaryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { DUMMY_DEBATES, DUMMY_SUMMARIES } from "@/common/dummy_data";
import CarouselSummaryCard from "@/components/card/CarouselSummaryCard";
import PopularDebateCard from "@/components/card/PopularDebateCard";

const searchBys: {
  name: string;
  value: "bkt" | "smt";
}[] = [
  {
    name: "도서 제목",
    value: "bkt",
  },
  {
    name: "요약 제목",
    value: "smt",
  },
];

const sortBys: {
  name: string;
  value: "latest" | "popular";
}[] = [
  {
    name: "최신순",
    value: "latest",
  },
  {
    name: "인기순",
    value: "popular",
  },
];

function Summary() {
  const [popularSummaries, setPopularSummaries] =
    useState<SummaryType[]>(DUMMY_SUMMARIES);

  const [summaries, setSummaries] = useState<SummaryType[]>([]);
  const [summaryPage, setSummaryPage] = useState<number>(1);
  const [summaryHasMore, setSummaryHasMore] = useState<boolean>(true);
  const [summaryLikes, setSummaryLikes] = useState<boolean[]>([]);

  const [debates, setDebates] = useState<DebateType[]>(DUMMY_DEBATES);
  const [debatePage, setDebatePage] = useState<number>(1);
  const [debateHasMore, setDebateHasMore] = useState<boolean>(true);
  const [debateLikes, setDebateLikes] = useState<boolean[]>([]);

  const [search, setSearch] = useState<string>("");
  const [searchByIdx, setSearchByIdx] = useState<number>(0);
  const [sortByIdx, setSortByIdx] = useState<number>(0);

  useEffect(() => {
    axios.get(`summary`).then(async (res) => {
      let { items }: { items: SummaryType[] } = res.data;
      if (!items || items.length === 0) return;
      setSummaries(items);
      setPopularSummaries(items);
    });
  }, []);

  return (
    <div id="summary-page">
      <div className="popular-content-container">
        <div className="popular-content-title">인기 요약</div>
        <Carousel items={popularSummaries} size={3} className="popular-content">
          {popularSummaries.map((summary, index) => (
            <CarouselSummaryCard
              key={"popular-summary" + index}
              summary={summary}
            />
          ))}
        </Carousel>
      </div>
      <div className="lower-content-container">
        <div className="left-container">
          <div className="searchbox-container">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="searchbox-icon"
            />
            <Dropdown>
              <Dropdown.Toggle>{searchBys[searchByIdx].name}</Dropdown.Toggle>
              <Dropdown.Menu>
                {searchBys.map((searchBy, index) => (
                  <Dropdown.Item
                    key={"search-by" + index}
                    onClick={() => setSearchByIdx(index)}
                  >
                    {searchBy.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <input
              type="text"
              placeholder="관심 도서의 요약을 검색해보세요!"
              className="searchbox"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="content-header">
            <div className="sort-by">
              {sortBys.map((sortBy, index) => {
                return (
                  <div
                    key={"sort-by" + index}
                    className="sort-by-text"
                    style={
                      sortByIdx === index
                        ? {
                            color: "#000080",
                          }
                        : {}
                    }
                    onClick={() => setSortByIdx(index)}
                  >
                    {sortBy.name}
                  </div>
                );
              })}
            </div>
            <button>작성하기</button>
          </div>
          <div className="content-container">
            <InfiniteScroll
              api={`summary?search=${search}&searchby=${searchBys[searchByIdx].value}&sort=${sortBys[sortByIdx].value}`}
              likes_api={`summarys/like`}
              setItems={setSummaries}
              page={summaryPage}
              setPage={setSummaryPage}
              hasMore={summaryHasMore}
              setHasMore={setSummaryHasMore}
              likes={summaryLikes}
              setLikes={setSummaryLikes}
              hasNoItem={summaries.length === 0}
              hasNoItemMessage="아직 작성된 요약이 없습니다"
            >
              {summaries.map((summary, index) => (
                <SummaryCard
                  key={"summary" + index}
                  idx={index}
                  summary={summary}
                  hasLiked={summaryLikes[index]}
                  setHasLiked={setSummaryLikes}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
        <div className="right-container">
          <div className="right-container-title">인기 토론방</div>
          <div className="right-container-content">
            <InfiniteScroll
              api={`debate/popular`}
              likes_api={`debates/like`}
              setItems={setDebates}
              page={debatePage}
              setPage={setDebatePage}
              hasMore={debateHasMore}
              setHasMore={setDebateHasMore}
              likes={debateLikes}
              setLikes={setDebateLikes}
              hasNoItem={debates.length === 0}
              hasNoItemMessage="아직 토론방이 없습니다"
            >
              {debates.map((debate, index) => (
                <PopularDebateCard key={"debate" + index} debate={debate} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <div className="footer" />
    </div>
  );
}

export default Summary;
