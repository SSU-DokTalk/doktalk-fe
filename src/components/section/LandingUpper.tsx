import { DUMMY_DEBATES } from "@/common/dummy_data";
import { DebateType } from "@/types/data";
import { useState } from "react";
import RecommendDebateCard from "../card/RecommendDebateCard";
import Carousel from "@/components/carousel/Carousel";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";

function LandingUpper() {
  const user = useAppSelector(selectUser);
  const [debates, setDebates] = useState<DebateType[]>(DUMMY_DEBATES);

  return (
    <div id="landing-page-upper-container">
      <div className="container-title">
        <span className="user-name">{user.name}</span>님을 위한 추천 토론방
      </div>
      <div className="container-contents">
        <Carousel
          items={debates}
          size={3}
          className="container-contents-carousel"
        >
          {debates.map((debate, idx) => (
            <RecommendDebateCard
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
