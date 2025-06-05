// src/app/(manager)/_layout.tsx
import ManagerFooter from '@features/users/manager/components/layout/footer/ManagerFooter.web';
import ManagerHeader from '@features/users/manager/components/layout/header/ManagerHeader';
import { Slot} from 'expo-router';
import { View, StyleSheet 
 } from 'react-native';

export default function ManagerLayout() {
  return (    <View style={styles.container}>
      <ManagerHeader />
      <View style={styles.content}>
        <Slot />
      </View>
      <ManagerFooter/>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});