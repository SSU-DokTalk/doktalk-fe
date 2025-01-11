import { DUMMY_DEBATES } from "@/common/dummy_data";
import { DebateType } from "@/types/data";
import { useEffect, useState } from "react";
import CarouselDebateCard from "../card/CarouselDebateCard";
import Carousel from "@/components/carousel/Carousel";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import axios from "axios";

function LandingUpper() {
  const user = useAppSelector(selectUser);
  const [debates, setDebates] = useState<DebateType[]>(DUMMY_DEBATES);

  useEffect(() => {
    axios.get(`/api/debate/recommend`).then(
      (res) => {
        let { items } = res.data;
        setDebates(items);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div id="landing-page-upper-container">
      <div className="container-title">
        {user.id == 0 ? null : (
          <span>
            <span className="user-name">{user.name}</span>님을 위한{" "}
          </span>
        )}
        추천 토론방
      </div>
      <div className="container-contents">
        <Carousel
          items={debates}
          size={3}
          className="container-contents-carousel"
        >
          {debates.map((debate, idx) => (
            <CarouselDebateCard
              key={"recommend-debate" + idx}
              debate={debate}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default LandingUpper;
