/**
 * Servicio para manejar el almacenamiento seguro del token JWT.
 * 
 * 🛡️ Usa `SecureStore` en dispositivos móviles y `AsyncStorage` en web.
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'authToken';

/**
 * Guarda el token de sesión.
 * - En móviles: `SecureStore`
 * - En web: `AsyncStorage`
 */
export const saveToken = async (token: string): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(STORAGE_KEY, token);
      console.log('Token guardado en AsyncStorage:', token); // Log para depuración
    } else {
      await SecureStore.setItemAsync(STORAGE_KEY, token);
      console.log('Token guardado en SecureStore:', token); // Log para depuración
    }
  } catch (error) {
    console.error('Error al guardar el token:', error);
  }
};

/**
 * Recupera el token almacenado.
 * - En móviles: `SecureStore`
 * - En web: `AsyncStorage`
 */

export const getToken = async (): Promise<string | null> => {
  try {
    let token: string | null;
    if (Platform.OS === 'web') {
      token = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('Token recuperado de AsyncStorage:', token); // Log para depuración
    } else {
      token = await SecureStore.getItemAsync(STORAGE_KEY);
      console.log('Token recuperado de SecureStore:', token); // Log para depuración
    }
    return token;
  } catch (error) {
    console.error('Error al recuperar el token:', error);
    return null;
  }
};

/**
 * Elimina el token almacenado.
 * - En móviles: `SecureStore`
 * - En web: `AsyncStorage`
 */
export const clearToken = async (): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } else {
      await SecureStore.deleteItemAsync(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error al eliminar el token:', error);
  }
};
