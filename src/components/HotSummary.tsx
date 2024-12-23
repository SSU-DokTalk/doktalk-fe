import { MOCK_BOOKS } from '@/types/data';


function HotSummary() {
    return (
        <div
            style={{
                // height: "400px",
                textAlign: "center",
                fontSize: "20px",
                alignContent: "center",
                width: "100%",
                paddingTop: "20px",
                paddingBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                alignItems: "center",
                flexWrap: "wrap",
                overflowX: "scroll",
                scrollbarColor: "transparent transparent",
            }}
            onMouseDown={(e) => {
                const container = e.currentTarget;
                const startX = e.pageX - container.offsetLeft;
                const scrollLeft = container.scrollLeft;

                const onMouseMove = (e: MouseEvent) => {
                    const x = e.pageX - container.offsetLeft;
                    const walk = (x - startX) * 2; //scroll-fast
                    container.scrollLeft = scrollLeft - walk;
                };

                const onMouseUp = () => {
                    window.removeEventListener("mousemove", onMouseMove);
                    window.removeEventListener("mouseup", onMouseUp);
                };

                window.addEventListener("mousemove", onMouseMove);
                window.addEventListener("mouseup", onMouseUp);
            }}
        // onClick={test}
        >
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                }}
            >
                {MOCK_BOOKS.map((book, idx) => {
                    return (
                        <div
                            key={"book" + idx}
                            style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                                width: "512px",
                                border: "2px solid lightgray",
                                borderRadius: "10px",
                            }}
                        >
                            <img
                                style={{
                                    width: "120px",
                                    height: "160px",
                                    borderRadius: "10px",
                                }}
                                src={book.imgSrc}
                            />
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "start", alignItems: "start" }}>
                                <div
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        color: "#000080",
                                    }}
                                >
                                    {book.title}
                                </div>
                                <div
                                    style={{
                                        fontSize: "16px",
                                        color: "#000080",
                                    }}
                                >
                                    {book.title}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default HotSummary