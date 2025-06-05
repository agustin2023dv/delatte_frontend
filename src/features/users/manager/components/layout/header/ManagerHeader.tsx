// src/features/manager/components/layout/header/ManagerHeader.tsx

import { Platform } from 'react-native';
import ManagerHeaderMobile from './ManagerHeader.mobile';
import ManagerHeaderWeb from './ManagerHeader.web';

const ManagerHeader = Platform.OS === 'web' ? ManagerHeaderWeb : ManagerHeaderMobile;

export default ManagerHeader;
