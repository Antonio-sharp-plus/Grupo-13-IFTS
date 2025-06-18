const repositorioUsuarios = require('../repositorio/repositorioUsuario');
const jwt = require('jsonwebtoken');
const tokenJSON = 'pochocloSecreto123';
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (data) => {
  try {
    return await repositorioUsuarios.crearUsuario(data);
  } catch (error) {
    console.log('Error al registrar usuario:', error.message);
  }
};

exports.loginUsuario = async ({ email, password }) => {
  try {
    const usuario = await repositorioUsuarios.buscarUsuarioPorEmail(email); // ✅
    if (!usuario) throw new Error('Usuario no encontrado');

    const esValida = await usuario.compararPassword(password);
    if (!esValida) throw new Error('Contraseña incorrecta');

    return jwt.sign({ id: usuario._id, email: usuario.email }, tokenJSON, { expiresIn: '2h' });
  } catch (error) {
    throw new Error(error.message || 'Error al iniciar sesión');
  }
};

exports.buscarUsuarioPorEmail = async (email) => {
  return await repositorioUsuarios.buscarUsuarioPorEmail(email); 
};
exports.enviarEmailRecuperacion = async (email) => {
  const usuario = await repositorioUsuarios.buscarUsuarioPorEmail(email);
  if (!usuario) throw new Error('Usuario no encontrado');

  // 1. Generar token
  const token = crypto.randomBytes(20).toString('hex');
  const expiracion = Date.now() + 3600000; // 1 hora

  // 2. Guardar token en la DB
  await repositorioUsuarios.actualizarTokenRecuperacion(email, token, expiracion);

  // 3. Enviar email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pochocleandoapp@gmail.com', //poner un correo que manda el mail?
      pass: 'inzi xbtp ypir gtcg'
    }
  });

  const mailOptions = {
    to: email, //mail del usuario
    from: 'pochocleandoapp@gmail.com', //poner un correo que manda el mail?
    subject: 'Recuperación de contraseña - Pochocleando',
    html: `
      <p>Hola,</p>
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p>Hacé clic en el siguiente enlace para continuar:</p>
      <a href="http://localhost:4200/recuperarpassword?token=${token}">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, ignorá este mensaje.</p>
    `
  };

  await transporter.sendMail(mailOptions);
  return 'Correo enviado correctamente';
};
exports.resetearPasswordConToken = async (token, nuevaPassword) => {
  const usuario = await repositorioUsuarios.buscarUsuarioPorToken(token);
  if (!usuario) {
    throw new Error('Token inválido o expirado');
  }

  const nuevaPasswordHasheada = await bcrypt.hash(nuevaPassword, 10);

  const usuarioActualizado = await repositorioUsuarios.actualizarPassword(token, nuevaPasswordHasheada);
  if (!usuarioActualizado) {
    throw new Error('No se pudo actualizar la contraseña');
  }

  return 'Contraseña actualizada correctamente';
};