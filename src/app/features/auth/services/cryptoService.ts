/**
 * Utilidades criptográficas reutilizables para flujos OAuth y seguridad.
 *
 * 🔐 Este módulo provee funciones para:
 * - Generar estados seguros aleatorios (contra ataques CSRF)
 * - Crear hashes SHA-256 (por ejemplo para PKCE)
 *
 * ✅ Diseñado para ser utilizado tanto en flujos OAuth como en otras operaciones sensibles
 * dentro del frontend móvil con Expo.
 */

// src/app/services/cryptoService.ts

import * as Crypto from 'expo-crypto';

/**
 * Genera un string aleatorio hexadecimal de 32 caracteres.
 *
 * 📌 Comúnmente usado como `state` en flujos OAuth para prevenir ataques CSRF.
 */
export const generateSecureState = async (): Promise<string> => {
  const randomBytes = await Crypto.getRandomBytesAsync(16); // 128 bits
  return Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Genera un hash SHA-256 de una cadena de texto.
 *
 * 🧠 Útil en flujos OAuth con PKCE o para verificar integridad de datos.
 *
 * @param data Texto plano a ser hasheado
 * @returns Hash SHA-256 como string hexadecimal
 */
export const generateHash = async (data: string): Promise<string> => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    data
  );
  return digest;
};
