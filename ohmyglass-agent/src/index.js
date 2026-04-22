// SETUP:
// 1. npm install -g wrangler
// 2. wrangler login
// 3. wrangler secret put RESEND_API_KEY
// 4. wrangler deploy
//
// ENDPOINTS (POST + JSON):
//   /quote    — quote request email (same as / for backward compatibility)
//   /message  — general message email
//   /         — alias for /quote
//
// TEST QUOTE:
// curl -X POST https://your-worker.workers.dev/quote \
//   -H "Content-Type: application/json" \
//   -d '{"caller_name":"Test","caller_phone":"14161234567","issue_type":"Foggy window","is_urgent":false,"property_type":"residential","postal_code":"M5H 2N2"}'
//
// TEST MESSAGE:
// curl -X POST https://your-worker.workers.dev/message \
//   -H "Content-Type: application/json" \
//   -d '{"caller_name":"Test","caller_phone":"14161234567","message":"When can you come by?"}'
//
// RETELL (quote):
// URL: https://your-worker.workers.dev/quote  (or /)
// caller_phone default {{call.from_number}}

const TO_EMAIL = "info@ohmyglass.ca";
const FROM_EMAIL = "hello@ednsy.com";

/** Logo from production site (email theme) */
const SITE_LOGO_URL = "https://ohmyglass.ca/images/logo.webp";

/**
 * Formats a raw phone number string to Canadian format: (416) 123-4567
 * @param {string|undefined} raw
 * @returns {string}
 */
function formatPhone(raw) {
  if (!raw) return "Not provided";
  const digits = raw.replace(/\D/g, "");
  const local = digits.startsWith("1") && digits.length === 11
    ? digits.slice(1)
    : digits;
  if (local.length !== 10) return raw;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}

/**
 * Normalizes Canadian postal codes to "A1A 1A1". If shape is unexpected, returns trimmed input or "Not provided".
 * @param {string|undefined} raw
 * @returns {string}
 */
function formatPostalCode(raw) {
  if (!raw || typeof raw !== "string") return "Not provided";
  const compact = raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (compact.length !== 6) return raw.trim() || "Not provided";
  return `${compact.slice(0, 3)} ${compact.slice(3)}`;
}

/**
 * Returns a formatted Toronto-timezone timestamp string.
 * e.g. "Monday, April 8, 2026 at 02:30 PM"
 * @returns {string}
 */
function torontoTimestamp() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date()).replace(",", ",").replace(" at ", " at ");
}

/**
 * Builds the HTML email body.
 * @param {object} p
 * @returns {string}
 */
