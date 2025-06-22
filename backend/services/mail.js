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
  // 1) pega a URL base do front-end
  const baseUrl = process.env.FRONTEND_URL;

  // 2) escolhe o caminho conforme o perfil
  let portalPath;
  switch (role) {
    case 'dono':
      portalPath = '/login-dono';
      break;
    case 'tutor':
      portalPath = '/login-tutor';
      break;
    default:
      portalPath = '/login-cliente';
  }

  // 3) monta a URL completa
  const portalUrl = `${baseUrl}${portalPath}`;

  // 4) compõe o e-mail
  const subject = 'Bem-vindo ao WalkyLovingDogs!';
  const text =
    `Olá ${name},\n\n` +
    `Seja bem-vindo ao portal do ${role[0].toUpperCase() + role.slice(1)}!\n` +
    `Acesse em: ${portalUrl}\n` +
    `Use seu e-mail (${to}) para login.\n\n` +
    `Abraço,\nEquipe WalkyLovingDogs`;

  // 5) envia
  const info = await transporter.sendMail({
    from: `"WalkyLovingDogs" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });

  console.log(`E-mail de boas-vindas enviado a ${to}, messageId: ${info.messageId}`);
}

module.exports = { sendWelcomeEmail };
