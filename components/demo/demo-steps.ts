/**
 * Los cuatro pasos del demo: un día de trabajo del consultorio, en orden.
 *
 * Van como DATOS y no como JSX a propósito: el orden y el copy se van a tocar
 * cuando lleguen los números de los anuncios, y cambiarlos no tiene que
 * significar meter mano en la animación.
 *
 * Las capturas salen de `scripts/capturar-demo.mjs`, que fotografía el SaaS en
 * MODO DEMO. Datos ficticios: nunca pacientes reales.
 */

export type DemoStepData = {
  id: string;
  /** Etiqueta corta: qué está pasando en este paso. */
  etiqueta: string;
  /** Una línea en el idioma del odontólogo. */
  detalle: string;
  /** Aviso con el lenguaje real de la app; entra y sale con el paso. */
  notificacion: string;
  desktop: string;
  mobile: string;
  /**
   * El odontograma no tiene vista mobile —la app pide girar el teléfono—, así
   * que en mobile ese paso muestra la banda de arcadas de la vista de
   * escritorio. Se aclara en pantalla en vez de disimularlo.
   */
  mobileEsEscritorio?: boolean;
  alt: string;
};

export const DEMO_STEPS: DemoStepData[] = [
  {
    id: "agenda",
    etiqueta: "Entra un turno",
    detalle: "La agenda del día, con quién viene, a qué hora y en qué estado.",
    notificacion: "Paula confirmó su turno de las 10:00",
    desktop: "/screens/demo/desktop/agenda.png",
    mobile: "/screens/demo/mobile/agenda.png",
    alt: "Agenda del día en Dentidad con tres turnos: confirmado, con recordatorio enviado y pendiente.",
  },
  {
    id: "ficha",
    etiqueta: "Se abre la ficha",
    detalle: "Datos, obra social y antecedentes del paciente, en una sola pantalla.",
    notificacion: "Ficha de Tomás Melchiori",
    desktop: "/screens/demo/desktop/ficha.png",
    mobile: "/screens/demo/mobile/ficha.png",
    alt: "Ficha del paciente en Dentidad con datos personales, obra social y dirección.",
  },
  {
    id: "odontograma",
    etiqueta: "Se marca el odontograma",
    detalle: "Las 32 piezas, con lo requerido, lo existente y lo realizado.",
    notificacion: "Restauración marcada en la pieza 16",
    desktop: "/screens/demo/desktop/odontograma.png",
    mobile: "/screens/demo/mobile/odontograma-arcadas.png",
    mobileEsEscritorio: true,
    alt: "Odontograma de Dentidad con las arcadas superior e inferior y una pieza marcada para restauración.",
  },
  {
    id: "caja",
    etiqueta: "Se cobra",
    detalle: "El cobro entra a la caja del día y queda en el historial del paciente.",
    notificacion: "Pago registrado · $ 38.000",
    desktop: "/screens/demo/desktop/caja.png",
    mobile: "/screens/demo/mobile/caja.png",
    alt: "Caja del día en Dentidad con el total cobrado y los movimientos recientes.",
  },
];
