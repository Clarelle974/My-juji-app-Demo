import "./home-pictures.css";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

export default function HomePictures() {
  const slides = [
    {
      img: "/19.png",
      text: "Le code moral",
      alt: "un jujitsuka ajuste la ceinture d'un autre",
      link: "/home",
    },
    {
      img: "/13.png",
      text: "Les techniques",
      alt: "deux jujitsukas en position de combat",
      link: "/home",
    },
    {
      img: "/18.png",
      text: "Kodokan Goshin Jutsu",
      alt: "une salle de dojo lumineuse",
      link: "/Kodokan",
    },

    {
      img: "/16.png",
      text: "Les 20 imposées",
      alt: "une technique d'attaque",
      link: "/home",
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.img}>
            <div className="slide-content">
              <img src={item.img} alt={item.alt} />
              <Link to={item.link}>
                <p>{item.text}</p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
