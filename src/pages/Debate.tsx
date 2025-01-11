import { DUMMY_DEBATES, DUMMY_SUMMARIES } from "@/common/dummy_data";
import CarouselDebateCard from "@/components/card/CarouselDebateCard";
import Carousel from "@/components/carousel/Carousel";
import { DebateType, SummaryType } from "@/types/data";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import IonIcon from "@reacticons/ionicons";
import WriteIcon from "@/assets/images/WriteIcon";
import DebateCard from "@/components/card/DebateCard";
import InfiniteScroll from "@/components/base/InfiniteScroll";
import PopularSummaryCard from "@/components/card/PopularSummaryCard";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const searchBys: {
  name: string;
  value: "bkt" | "dbt";
}[] = [
  {
    name: "page.debate.search.book-title",
    value: "bkt",
  },
  {
    name: "page.debate.search.item-title",
    value: "dbt",
  },
];

const sortBys: {
  name: string;
  value: "latest" | "popular" | "from";
  element?: JSX.Element;
}[] = [
  {
    name: "page.debate.sort.latest",
    value: "latest",
  },
  {
    name: "page.debate.sort.popular",
    value: "popular",
  },
  {
    name: "page.debate.sort.from",
    value: "from",
    element: <IonIcon name="calendar-outline" className="sort-by-icon" />,
  },
];

function Debate() {
  const [recommendDebates, setRecommendDebates] =
    useState<DebateType[]>(DUMMY_DEBATES);

  const [debates, setDebates] = useState<DebateType[]>(DUMMY_DEBATES);
  const [debatePage, setDebatePage] = useState<number>(1);
  const [debateHasMore, setDebateHasMore] = useState<boolean>(true);
  const [debateLikes, setDebateLikes] = useState<boolean[]>([]);

  const [summaries, setSummaries] = useState<SummaryType[]>(DUMMY_SUMMARIES);
  const [summaryPage, setSummaryPage] = useState<number>(1);
  const [summaryHasMore, setSummaryHasMore] = useState<boolean>(true);
  const [summaryLikes, setSummaryLikes] = useState<boolean[]>([]);

  const [search, setSearch] = useState<string>("");
  const [searchByIdx, setSearchByIdx] = useState<number>(0);
  const [sortByIdx, setSortByIdx] = useState<number>(0);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (recommendDebates.length === 0) {
      setRecommendDebates(DUMMY_DEBATES);
    }
  });

  return (
    <div id="debate-page">
      <div className="recommend-content-container">
        <div className="recommend-content-title">
          {t("page.debate.title.recommend")}
        </div>
        <Carousel
          items={recommendDebates}
          size={3}
          className="recommend-content"
        >
          {recommendDebates.map((debate, idx) => (
            <CarouselDebateCard
              key={"recommend-debate" + idx}
              debate={debate}
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
              <Dropdown.Toggle>
                {t(searchBys[searchByIdx].name)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {searchBys.map((searchBy, index) => (
                  <Dropdown.Item
                    key={"search-by" + index}
                    onClick={() => setSearchByIdx(index)}
                  >
                    {t(searchBy.name)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <input
              type="text"
              placeholder={t("page.debate.search.placeholder")}
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
                    {t(sortBy.name)}
                    {sortBy.element ?? null}
                  </div>
                );
              })}
            </div>
            <button onClick={() => navigate("/debate/create")}>
              <span>{t("page.debate.button.create")}</span>
              <WriteIcon className="write-icon" width={17} fill={"#ffffff"} />
            </button>
          </div>
          <div className="content-container">
            <InfiniteScroll
              api={`debates?search=${search}&searchby=${searchBys[searchByIdx].value}&sort=${sortBys[sortByIdx].value}`}
              likes_api={`debates/like`}
              setItems={setDebates}
              page={debatePage}
              setPage={setDebatePage}
              hasMore={debateHasMore}
              setHasMore={setDebateHasMore}
              likes={debateLikes}
              setLikes={setDebateLikes}
              hasNoItem={summaries.length === 0}
              hasNoItemMessage={t("page.debate.item.no-debate-item")}
            >
              {debates.map((debate, index) => (
                <DebateCard
                  key={"debate" + index}
                  idx={index}
                  debate={debate}
                  hasLiked={debateLikes[index]}
                  setHasLiked={setDebateLikes}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
        <div className="right-container">
          <div className="right-container-title">
            {t("page.debate.title.popular")}
          </div>
          <div className="right-container-content">
            <InfiniteScroll
              api={`summary/popular`}
              likes_api={`summarys/like`}
              setItems={setSummaries}
              page={summaryPage}
              setPage={setSummaryPage}
              hasMore={summaryHasMore}
              setHasMore={setSummaryHasMore}
              likes={summaryLikes}
              setLikes={setSummaryLikes}
              hasNoItem={summaries.length === 0}
              hasNoItemMessage={t("page.debate.item.no-summary-item")}
            >
              {summaries.map((summary, index) => (
                <PopularSummaryCard
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
      </div>
      <div className="footer" />
    </div>
  );
}

export default Debate;
