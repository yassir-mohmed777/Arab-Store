import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import StoreCard from "./StoreCard";

export default function StoresSwiper({ stores, categoryId }) {
  return (
    <div dir="rtl" className="py-6">
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={16}
        slidesPerView="auto"
        scrollbar={{ draggable: true }}
      >
        {stores.map((store) => (
          <SwiperSlide
            key={store.id}
            style={{ width: "260px", willChange: "transform" }}
          >
            {/* لا نضيف أي تأثير على SwiperSlide نفسه، فقط داخل البطاقة */}
            <StoreCard store={store} categoryId={categoryId} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
