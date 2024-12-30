import { getSummary } from "@/api/summary";
import Header from "@/components/Header";
import HotSummary from "@/components/HotSummary";
import SummaryCreate from "@/components/SummaryCreate";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import { BasicSummaryRes, MOCK_BOOKS } from "@/types/data";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState } from "react";
import SummaryList from "@/components/Summary";

function Summary() {

    const [summary, setSummary] = useState<BasicSummaryRes | null>(null);

    const [writeMode, setWriteMode] = useState<boolean>(false);

    const [detailed, setDetailed] = useState<boolean>(false);

    useLayoutEffect(() => {
        getSummary(1).then((res) => {
            setSummary(res);
        });
    }, [])

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
                paddingTop: "20px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "40px",
                    alignItems: "start",
                    justifyContent: "center",
                    width: "100%",
                    padding: "20px",
                }}
            >
                <SideBar
                    books={MOCK_BOOKS}
                // following={user?.following_num}
                // follwers={user?.follower_num}
                // user={user}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                        gap: "30px",
                        alignItems: "center",
                    }}
                >
                    {detailed ? (
                        // <PaymentPage />
                        <></>
                    ) : (
                        <>
                            {writeMode ? (
                                <>
                                    <Header
                                        text="인기요약"
                                    />
                                    <SummaryCreate />
                                </>
                            ) : (
                                <>
                                    <Header
                                        text="게시글 작성하기"
                                    />
                                    <HotSummary />
                                    <SearchBar
                                        placeholder="관심 도서의 요약을 검색해보세요!"
                                    />
                                    {summary && (
                                        <SummaryList
                                            onSummaryClick={() => { setDetailed(true) }}
                                            summaries={[summary]}
                                        />
                                    )}
                                    <button
                                        onClick={() => setWriteMode(true)}
                                        style={{
                                            backgroundColor: "#000080",
                                            color: "#fff",
                                            border: "none",
                                            padding: "10px 20px",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            marginLeft: "auto",
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div>작성하기</div>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                </>
                            )}
                        </>
                    )}

                </div>

            </div>
        </div>
    )
}

export default Summary