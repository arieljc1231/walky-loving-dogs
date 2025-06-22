// services/mail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   Number(process.env.EMAIL_PORT),
  secure: false,    // true para 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendWelcomeEmail(to, name, role) {
  // Define a URL de login conforme o perfil
  let portalUrl;
  switch (role) {
    case 'dono':
      portalUrl = 'http://seu-dominio.com/login-dono';
      break;
    case 'tutor':
      portalUrl = 'http://seu-dominio.com/login-tutor';
      break;
    default:
      portalUrl = 'http://seu-dominio.com/login-cliente';
  }

  const subject = 'Bem-vindo ao WalkyLovingDogs!';
  const text =
    `Olá ${name},\n\n` +
    `Seja bem-vindo ao portal do ${role.charAt(0).toUpperCase() + role.slice(1)}!\n` +
    `Acesse em: ${portalUrl}\n` +
    `Use seu e-mail (${to}) para login.\n\n` +
    `Abraço,\nEquipe WalkyLovingDogs`;

  const info = await transporter.sendMail({
    from: `"WalkyLovingDogs" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });

  console.log(`E-mail de boas-vindas enviado a ${to}, messageId: ${info.messageId}`);
}

module.exports = { sendWelcomeEmail };
