// src/features/customer/components/layout/footer/CustomerFooter.tsx

import { Platform } from 'react-native';
import CustomerFooterWeb from './CustomerFooter.web';
import CustomerFooterMobile from './CustomerFooter.mobile';

const CustomerFooter = Platform.OS === 'web' ? CustomerFooterWeb : CustomerFooterMobile;

export default CustomerFooter;
