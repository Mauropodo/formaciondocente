import type { APIRoute } from "astro";

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const escapeHtml = (value: string) =>
  value.replace(/[&<>\"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#039;" })[
      character
    ] ?? character,
  );

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

    const resendApiKey = import.meta.env.RESEND_API_KEY;
    const emailFrom = import.meta.env.EMAIL_FROM;
    const contactTo = import.meta.env.CONTACT_TO || "contacto@identidadprofesional.cl";

    if (!resendApiKey || !emailFrom) {
      return json({ ok: false, message: "El servicio de correo no está configurado todavía." }, 503);
    }

    const text = `Nombre: ${nombre}\nCorreo: ${email}\nAsunto: ${asunto}\n\n${comentarios}`;
    const html = `
      <h2>Nuevo mensaje desde el sitio web</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(asunto)}</p>
      <hr />
      <p>${escapeHtml(comentarios).replace(/\n/g, "<br />")}</p>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [contactTo],
        reply_to: email,
        subject: `[Sitio web] ${asunto}`,
        text,
        html,
      }),
    });

    if (!resendResponse.ok) {
      return json({ ok: false, message: "No fue posible enviar el mensaje. Inténtalo nuevamente." }, 502);
    }

    return json({ ok: true, message: "Mensaje enviado correctamente." });
  } catch {
    return json({ ok: false, message: "No fue posible enviar el mensaje. Inténtalo nuevamente." }, 500);
  }
};
