import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const nombre = clean(body.nombre, 120);
    const email = clean(body.email, 254).toLowerCase();
    const asunto = clean(body.asunto, 160);
    const comentarios = clean(body.comentarios, 500);
    const recaptchaToken = clean(body.recaptchaToken, 4096);
    const honeypot = clean(body.website, 120);

    if (honeypot) return json({ ok: true });

    if (!nombre || !asunto || !comentarios || !email) {
      return json({ ok: false, message: "Completa todos los campos." }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(email)) {
      return json({ ok: false, message: "Ingresa un correo electrónico válido." }, 400);
    }

    const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret || !recaptchaToken) {
      return json({ ok: false, message: "El formulario no está configurado todavía." }, 503);
    }

    const verificationResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: recaptchaSecret, response: recaptchaToken }),
    });
    const verification = await verificationResponse.json();
    const minimumScore = Number(import.meta.env.RECAPTCHA_MIN_SCORE || "0.5");

    if (
      !verification.success ||
      verification.action !== "contact" ||
      Number(verification.score || 0) < minimumScore
    ) {
      return json({ ok: false, message: "No se pudo validar el envío. Inténtalo nuevamente." }, 403);
    }

    const smtpHost = import.meta.env.SMTP_HOST;
    const smtpUser = import.meta.env.SMTP_USER;
    const smtpPassword = import.meta.env.SMTP_PASSWORD;
    const smtpPort = Number(import.meta.env.SMTP_PORT || "465");
    const contactTo = import.meta.env.CONTACT_TO || "contacto@identidadprofesional.cl";

    if (!smtpHost || !smtpUser || !smtpPassword) {
      return json({ ok: false, message: "El servicio de correo no está configurado todavía." }, 503);
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPassword },
    });

    await transporter.sendMail({
      from: import.meta.env.SMTP_FROM || smtpUser,
      to: contactTo,
      replyTo: email,
      subject: `[Sitio web] ${asunto}`,
      text: `Nombre: ${nombre}\nCorreo: ${email}\n\n${comentarios}`,
    });

    return json({ ok: true, message: "Mensaje enviado correctamente." });
  } catch {
    return json({ ok: false, message: "No fue posible enviar el mensaje. Inténtalo nuevamente." }, 500);
  }
};
