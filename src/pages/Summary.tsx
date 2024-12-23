import Header from "@/components/Header";
import HotSummary from "@/components/HotSummary";
import PostList from "@/components/Post";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import usePosts from "@/hooks/usePosts";
import useSelectPost from "@/hooks/useSelectPost";
import useUserRedux from "@/hooks/useUserRedux";
import { MOCK_BOOKS } from "@/types/data";

function Summary() {

    const user = useUserRedux();
    const { posts } = usePosts();
    const selection = useSelectPost();

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
                    following={user?.following_num}
                    follwers={user?.follower_num}
                    user={user}
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
                    <Header
                        text="인기요약"
                    />
                    <HotSummary />
                    <SearchBar
                        placeholder="관심 도서의 요약을 검색해보세요!"
                    />
                    <PostList
                        onPostClick={selection.handlePostClick}
                        posts={posts}
                    />
                </div>
            </div>
        </div>
    )
}

export default Summary