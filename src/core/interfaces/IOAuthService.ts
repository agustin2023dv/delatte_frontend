// src/core/interfaces/IOAuthService.ts

/**
 * 🧩 Interfaz que define el contrato para servicios OAuth.
 * 
 * Su propósito es abstraer la lógica de intercambio entre un código de autorización (`authorization code`)
 * y el token de acceso (`access token`) en flujos de OAuth 2.0, como el de Google.
 *
 * 🔄 Esta interfaz permite aplicar el principio de inversión de dependencias (D - SOLID),
 * facilitando la inyección de distintos proveedores OAuth o test doubles (mocks).
 */
export interface IOAuthService {
  /**
   * Intercambia el código de autorización recibido desde el proveedor OAuth
   * por un token de acceso válido.
   * 
   * @param code Código recibido tras la autorización del usuario
   * @param redirectUri URI registrada como redireccionamiento autorizado
   * @param clientId ID de cliente OAuth de la app
   * @param tokenEndpoint Endpoint del proveedor para intercambiar el código
   * @returns Token de acceso (`access_token`)
   */
  exchangeCodeForToken(
    code: string,
    redirectUri: string,
    clientId: string,
    tokenEndpoint: string
  ): Promise<string>;
}
