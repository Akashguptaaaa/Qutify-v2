import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LeftNavButton from "./LeftNavButton";
import RightNavButton from "./RightNavButton";
import styles from "./Carousel.module.css";
import "swiper/css";
import "swiper/css/navigation";

function Carousel({ data, renderItem, idPrefix }) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const prevClass = `carousel-prev-${idPrefix}`;
  const nextClass = `carousel-next-${idPrefix}`;

  return (
    <div className={styles.wrapper}>
      {!isBeginning ? <LeftNavButton className={`${styles.nav} ${prevClass}`} /> : null}
      <Swiper
        modules={[Navigation]}
        slidesPerView={7}
        spaceBetween={20}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className={styles.swiper}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
      {!isEnd ? <RightNavButton className={`${styles.nav} ${nextClass}`} /> : null}
    </div>
  );
}

export default Carousel;
