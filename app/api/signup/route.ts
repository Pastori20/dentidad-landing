import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lee las env vars (configurar en Vercel)
// RESEND_API_KEY: API key de Resend (resend.com)
// NOTIFY_EMAIL: a dónde te llegan los nuevos signups (Bauti)
// FROM_EMAIL: from address (default: onboarding@resend.dev para desarrollo)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "info.dentidad@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

type SignupBody = {
  email: string;
  nombre: string;
  consultorio: string;
  ciudad: string;
  cantidadDentistas: string;
  plan: string;
  telefono?: string;
  mensaje?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  // Validate that we have the API key configured
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY no configurada");
    return NextResponse.json(
      { error: "Configuración del servidor incompleta. Avisame por DM." },
      { status: 500 }
    );
  }

  let body: SignupBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Datos inválidos" },
      { status: 400 }
    );
  }

  // Validación básica server-side
  const { email, nombre, consultorio, ciudad, cantidadDentistas, plan } = body;
  if (!email || !nombre || !consultorio || !ciudad || !cantidadDentistas || !plan) {
    return NextResponse.json(
      { error: "Completá todos los campos requeridos" },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Email inválido" },
      { status: 400 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);
  const timestamp = new Date().toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
  });

  // 1) Email a Bauti — nuevo signup
  const notifyHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #063760; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #063760, #0a4978); padding: 24px; border-radius: 12px; color: white; text-align: center; margin-bottom: 24px;">
        <p style="font-size: 12px; letter-spacing: 2px; opacity: 0.7; margin: 0 0 8px;">DENTIDAD</p>
        <h1 style="font-size: 24px; margin: 0; font-weight: 800;">🎉 Nuevo signup</h1>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><strong>Nombre:</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">${escape(nombre)}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><strong>Email:</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><a href="mailto:${escape(email)}" style="color: #00A085; text-decoration: none;">${escape(email)}</a></td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><strong>Consultorio:</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">${escape(consultorio)}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><strong>Ciudad:</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">${escape(ciudad)}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><strong>Dentistas:</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">${escape(cantidadDentistas)}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><strong>Plan interesado:</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><span style="display: inline-block; background: #B7F2E5; color: #00A085; font-weight: 700; padding: 4px 10px; border-radius: 6px;">${escape(plan)}</span></td></tr>
        ${body.telefono ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><strong>Teléfono:</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;"><a href="https://wa.me/${onlyDigits(body.telefono)}" style="color: #00A085;">${escape(body.telefono)}</a></td></tr>` : ""}
        ${body.mensaje ? `<tr><td colspan="2" style="padding: 16px 0;"><strong>Mensaje:</strong><div style="margin-top: 8px; padding: 12px; background: #F4F6F8; border-radius: 8px; color: #475569;">${escape(body.mensaje)}</div></td></tr>` : ""}
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #FFF3D6; border-left: 4px solid #F59E0B; border-radius: 4px;">
        <p style="margin: 0; font-size: 14px; color: #7C2D12;"><strong>Próximo paso:</strong> creale la cuenta en tu app y mandale las credenciales por mail/WhatsApp. El trial de 14 días arranca cuando entre.</p>
      </div>

      <p style="margin-top: 24px; font-size: 12px; color: #9CA3AF; text-align: center;">Recibido: ${timestamp}</p>
    </div>
  `;

  // 2) Email al usuario — confirmación
  const userHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #063760; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #063760, #0a4978); padding: 32px 24px; border-radius: 12px; color: white; text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; width: 64px; height: 64px; background: white; border-radius: 50%; position: relative; margin-bottom: 16px;">
          <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; font-weight: 900; color: #063760; line-height: 1;">d</span>
          <span style="position: absolute; top: 8px; right: 8px; width: 12px; height: 12px; background: #00C9A7; border-radius: 50%;"></span>
        </div>
        <h1 style="font-size: 28px; margin: 0 0 8px; font-weight: 800;">¡Bienvenido a Dentidad!</h1>
        <p style="margin: 0; opacity: 0.85; font-size: 16px;">Recibimos tu pedido para probar 14 días gratis</p>
      </div>

      <p style="font-size: 16px; line-height: 1.6;">Hola ${escape(nombre.split(" ")[0])},</p>

      <p style="font-size: 16px; line-height: 1.6;">Gracias por interesarte en Dentidad. En las próximas <strong>24 horas</strong> te vamos a estar creando tu cuenta en el sistema y enviándote por mail (y WhatsApp si dejaste número) las credenciales para entrar.</p>

      <p style="font-size: 16px; line-height: 1.6;">Apenas entres, tu trial de <strong>14 días gratis</strong> arranca automáticamente. Sin tarjeta, sin permanencia.</p>

      <div style="margin: 24px 0; padding: 20px; background: #F4F6F8; border-radius: 12px;">
        <p style="font-size: 14px; font-weight: 700; color: #00A085; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1px;">⏱ Qué viene ahora</p>
        <ol style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8; font-size: 15px;">
          <li>Te creamos tu cuenta y workspace</li>
          <li>Te enviamos las credenciales</li>
          <li>Te asistimos en el setup inicial si querés</li>
          <li>Probás 14 días gratis sin compromiso</li>
        </ol>
      </div>

      <p style="font-size: 16px; line-height: 1.6;">Si tenés cualquier pregunta o querés acelerar el proceso, escribime directo a <a href="mailto:info.dentidad@gmail.com" style="color: #00A085; font-weight: 600; text-decoration: none;">info.dentidad@gmail.com</a> o por WhatsApp.</p>

      <p style="font-size: 16px; line-height: 1.6; margin-top: 24px;">Saludos,<br><strong>Bautista</strong><br><span style="color: #9CA3AF; font-size: 14px;">Fundador, Dentidad</span></p>

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E5E7EB; text-align: center;">
        <p style="font-size: 12px; color: #9CA3AF; margin: 0;">Dentidad · Software dental para Argentina · <a href="https://dentidad.com" style="color: #00A085; text-decoration: none;">dentidad.com</a></p>
      </div>
    </div>
  `;

  try {
    // 1) NOTIFY EMAIL es lo crítico — si esto falla, fallamos la request entera.
    // Es el lead capture: si no llega a Bauti, perdemos al cliente.
    const notifyRes = await resend.emails.send({
      from: `Dentidad <${FROM_EMAIL}>`,
      to: NOTIFY_EMAIL,
      subject: `🎉 Nuevo signup: ${nombre} — ${consultorio}`,
      replyTo: email,
      html: notifyHtml,
    });

    if (notifyRes.error) {
      console.error("Resend notify error:", notifyRes.error);
      return NextResponse.json(
        {
          error:
            "Hubo un problema. Escribinos directamente a info.dentidad@gmail.com.",
        },
        { status: 500 }
      );
    }

    // 2) USER EMAIL es nice-to-have — si el dominio no está verificado en Resend
    // o si el email del user rebota, NO fallamos la request. El lead ya está
    // capturado y Bauti puede contactar manualmente.
    try {
      const userRes = await resend.emails.send({
        from: `Dentidad <${FROM_EMAIL}>`,
        to: email,
        subject: `¡Bienvenido a Dentidad! Te creamos la cuenta en <24h`,
        html: userHtml,
      });
      if (userRes.error) {
        // Log pero no fallar — el lead ya está
        console.warn(
          "User confirmation email failed (lead captured OK):",
          userRes.error
        );
      }
    } catch (userErr) {
      console.warn(
        "User confirmation email threw (lead captured OK):",
        userErr
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Hubo un problema inesperado. Intentalo de nuevo." },
      { status: 500 }
    );
  }
}

function escape(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function onlyDigits(text: string): string {
  return text.replace(/\D/g, "");
}
