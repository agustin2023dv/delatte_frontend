/**
 * Interfaz que define el contrato de un servicio criptográfico reutilizable.
 *
 * 🔐 Abstracción que permite desacoplar la lógica de generación de hashes
 * o valores seguros, facilitando:
 * - Testeo con mocks
 * - Reemplazo por otra librería (por ejemplo, crypto nativo en Node)
 * - Inyección de dependencias (DI) con InversifyJS o similares
 *
 */

// src/core/interfaces/ICryptoService.ts

export interface ICryptoService {
  /**
   * Genera un estado aleatorio seguro para flujos OAuth.
   */
  generateSecureState(): Promise<string>;

  /**
   * Genera un hash SHA-256 del input recibido.
   *
   * @param data Cadena de texto a hashear
   */
  generateHash(data: string): Promise<string>;
}
