// src/app/features/restaurant/components/restaurant-photo-carousel/RestaurantPhotoCarousel.mobile.tsx

import React from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface Props {
  photos: string[];
}

const { width } = Dimensions.get('window');

const RestaurantPhotoCarouselMobile: React.FC<Props> = ({ photos }) => {
  if (photos.length === 0) {
    return null; // No renderiza si no hay fotos
  }

  return (
    <View style={styles.container}>
      <Carousel
        width={width * 0.8}
        height={220}
        autoPlay={false}
        data={photos}
        scrollAnimationDuration={1000}
        mode="parallax"
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item }}
              style={styles.image}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee', // Por si tarda en cargar la imagen
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default RestaurantPhotoCarouselMobile;
