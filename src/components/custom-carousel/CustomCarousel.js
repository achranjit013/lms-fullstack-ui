import React from "react";
import Carousel from "react-bootstrap/Carousel";
import lms06 from "../../assets/lms-06.avif";
import lms08 from "../../assets/lms-08.jpeg";
import lms10 from "../../assets/lms-10.jpeg";

const CustomCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img src={lms06} className="d-block w-100" alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={lms10} className="d-block w-100" alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={lms08} className="d-block w-100" alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
