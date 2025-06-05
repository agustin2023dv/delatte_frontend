// src/features/manager/components/layout/manager/ManagerFooter.tsx

import { Platform } from 'react-native';
import ManagerFooterWeb from './ManagerFooter.web';
import ManagerFooterMobile from './ManagerFooter.mobile';

const ManagerFooter = Platform.OS === 'web' ? ManagerFooterWeb : ManagerFooterMobile;

export default ManagerFooter;
