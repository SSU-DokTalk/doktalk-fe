import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useRef, useState } from "react";
import NoItem from "@/assets/images/no-item.svg";
import { selectUser } from "@/stores/user";
import { useAppSelector } from "@/stores/hooks";

/**
 * 무한 스크롤
 * @param {React.ReactNode} props.children - The child components to be rendered.
 *
 *
 * 필수 항목: 데이터를 불러올 API의 endpoint, 데이터를 저장할 state를 설정하는 함수
 * @param {string} props.api - The API endpoint to fetch data from.
 * @param {React.Dispatch<React.SetStateAction<any[]>>} props.setItems - The function to set the items.
 *
 *
 * 상위 컴포넌트에서 변수를 관리하고 싶은 경우: page, setPage, hasMore, setHasMore를 props로 전달
 * @param {number} [props.page] - The current page number.
 * @param {React.Dispatch<React.SetStateAction<number>>} [props.setPage] - The function to set the page number.
 * @param {boolean} [props.hasMore] - Flag to indicate if there are more items to load.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [props.setHasMore] - The function to set the hasMore flag.
 *
 *
 * 추가 설정: 데이터를 불러올 조건, useEffect의 dependency, 한 번에 불러올 아이템 수 설정
 * @param {boolean} [props.condition=true] - The condition to determine if fetching should occur.
 * @param {any[]} [props.dependency=[]] - The dependencies for the useEffect hook.
 * @param {number} [props.size=10] - The number of items to fetch per page.
 *
 * 추가 함수
 * @param {() => void} [props.beforeFetch] - The function to run before fetching data.
 * @param {() => void} [props.afterFetchSuccess] - The function to run after fetching data successfully.
 * @param {() => void} [props.afterFetchFail] - The function to run after fetching data fails.
 */

function InfiniteScroll({
  children,
  api,
  likes_api = undefined,
  itemId = "id",
  setItems,
  page = undefined,
  setPage = undefined,
  setTotal = undefined,
  hasMore = undefined,
  setHasMore = undefined,
  likes = undefined,
  setLikes = undefined,
  beforeFetch = undefined,
  afterFetchSuccess = undefined,
  afterFetchFail = undefined,
  hasNoItem = false,
  hasNoItemMessage = "아직 항목이 없습니다",
  hasNoItemComponent = undefined,
  condition = true,
  refreshCondition = false,
  dependency = [],
  size = 10,
}: {
  children: React.ReactNode;
  api: string;
  likes_api?: string;
  itemId?: string;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  page?: number | undefined;
  setPage?: React.Dispatch<React.SetStateAction<number>> | undefined;
  setTotal?: React.Dispatch<React.SetStateAction<number>>;
  hasMore?: boolean | undefined;
  setHasMore?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  likes?: boolean[];
  setLikes?: React.Dispatch<React.SetStateAction<boolean[]>>;
  beforeFetch?: () => void;
  afterFetchSuccess?: () => void;
  afterFetchFail?: () => void;
  hasNoItem?: boolean;
  hasNoItemMessage?: string;
  hasNoItemComponent?: React.ReactNode;
  condition?: boolean;
  refreshCondition?: boolean;
  dependency?: any[];
  size?: number;
}) {
  const [inherentHasMore, setInherentHasMore] = useState<boolean>(true);
  const [inherentPage, setInherentPage] = useState<number>(1);

  const elementRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector(selectUser);

  const fetchMoreItems = async () => {
    if (beforeFetch) await beforeFetch();
    if (condition && (hasMore ?? inherentHasMore)) {
      console.log(api);
      await axios
        .get(`/api/${api}`, {
          params: {
            page: page ?? inherentPage,
            size: size,
          },
        })
        .then(
          async (res) => {
            if (afterFetchSuccess) await afterFetchSuccess();
            let {
              items,
              page: pg,
              pages,
              total,
            }: {
              items: any[];
              page: number;
              pages: number;
              total: number;
            } = res.data;
            if (pg <= pages) {
              setItems((prevItems) => [...prevItems, ...items]);
              setTotal?.(total);
              await (setHasMore ?? setInherentHasMore)(pg != pages);
              await (setPage ?? setInherentPage)(pg + 1);
            } else {
              await (setHasMore ?? setInherentHasMore)(false);
            }
            if (!items || items.length === 0) return;
            if (!likes_api || user.id == 0 || !likes || !setLikes) {
              setLikes?.((prvLikes) => [
                ...prvLikes,
                ...new Array(items.length).fill(false),
              ]);
              return;
            }
            await axios
              .get(
                `/api/${likes_api}?${items
                  .map((item) => "ids=" + item[itemId])
                  .join("&")}`
              )
              .then(
                (newLikes) => {
                  setLikes((prvLikes) => [...prvLikes, ...newLikes.data]);
                },
                () => {
                  setLikes((prvLikes) => [
                    ...prvLikes,
                    ...new Array(items.length).fill(false),
                  ]);
                }
              );
          },
          async () => {
            await (setHasMore ?? setInherentHasMore)(false);
            if (afterFetchFail) afterFetchFail();
          }
        );
    }
  };

  const onIntersection = async (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting && (hasMore ?? inherentHasMore)) {
      await fetchMoreItems();
    }
  };

  const observer = new IntersectionObserver(onIntersection);

  useEffect(() => {
    console.log("InfiniteScroll useEffect");
    if (refreshCondition) {
      console.log("InfiniteScroll useEffect refreshCondition");
      (setPage ?? setInherentPage)(1);
      (setHasMore ?? setInherentHasMore)(true);
      setLikes?.([]);
      setItems([]);
      setTotal?.(0);
    }
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [inherentPage, page, condition, api, JSON.stringify(dependency)]);

  return (
    <>
      {children}
      {(hasMore ?? inherentHasMore) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Spinner
            ref={elementRef}
            animation="border"
            className="loading-spinner"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!(hasMore ?? inherentHasMore) &&
        hasNoItem &&
        (hasNoItemComponent ?? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
              color: "#666565",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            <img src={NoItem} alt="no item" />
            <span>{hasNoItemMessage}</span>
          </div>
        ))}
    </>
  );
}

export default InfiniteScroll;
