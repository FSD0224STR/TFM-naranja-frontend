import React, { useState } from "react";
import { Carousel } from "antd";

const contentStyle = {
  margin: 0,
  height: "800px",
  color: "#000000",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const ImgCarousel = ({ imageUrls }) => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  if (!imageUrls || imageUrls.length === 0) {
    return <div>No images to display</div>;
  }
  return (
    <Carousel afterChange={onChange}>
      {imageUrls.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Image ${index + 1}`} style={contentStyle} />
        </div>
      ))}
    </Carousel>
  );
};
export default ImgCarousel;
