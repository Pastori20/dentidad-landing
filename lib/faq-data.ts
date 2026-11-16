/**
 * Las preguntas frecuentes, en un solo lugar.
 *
 * Las usan la sección visible (`components/FAQ.tsx`) y el `FAQPage` del JSON-LD
 * (`components/StructuredData.tsx`). **Tienen que ser el mismo texto**: Google
 * exige que lo marcado sea idéntico a lo que se ve, y antes acá había dos
 * juegos de preguntas distintos.
 *
 * Cómo escribirlas (esto es lo que hace que un asistente de IA las cite):
 * - La primera oración responde Y nombra "Dentidad". La respuesta se extrae
 *   sola, sin el resto de la página al lado.
 * - Se repite el dato duro aunque suene redundante.
 * - Nada de "nosotros", "acá" ni "este sistema" sin antecedente.
 * - Entre 45 y 65 palabras.
 * - **Nada que no exista.** Todo lo de acá está funcionando en producción.
 */

import {
  formatPlanPrice,
  LAUNCH_PROMO,
  plans,
  promoPricesList,
  TRIAL_DAYS,
} from "./plans-data";

export type FaqItem = { q: string; a: string };

/** Precio de lista de un plan, leído de plans-data (una sola fuente). */
function listPrice(id: string): string {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`faq-data: no existe el plan "${id}"`);
  return formatPlanPrice(plan.priceArs);
}

const PROMO = `${LAUNCH_PROMO.percentOff}% de descuento los primeros ${LAUNCH_PROMO.months} meses`;

