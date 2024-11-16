import axios from "axios";

function Landing() {
  const test = () => {
    axios
      .get("/api/user/me")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        style={{
          height: "400px",
          backgroundColor: "lightblue",
          textAlign: "center",
          fontSize: "20px",
          alignContent: "center",
        }}
        onClick={test}
      >
        sticky nav 테스트용 div
        <br />
        (로그인 후 클릭하면 유저 정보 받아오기)
      </div>
      <div
        style={{
          height: "400px",
          backgroundColor: "lightcyan",
          textAlign: "center",
          fontSize: "20px",
          alignContent: "center",
        }}
      >
        sticky nav 테스트용 div
      </div>
      <div
        style={{
          height: "400px",
          backgroundColor: "lightgray",
          textAlign: "center",
          fontSize: "20px",
          alignContent: "center",
        }}
      >
        sticky nav 테스트용 div
      </div>
      <div
        style={{
          height: "400px",
          backgroundColor: "lightsalmon",
          textAlign: "center",
          fontSize: "20px",
          alignContent: "center",
        }}
      >
        sticky nav 테스트용 div
      </div>
    </div>
  );
}

export default Landing;
