const jwt = require('jsonwebtoken');
const tokenJSON = 'pochocloSecreto123';
const repositorioUsuario = require('../repositorio/repositorioUsuario');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.registrarUsuario = async (data) => {
  try {
    //console.log('Servicio: registrarUsuario', data);
    await repositorioUsuario.crearUsuario(data);
  } catch (error) {
    //console.log('Servicio: registrarUsuario error', error);
    throw new Error('Error al registrar usuario: ' + error.message);
  }
};

exports.loginUsuario = async ({ email, password }) => {
  try {
    //console.log('Servicio: loginUsuario', { email, password });
    const usuario = await repositorioUsuario.buscarUsuarioPorEmail(email);
    if (!usuario) return console.log('Usuario no encontrado');
    const esValida = await usuario.compararPassword(password);
    if (!esValida) return console.log('Contraseña incorrecta');
    return jwt.sign({ id: usuario._id, email: usuario.email }, tokenJSON, { expiresIn: '2h' });
  } catch (error) {
    //console.log('Servicio: loginUsuario error', error);
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};

exports.buscarUsuarioPorEmail = async (email) => {
  try {
    //console.log('Servicio: buscarUsuarioPorEmail', email); //para controlar errores
    return await repositorioUsuario.buscarUsuarioPorEmail(email);
  } catch (error) {
    //console.log('Servicio: buscarUsuarioPorEmail error', error);
    throw new Error('Error al buscar usuario por email: ' + error.message);
  }
};

exports.solicitarRecuperacion = async (email) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) throw new Error('Usuario no encontrado');

  // Generar token y expiración
  const token = crypto.randomBytes(20).toString('hex');
  usuario.resetPasswordToken = token;
  usuario.resetPasswordExpires = Date.now() + 3600000; // 1 hora
  await usuario.save();

  // Configurar el transporte de correo
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tucorreo@gmail.com', // reemplazar
      pass: 'tu_contraseña_o_contraseña_app' // reemplazar
    }
  });

  const mailOptions = {
    to: usuario.email,
    from: 'no-reply@pochocleando.com',
    subject: 'Restablecer contraseña',
    text: `
Hola ${usuario.username},
Hiciste una solicitud para restablecer tu contraseña.

Hacé clic en el siguiente enlace para continuar:
http://localhost:4200/reset-password/${token}

Si no fuiste vos, ignorá este mensaje.
    `
  };

  await transporter.sendMail(mailOptions);
};