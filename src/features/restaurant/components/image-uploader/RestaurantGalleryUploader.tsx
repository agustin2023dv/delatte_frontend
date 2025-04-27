import { Platform } from 'react-native';

const Component =
  Platform.OS === 'web'
    ? require('./RestaurantPhotoUploader.web').default
    : require('./RestaurantPhotoUploader.mobile').default;

export default Component;
