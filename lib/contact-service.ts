import nodemailer from 'nodemailer';

type ContactFormData = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

export type ContactResult =
  | { success: true }
  | { message: string; success: false };

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || process.env.SMTP_USER,
      pass: process.env.EMAIL_PASS || process.env.SMTP_PASS,
    },
  });
}

export async function sendContactEmail(
  data: ContactFormData,
): Promise<ContactResult> {
  const recipient = process.env.RECIPIENT_EMAIL;
  const senderEmail = process.env.EMAIL_USER || process.env.SMTP_USER;

  if (!recipient || !senderEmail) {
    return { success: false, message: 'Email service not configured.' };
  }

  const transporter = createTransporter();
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
  });
  const { email, message, name, subject } = data;

  try {
    await transporter.sendMail({
      from: `"AccessNovaa Website" <${senderEmail}>`,
      replyTo: email,
      to: recipient,
      subject: `New Contact: ${subject}`,
      html: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);"><tr><td style="background:linear-gradient(135deg,#6b21a8 0%,#db2777 100%);padding:32px 40px;text-align:center;"><h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">AccessNovaa</h1><p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;">Connect Now</p></td></tr><tr><td style="padding:40px;"><h2 style="color:#1e1b4b;margin:0 0 24px;font-size:20px;">New Contact Form Submission</h2><table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:24px;margin-bottom:24px;"><tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;"><span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">From</span><br><span style="color:#1e1b4b;font-size:15px;font-weight:600;">${name}</span></td></tr><tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;"><span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Email</span><br><a href="mailto:${email}" style="color:#7c3aed;font-size:15px;">${email}</a></td></tr><tr><td style="padding:8px 0;"><span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Subject</span><br><span style="color:#1e1b4b;font-size:15px;font-weight:600;">${subject}</span></td></tr></table><div style="background:#faf5ff;border-left:4px solid #7c3aed;border-radius:0 8px 8px 0;padding:20px;margin-bottom:32px;"><p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;margin:0 0 8px;">Message</p><p style="color:#334155;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p></div><a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:linear-gradient(135deg,#6b21a8,#db2777);color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:14px;">Reply to ${name}</a></td></tr><tr><td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;"><p style="color:#94a3b8;font-size:12px;margin:0;">AccessNovaa &bull; ${timestamp}</p></td></tr></table></td></tr></table></body></html>`,
    });

    await transporter.sendMail({
      from: `"AccessNovaa" <${senderEmail}>`,
      to: email,
      subject: 'We received your message – AccessNovaa',
      html: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);"><tr><td style="background:linear-gradient(135deg,#6b21a8 0%,#db2777 100%);padding:32px 40px;text-align:center;"><h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">AccessNovaa</h1><p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;">Connect Now</p></td></tr><tr><td style="padding:40px;"><h2 style="color:#1e1b4b;margin:0 0 16px;font-size:22px;">Hi ${name}!</h2><p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 24px;">Thank you for reaching out to <strong style="color:#7c3aed;">AccessNovaa</strong>. We have received your message and will get back to you within <strong>24 hours</strong>.</p><div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:28px;"><p style="color:#15803d;font-size:13px;font-weight:600;margin:0 0 8px;">Your Submission Summary</p><p style="color:#374151;font-size:14px;margin:4px 0;"><strong>Subject:</strong> ${subject}</p><p style="color:#374151;font-size:14px;margin:4px 0;"><strong>Sent on:</strong> ${timestamp}</p></div><p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 28px;">Meanwhile, you can also reach us via:</p><table cellpadding="0" cellspacing="0"><tr><td style="padding-right:12px;"><a href="https://wa.me/917982171047" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;">WhatsApp Us</a></td><td><a href="mailto:info@accessnovaa.com" style="display:inline-block;background:linear-gradient(135deg,#6b21a8,#db2777);color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;">Email Us</a></td></tr></table></td></tr><tr><td style="background:#faf5ff;padding:28px 40px;"><p style="color:#7c3aed;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 16px;">What happens next?</p><table width="100%"><tr><td width="32" valign="top" style="padding-top:2px;"><span style="background:#7c3aed;color:#fff;border-radius:50%;width:22px;height:22px;display:inline-block;text-align:center;line-height:22px;font-size:12px;font-weight:700;">1</span></td><td style="padding-left:12px;padding-bottom:12px;color:#374151;font-size:14px;">Our team reviews your message carefully</td></tr><tr><td width="32" valign="top" style="padding-top:2px;"><span style="background:#db2777;color:#fff;border-radius:50%;width:22px;height:22px;display:inline-block;text-align:center;line-height:22px;font-size:12px;font-weight:700;">2</span></td><td style="padding-left:12px;padding-bottom:12px;color:#374151;font-size:14px;">We prepare a tailored response for you</td></tr><tr><td width="32" valign="top" style="padding-top:2px;"><span style="background:#6b21a8;color:#fff;border-radius:50%;width:22px;height:22px;display:inline-block;text-align:center;line-height:22px;font-size:12px;font-weight:700;">3</span></td><td style="padding-left:12px;color:#374151;font-size:14px;">You hear from us within 24 hours</td></tr></table></td></tr><tr><td style="padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;"><p style="color:#94a3b8;font-size:12px;margin:0 0 4px;">+91 79821 71047 &bull; info@accessnovaa.com</p><p style="color:#cbd5e1;font-size:11px;margin:0;">&copy; 2025 AccessNovaa &bull; All rights reserved</p></td></tr></table></td></tr></table></body></html>`,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };
  }
}
