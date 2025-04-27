import { Platform } from 'react-native';

const Component =
  Platform.OS === 'web'
    ? require('./RestaurantPhotoCarousel.web').default
    : require('./RestaurantPhotoCarousel.mobile').default;

export default Component;
