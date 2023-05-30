const nodemailer = require('nodemailer');

const mailConfig = require('../config/mailer.js');

const createNewUser = async (to) => {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Conta criada no Foods App',
      text: `Conta criada com sucesso.\n\nAcesse o aplicativo para gerenciar o cadastro de comidas.`,
      html: `<h1>Conta criada com sucesso.</h1><p>Acesse o aplicativo para gerenciar o cadastro de comidas.</p>`,
    });

    console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { createNewUser };
