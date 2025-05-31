const usuarioService = require('../service/servicioUsuario');


function validarRegistro(body) {
  const { email, password, username } = body;
  return email && password && username;
}

exports.registrarUsuario = async (req, res) => {
    //console.log('Controller: registrarUsuario', req.body) para controlar erroes
  if (!validarRegistro(req.body)) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  try {
    await usuarioService.registrarUsuario(req.body);
    res.status(201).json({ mensaje: 'Usuario creado con éxito' });
  } catch (error) {
    //console.log('Controller registrarUsuario error', error) para controlar errores
    res.status(400).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
};

exports.loginUsuario = async (req, res) => {
    //console.log('Controller: loginUsuario', req.body) para controlar errores
    try {
    const token = await usuarioService.loginUsuario(req.body);
    res.status(200).json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    //console.log('Controller loginUsuario error', error) para controlar errores
    res.status(401).json({ error: error.message });
  }
};