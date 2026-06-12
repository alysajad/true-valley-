const RESEND_API = "https://api.resend.com/emails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Server misconfiguration" });

  const { name, email, phone, date, pkg, travellers, message } = req.body ?? {};

  if (!name || !phone) return res.status(400).json({ error: "Name and phone are required" });

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <div style="background:#193555;padding:24px 28px;">
        <h1 style="margin:0;color:#fff;font-size:20px;letter-spacing:1px;">New Enquiry — True Valley Travels</h1>
      </div>
      <div style="padding:28px;background:#fff;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#6b7280;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#111;">${email || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;color:#111;">+91 ${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Travel Date</td><td style="padding:8px 0;color:#111;">${date || "Not specified"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Travellers</td><td style="padding:8px 0;color:#111;">${travellers || "Not specified"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Package</td><td style="padding:8px 0;color:#111;">${pkg || "Not specified"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Message</td><td style="padding:8px 0;color:#111;white-space:pre-wrap;">${message || "—"}</td></tr>
        </table>
      </div>
      <div style="padding:16px 28px;background:#f9fafb;font-size:12px;color:#9ca3af;text-align:center;">
        Sent from truevalleytravels.com enquiry form
      </div>
    </div>
  `;

  const payload = {
    from: "True Valley Travels <bookings@truevalleytravels.com>",
    to: ["truevalleytours@gmail.com"],
    reply_to: email || undefined,
    subject: `New Enquiry from ${name} — True Valley Travels`,
    html,
  };

  const resendRes = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!resendRes.ok) {
    const err = await resendRes.text();
    console.error("Resend error:", err);
    return res.status(502).json({ error: "Failed to send email", detail: err });
  }

  return res.status(200).json({ ok: true });
}
