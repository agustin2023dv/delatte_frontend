// src/app/features/restaurant/components/restaurant-photo-carousel/RestaurantPhotoCarousel.web.tsx

import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

interface Props {
  photos: string[];
}

const RestaurantPhotoCarouselWeb: React.FC<Props> = ({ photos }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
  });

  if (photos.length === 0) {
    return null; // Si no hay fotos, no renderiza nada
  }

  return (
    <div ref={sliderRef} className="keen-slider" style={{ padding: '16px 0' }}>
      {photos.map((photo, index) => (
        <div key={`${photo}-${index}`} className="keen-slider__slide">
          <img
            src={photo}
            alt={`Foto ${index + 1}`}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '12px',
              backgroundColor: '#eee',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RestaurantPhotoCarouselWeb;
