import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('Missing SendGrid API key');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export { sgMail };