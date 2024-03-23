import React from "react";
import ImageCard from "./ImageCard";

const ImageList: React.FC<any> = ({ images, turnCard, flipped}) => {
  return (
    <>
      {images.map((image: any, index: any) => {
        return (
          <ImageCard
            key={index}
            image={image}
            position={index}
            turnCard={turnCard}
            flipped={flipped}
          />
        );
      })}
    </>
  );
};

export default ImageList;