function buildHtml({ callerName, displayPhone, displayPostal, propertyLabel, issueType, isUrgent, additionalNotes, callTime }) {
  const urgencyCell = isUrgent
    ? `<span style="color:#d32f2f;font-weight:700;">Yes, emergency</span>`
    : `<span style="color:#374151;font-weight:600;">No (standard)</span>`;

  const notesRow = additionalNotes
    ? `<tr>
        <td style="${LABEL_STYLE}">Notes</td>
        <td style="${VALUE_STYLE}">${escapeHtml(additionalNotes)}</td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OhMyGlass Quote Request</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@700&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:Inter,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(26,26,26,0.08);border:1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(90deg,#3a3a3a 0%,#1a1a1a 100%);padding:20px 28px;">
              <img src="${SITE_LOGO_URL}" alt="OhMyGlass" width="180" style="display:block;max-width:180px;height:auto;filter:drop-shadow(0 0 8px rgba(255,255,255,0.35));" />
            </td>
          </tr>

          <!-- Data Table -->
          <tr>
            <td style="padding:8px 0 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="${LABEL_STYLE}">Name</td>
                  <td style="${VALUE_STYLE}">${escapeHtml(callerName)}</td>
                </tr>
                <tr>
                  <td style="${LABEL_STYLE}">Phone Number</td>
                  <td style="${VALUE_STYLE}">
                    <a href="tel:${escapeHtml(displayPhone)}" style="color:#d32f2f;font-weight:700;text-decoration:none;">${escapeHtml(displayPhone)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="${LABEL_STYLE}">Postal Code</td>
                  <td style="${VALUE_STYLE}">${escapeHtml(displayPostal)}</td>
                </tr>
                <tr>
                  <td style="${LABEL_STYLE}">Property Type</td>
                  <td style="${VALUE_STYLE}">${escapeHtml(propertyLabel)}</td>
                </tr>
                <tr>
                  <td style="${LABEL_STYLE}">Glass Issue</td>
                  <td style="${VALUE_STYLE}">${escapeHtml(issueType)}</td>
                </tr>
                <tr>
                  <td style="${LABEL_STYLE}">Urgency</td>
                  <td style="${VALUE_STYLE}">${urgencyCell}</td>
                </tr>
                ${notesRow}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px 24px 28px;background:#f5f7fa;">
              <div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#6b7280;font-size:12px;">Clara (voice) · ${escapeHtml(callTime)}</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Builds the plain-text email body.
 * @param {object} p
 * @returns {string}
 */
function buildText({ callerName, displayPhone, displayPostal, propertyLabel, issueType, isUrgent, additionalNotes, callTime }) {
  const urgencyValue = isUrgent ? "Yes, emergency" : "No";
  const notesValue = additionalNotes || "None";

  return `Name:     ${callerName}
Phone:    ${displayPhone}
Postal:   ${displayPostal}
Property: ${propertyLabel}
Issue:    ${issueType}
Urgent:   ${urgencyValue}
Notes:    ${notesValue}
------------------------------
Clara (voice) · ${callTime}`;
}

const LABEL_STYLE = "padding:12px 16px;font-family:Montserrat,Helvetica,Arial,sans-serif;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;white-space:nowrap;width:140px;border-bottom:1px solid #e5e7eb;";
const VALUE_STYLE = "padding:12px 16px;font-family:Inter,Helvetica,Arial,sans-serif;color:#1a1a1a;font-size:15px;border-bottom:1px solid #e5e7eb;";

/**
 * @param {object} p
 * @returns {string}
 */
function buildMessageHtml({ callerName, displayPhone, messageText, callTime }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OhMyGlass Message</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@700&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:Inter,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(26,26,26,0.08);border:1px solid #e5e7eb;">
          <tr>
            <td style="background:linear-gradient(90deg,#3a3a3a 0%,#1a1a1a 100%);padding:20px 28px;">
              <img src="${SITE_LOGO_URL}" alt="OhMyGlass" width="180" style="display:block;max-width:180px;height:auto;filter:drop-shadow(0 0 8px rgba(255,255,255,0.35));" />
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="${LABEL_STYLE}">Name</td>
                  <td style="${VALUE_STYLE}">${escapeHtml(callerName)}</td>
                </tr>
                <tr>
                  <td style="${LABEL_STYLE}">Phone Number</td>
                  <td style="${VALUE_STYLE}">
                    <a href="tel:${escapeHtml(displayPhone)}" style="color:#d32f2f;font-weight:700;text-decoration:none;">${escapeHtml(displayPhone)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="${LABEL_STYLE};vertical-align:top;">Message</td>
                  <td style="${VALUE_STYLE};white-space:pre-wrap;border-bottom:none;">${escapeHtml(messageText)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px 28px;background:#f5f7fa;">
              <div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#6b7280;font-size:12px;">Clara (voice) · ${escapeHtml(callTime)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * @param {object} p
 * @returns {string}
 */
function buildMessageText({ callerName, displayPhone, messageText, callTime }) {
  return `Name:    ${callerName}
Phone:   ${displayPhone}
Message:
${messageText}
------------------------------
Clara (voice) · ${callTime}`;
}

/**
 * @param {object} env
 * @param {{ subject: string, html: string, text: string }} payload
 * @returns {Promise<Response>}
 */
async function sendViaResend(env, { subject, html, text }) {
  const toEmail = env.TO_EMAIL ?? TO_EMAIL;
  const fromEmail = env.FROM_EMAIL ?? FROM_EMAIL;
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
      text,
    }),
  });
  return resendResponse;
}

/**
 * Minimal HTML escaping to prevent injection in email body.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const JSON_HEADERS = { "Content-Type": "application/json" };

/**
 * @param {object} args
 * @param {object} env
 * @returns {Promise<Response>}
 */
async function handleQuote(args, env) {
  const {
    caller_name,
    caller_phone,
    issue_type,
    is_urgent,
    property_type,
    postal_code,
    additional_notes,
  } = args;

  if (!caller_name || !issue_type || is_urgent === undefined || is_urgent === null || !property_type || !String(postal_code ?? "").trim()) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing required fields" }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  const displayPhone = formatPhone(caller_phone);
  const displayPostal = formatPostalCode(postal_code);
  const isUrgent = Boolean(is_urgent);
  const propertyLabel = property_type === "commercial" ? "Commercial" : "Residential";
  const callTime = torontoTimestamp();

  const emailData = {
    callerName: caller_name,
    displayPhone,
    displayPostal,
    propertyLabel,
    issueType: issue_type,
    isUrgent,
    additionalNotes: additional_notes || "",
    callTime,
  };

  const subject = isUrgent
    ? `🚨 URGENT Quote | ${caller_name} | ${displayPhone} | ${displayPostal}`
    : `📋 New Quote | ${caller_name} | ${displayPhone} | ${displayPostal}`;

  let resendResponse;
  try {
    resendResponse = await sendViaResend(env, {
      subject,
      html: buildHtml(emailData),
      text: buildText(emailData),
    });
  } catch (err) {
    console.error("Resend fetch error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Unexpected error." }),
      { status: 500, headers: JSON_HEADERS }
    );
  }

  if (!resendResponse.ok) {
    const errBody = await resendResponse.text().catch(() => "(unreadable)");
    console.error(`Resend API error ${resendResponse.status}:`, errBody);
    return new Response(
      JSON.stringify({ success: false, message: "Email failed to send." }),
      { status: 502, headers: JSON_HEADERS }
    );
  }

  return new Response(
    JSON.stringify({ success: true, message: `Email sent to ${caller_name} successfully.` }),
    { status: 200, headers: JSON_HEADERS }
  );
}

/**
 * General message (non-quote). Requires caller_name and message (or body).
 * @param {object} args
 * @param {object} env
 * @returns {Promise<Response>}
 */
async function handleMessage(args, env) {
  const caller_name = args.caller_name;
  const caller_phone = args.caller_phone;
  const rawMessage = args.message ?? args.body ?? "";

  if (!String(caller_name ?? "").trim() || !String(rawMessage).trim()) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing required fields" }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  const messageText = String(rawMessage).trim();
  const displayPhone = formatPhone(caller_phone);
  const callTime = torontoTimestamp();

  const emailData = {
    callerName: String(caller_name).trim(),
    displayPhone,
    messageText,
    callTime,
  };

  const subject = `💬 Message | ${emailData.callerName} | ${displayPhone}`;

  let resendResponse;
  try {
    resendResponse = await sendViaResend(env, {
      subject,
      html: buildMessageHtml(emailData),
      text: buildMessageText(emailData),
    });
  } catch (err) {
    console.error("Resend fetch error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Unexpected error." }),
      { status: 500, headers: JSON_HEADERS }
    );
  }

  if (!resendResponse.ok) {
    const errBody = await resendResponse.text().catch(() => "(unreadable)");
    console.error(`Resend API error ${resendResponse.status}:`, errBody);
    return new Response(
      JSON.stringify({ success: false, message: "Email failed to send." }),
      { status: 502, headers: JSON_HEADERS }
    );
  }

  return new Response(
    JSON.stringify({ success: true, message: `Email sent to ${emailData.callerName} successfully.` }),
    { status: 200, headers: JSON_HEADERS }
  );
}

export default {
  /**
   * Cloudflare Worker fetch handler.
   * @param {Request} request
   * @param {object} env
   * @returns {Promise<Response>}
   */
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: JSON_HEADERS }
      );
    }

    let path = new URL(request.url).pathname;
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid JSON body." }),
        { status: 400, headers: JSON_HEADERS }
      );
    }

    const args = body?.args ?? body ?? {};

    if (path === "/message") {
      return handleMessage(args, env);
    }
    if (path === "/" || path === "/quote") {
      return handleQuote(args, env);
    }

    return new Response(
      JSON.stringify({ success: false, message: "Not found" }),
      { status: 404, headers: JSON_HEADERS }
    );
  },
};
