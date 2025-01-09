import { MOCK_BOOKS } from "@/types/initialValue";

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
        // flexDirection: "column",
        gap: "30px",
        alignItems: "center",
        overflowX: "auto",
        // scrollbarColor: "transparent transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
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
                width: "256px",
                border: "2px solid lightgray",
                borderRadius: "10px",
                flexShrink: 0,
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
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
  );
}

export default HotSummary;