export const faqs: FaqItem[] = [
  {
    q: "¿Qué es Dentidad?",
    a: "Dentidad es un software web de gestión para consultorios y clínicas odontológicas de Argentina. Reúne agenda con recordatorios automáticos, reserva de turnos online, ficha clínica, odontograma digital, caja diaria, presupuestos, facturación electrónica ARCA y portal del paciente en una sola plataforma, accesible desde computadora, tablet y celular.",
  },
  {
    q: "¿Cuánto cuesta Dentidad?",
    a: `Dentidad tiene tres planes en pesos argentinos, con IVA incluido y sin permanencia: Esencial ${listPrice("esencial")} por mes para un dentista, Clínica ${listPrice("clinica")} por mes para hasta tres dentistas más recepción, y Multi-sede ${listPrice("multisede")} por mes para cadenas. Todos incluyen ${TRIAL_DAYS} días gratis y, por la promo de lanzamiento, ${PROMO}.`,
  },
  {
    q: "¿Dentidad tiene alguna promoción para empezar?",
    a: `Sí. Dentidad tiene una promo de lanzamiento vigente: después de los ${TRIAL_DAYS} días gratis, cualquier plan se paga con ${PROMO}. Queda en ${promoPricesList()} por mes, con IVA incluido. Pasados esos ${LAUNCH_PROMO.months} meses se paga el precio de lista, mes a mes y sin permanencia.`,
  },
  {
    q: "¿Los pacientes pueden sacar turno solos por internet?",
    a: "Sí. Dentidad le da a cada consultorio un link público de reserva de turnos online: el paciente elige profesional, día y horario, deja sus datos y el turno entra a la agenda como pendiente. El consultorio define su horario de atención y con cuánta anticipación mínima se puede reservar.",
  },
  {
    q: "¿Se puede cobrar una seña al reservar el turno?",
    a: "Sí. Dentidad se integra con Mercado Pago para cobrar una seña al momento de reservar el turno online. El consultorio conecta su propia cuenta de Mercado Pago, define qué servicios llevan seña y por cuánto, y el dinero entra directo a esa cuenta. Sirve para reducir ausencias.",
  },
  {
    q: "¿Cada profesional puede tener su propio horario?",
    a: "Sí. En Dentidad cada profesional puede tener su propio horario semanal, con hasta tres tramos por día, por ejemplo mañana y tarde. Si no carga uno, usa el horario del consultorio. La reserva online le ofrece al paciente solo los horarios libres de ese profesional, y la agenda del día muestra una columna por profesional, lado a lado.",
  },
  {
    q: "¿Qué pasa con la reserva online en feriados o vacaciones?",
    a: "Dentidad permite cerrar un día o un rango de días, de hasta dos meses de una vez, para todo el consultorio o para un solo profesional, con un motivo como feriado, vacaciones o congreso. Esos días la reserva online de Dentidad deja de ofrecer turnos, así ningún paciente reserva cuando el consultorio no atiende.",
  },
  {
    q: "¿Puedo impedir que un paciente que falta siga reservando online?",
    a: "Sí. Desde la ficha del paciente, Dentidad permite bloquearle la reserva online: ese paciente ya no puede sacar turno por el link público del consultorio. El bloqueo no toca la agenda, así que el consultorio le sigue dando turnos a mano cuando quiera. Sirve para el paciente que reserva y falta seguido, y ocupa horarios que otro podría usar.",
  },
  {
    q: "¿Cómo manda los recordatorios de turnos?",
    a: "Dentidad manda recordatorios por WhatsApp y por email. El mensaje lleva un link donde el paciente confirma el turno o avisa que no puede asistir, y la agenda se actualiza sola. Los de email salen automáticamente el día anterior a las 17, sin que nadie del consultorio toque nada.",
  },
  {
    q: "¿Si un paciente avisa que no viene, se libera ese horario?",
    a: "Sí. En Dentidad, cuando el paciente avisa que no puede asistir, el turno queda marcado en la agenda como aviso y ese horario vuelve a estar disponible: el consultorio puede dar el lugar a otro paciente y también reaparece en la reserva online. El turno cancelado queda como registro.",
  },
  {
    q: "¿Dentidad emite facturas electrónicas de ARCA (ex AFIP)?",
    a: "Sí. Dentidad emite Factura C electrónica con CAE real contra los web services de ARCA, ex AFIP, y genera el PDF con código QR. Cada consultorio carga su propio certificado digital desde un asistente que lo guía paso a paso, y puede anular con nota de crédito cuando hace falta.",
  },
  {
    q: "¿Tiene odontograma digital?",
    a: "Sí. El odontograma de Dentidad es digital, con doble vista inicial y actual, dentición permanente y temporaria, cinco caras por pieza y ocho procedimientos clínicos. Cada evolución queda anclada a la pieza y la cara tratadas, y el odontograma se exporta a PDF para imprimir o adjuntar.",
  },
  {
    q: "¿Cómo se hacen los presupuestos?",
    a: "En Dentidad el presupuesto se arma tratamiento por tratamiento desde el nomenclador del consultorio, con cantidad y precio unitario. Muestra el precio de contado con su descuento y los planes de cuotas que ofrece el consultorio, se envía al paciente por WhatsApp o email y se descarga en PDF.",
  },
  {
    q: "¿Puedo dividir un tratamiento largo en etapas?",
    a: "Sí. En Dentidad el plan de tratamiento se arma en etapas, cada una con sus tratamientos, su subtotal y su propio presupuesto. Cada presupuesto queda pendiente, aceptado o rechazado, y solo lo aceptado pasa a ser deuda del paciente. El plan muestra por separado lo planificado, lo aceptado y lo que todavía falta aceptar.",
  },
  {
    q: "¿Cómo sé qué pacientes me deben?",
    a: "Dentidad tiene en Facturación una pestaña Deudores con cada paciente que tiene saldo, ordenados por deuda y con buscador, y una pestaña Pendientes con los tratamientos realizados que todavía no se cobraron. En los reportes, Dentidad suma además el total adeudado y entre cuántos pacientes se reparte, así ningún tratamiento hecho queda sin cobrar.",
  },
  {
    q: "¿Dentidad aplica descuentos por medio de pago?",
    a: "Sí. En Dentidad el consultorio configura un porcentaje de descuento para el pago en efectivo y otro para el pago por transferencia. Al cobrar con ese medio, Dentidad propone el descuento solo, sin cuentas a mano, y la deuda del paciente se cancela completa. Los presupuestos muestran también el precio de contado con su descuento.",
  },
  {
    q: "¿Puedo dejar avisos en la ficha de un paciente?",
    a: "Sí. Dentidad permite dejar alertas cortas en la ficha de cada paciente, por ejemplo «ferulizar corona» para el profesional que sigue el caso. Las alertas aparecen arriba de la ficha con un contador, se marcan por gravedad y quedan visibles hasta que alguien las marca como hechas, sin tener que ir a buscarlas al presupuesto.",
  },
  {
    q: "¿Dentidad manda indicaciones después del tratamiento?",
    a: "Sí. En Dentidad cada tratamiento del nomenclador guarda sus indicaciones post tratamiento, como los cuidados después de una extracción. Desde la evolución se le entregan al paciente por WhatsApp, por email o impresas. Dentidad deja registrado qué se le entregó y con qué texto, aunque después el consultorio corrija la indicación.",
  },
  {
    q: "¿El paciente puede ver sus turnos y comprobantes?",
    a: "Sí. Dentidad tiene un portal del paciente con link propio, sin contraseña: cada paciente ve sus próximos turnos, sus comprobantes y presupuestos, y puede descargarlos en PDF. También puede confirmar o avisar que no asiste, y completar su ficha previa antes de llegar al consultorio.",
  },
  {
    q: "¿Cómo migro mis datos de Excel o de otro sistema?",
    a: "Dentidad importa la lista de pacientes desde un archivo Excel o CSV, con vista previa antes de confirmar: se cargan nombre, documento, teléfono, email y obra social. Si venís de otro sistema de gestión, pedile la exportación de tus datos y el equipo de Dentidad te acompaña en el pase.",
  },
  {
    q: "¿Puedo darle acceso a mi secretaria o a otro profesional?",
    a: "Sí. En Dentidad se suman usuarios con roles diferenciados: administrador, profesional y recepción. Cada rol ve y edita solo lo que le corresponde, y el consultorio define qué secciones de la ficha clínica puede abrir la recepción. El plan Clínica incluye hasta tres dentistas más recepción.",
  },
  {
    q: "¿Puedo elegir qué ve cada persona del equipo?",
    a: "Sí. Además de los roles de administrador, profesional y recepción, Dentidad permite elegir qué secciones ve cada integrante del equipo, persona por persona: evoluciones, odontograma, anamnesis, facturación, reportes, consentimientos o galería. Todo viene habilitado y el consultorio destilda lo que no quiere que vea cada uno, por ejemplo los reportes para la recepción.",
  },
  {
    q: "¿Las obras sociales argentinas ya vienen cargadas?",
    a: "Sí. Dentidad trae más de 70 obras sociales argentinas precargadas, entre ellas OSDE, PAMI, APROSS, Federada Salud, Swiss Medical, Galeno, Medifé, SanCor Salud, OSECAC y Jerárquicos Salud, además de Particular. Si a un consultorio le falta alguna, se agrega. Cada paciente guarda su obra social, plan y número de afiliado.",
  },
  {
    q: "¿Necesito instalar algo en mi computadora?",
    a: "No. Dentidad funciona desde el navegador, en computadora, tablet y celular, sin instalar nada. En el celular se puede agregar a la pantalla de inicio y usarla como una app, con notificaciones cuando un paciente reserva un turno o responde un recordatorio. Sí hace falta conexión a internet.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Sí. En Dentidad los datos viajan encriptados y se guardan en infraestructura profesional en la nube, con backups automáticos, así que nada queda en la computadora del consultorio. Cada clínica ve únicamente sus propios pacientes, y los certificados fiscales se guardan cifrados y separados por clínica.",
  },
  {
    q: "¿Qué pasa si quiero dejar de usar Dentidad?",
    a: "Los datos son del consultorio. Dentidad no tiene permanencia ni contrato a largo plazo: se paga mes a mes y se da de baja cuando se quiera. La información de pacientes se puede exportar en cualquier momento a un archivo Excel o CSV para llevarla a donde haga falta.",
  },
];
