/**
 * URL de la pantalla de registro self-serve de la app.
 *
 * Por defecto apunta a producción (`app.dentidad.com/registro`). Para probar el
 * flujo en local, definir `NEXT_PUBLIC_REGISTER_URL` en `.env.local`
 * (p. ej. `http://localhost:3000/registro`).
 */
export const REGISTER_URL =
  process.env.NEXT_PUBLIC_REGISTER_URL ?? "https://app.dentidad.com/registro";

/**
 * URL del sistema (login). Por defecto producción (`app.dentidad.com`). En local
 * se overridea con `NEXT_PUBLIC_APP_URL` (p. ej. `http://localhost:3000`).
 */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.dentidad.com";
