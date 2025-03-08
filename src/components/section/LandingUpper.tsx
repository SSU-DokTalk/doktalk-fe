import { DUMMY_DEBATES } from "@/common/dummy_data";
import { DebateType } from "@/types/data";
import { useEffect, useState } from "react";
import CarouselDebateCard from "../card/CarouselDebateCard";
import Carousel from "@/components/carousel/Carousel";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import axios from "axios";
import { useTranslation } from "react-i18next";

function LandingUpper() {
  const user = useAppSelector(selectUser);
  const [debates, setDebates] = useState<DebateType[]>(DUMMY_DEBATES);

  const { t } = useTranslation();

  useEffect(() => {
    axios.get(`/api/debate/recommend`).then((res) => {
      let { items } = res.data;
      setDebates(items);
    });
  }, []);

  return (
    <div id="landing-page-upper-container">
      <div className="container-title">
        {t("page.landing.title.recommend-prefix")}
        {user.id == 0 ? null : (
          <span>
            {t("page.landing.title.for-you-prefix")}
            <span className="user-name">{user.name}</span>
            {t("page.landing.title.for-you-postfix")}
          </span>
        )}
        {t("page.landing.title.recommend-postfix")}
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
