// src/features/customer/components/layout/header/CustomerHeader.tsx

import { Platform } from 'react-native';
import CustomerHeaderMobile from './CustomerHeader.mobile';
import CustomerHeaderWeb from './CustomerHeader.web';

const CustomerHeader = Platform.OS === 'web' ? CustomerHeaderWeb : CustomerHeaderMobile;

export default CustomerHeader;
