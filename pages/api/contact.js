import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SERVICE_LABELS = {
  appraisal:  'Free Property Appraisal',
  selling:    'Selling my property',
  renting:    'Renting out my property',
  management: 'Property management',
  buying:     'Buying a property',
  other:      'General enquiry',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message, service, website } = req.body;

  // Honeypot — bots fill this, humans don't see it
  if (website) return res.status(200).json({ success: true });

  // Validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const serviceLabel = SERVICE_LABELS[service] || service || 'General enquiry';

  try {
    // ── Email to CPP team ──────────────────────────────────────
    await resend.emails.send({
      from:    'CPP Website <onboarding@resend.dev>',
      to:      'gmetharchen96@gmail.com',
      replyTo: email,
      subject: `New Enquiry from ${name} — ${serviceLabel}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0A0A0A;padding:32px 40px;border-bottom:4px solid #C9A84C;">
            <h1 style="color:#fff;font-size:22px;margin:0;font-weight:400;">
              New Enquiry — <span style="color:#C9A84C;">${serviceLabel}</span>
            </h1>
          </div>
          <div style="background:#f9f9f9;padding:32px 40px;">
            <table style="width:100%;border-collapse:collapse;">
              ${[
                ['Name',    name],
                ['Email',   `<a href="mailto:${email}" style="color:#C9A84C;">${email}</a>`],
                ['Phone',   phone || '—'],
                ['Service', serviceLabel],
              ].map(([label, value]) => `
                <tr>
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;letter-spacing:0.08em;color:#666;text-transform:uppercase;width:120px;border-bottom:1px solid #e8e8e8;">${label}</td>
                  <td style="padding:12px 16px;font-size:15px;color:#0A0A0A;border-bottom:1px solid #e8e8e8;">${value}</td>
                </tr>
              `).join('')}
            </table>
            <div style="margin-top:24px;padding:20px;background:#fff;border:1px solid #e8e8e8;border-radius:6px;">
              <p style="font-size:12px;font-weight:700;letter-spacing:0.08em;color:#666;text-transform:uppercase;margin:0 0 10px;">Message</p>
              <p style="font-size:15px;color:#0A0A0A;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background:#0A0A0A;padding:20px 40px;">
            <p style="color:rgba(255,255,255,0.35);font-size:12px;margin:0;">Sent from canberrapropertypartners.com.au contact form</p>
          </div>
        </div>
      `,
    });

    // ── Confirmation email to enquirer ─────────────────────────
    await resend.emails.send({
      from:    'Canberra Property Partners <onboarding@resend.dev>',
      to:      email,
      subject: 'Thanks for your enquiry — Canberra Property Partners',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0A0A0A;padding:40px;text-align:center;border-bottom:4px solid #C9A84C;">
            <h1 style="color:#fff;font-size:28px;font-weight:400;margin:0;">
              Thanks, ${name.split(' ')[0]}!
            </h1>
          </div>
          <div style="background:#f9f9f9;padding:40px;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:#C9A84C;display:inline-flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:24px;">✓</div>
            <p style="font-size:17px;color:#0A0A0A;line-height:1.8;margin:0 0 16px;">
              We've received your enquiry and one of our team will be in touch within <strong>one business day</strong>.
            </p>
            <p style="font-size:15px;color:#666;line-height:1.7;margin:0 0 32px;">
              In the meantime, if you need to speak with us urgently you can call us directly on <a href="tel:0409882375" style="color:#C9A84C;font-weight:600;">0409 882 375</a>.
            </p>
            <a href="https://canberrapropertypartners.com.au/properties"
              style="display:inline-block;padding:16px 36px;background:#0A0A0A;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;letter-spacing:0.06em;">
              Browse Properties →
            </a>
          </div>
          <div style="background:#0A0A0A;padding:24px 40px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0 0 4px;">Canberra Property Partners</p>
            <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0;">10/12 Cheney Place, Mitchell ACT 2911</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Resend error:', error.message);
    return res.status(500).json({ error: 'Failed to send message. Please try again or call us directly.' });
  }
}
