// controllers/authController.js
import axios, { Axios } from "axios";

export const formularioLogin = (req, res) => {
  res.render("auth/login", {
    title: "Iniciar sesión",
    error: null,
    active: ""
  });
};

export const autenticarUsuario = async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario||!password){
    return res.render("auth/login",{
      title: 'Iniciar sesion',
      error: 'Por favor rellene todos los campos',
      active: ""
    })
  }
try {
  const response = await axios.post('http://localhost:1234/users/login/', {
    username: usuario,
    password: password
  });
  const tk= response.data.token;
  console.log('Acceso autorizado', response.data);
  return res.redirect('/dashboard');
} catch (error) {
  console.log("Error en login:", error.response?.data || error.message);
    
    // Devolvemos al usuario al login con el mensaje de error
    return res.render("auth/login", {
      title: "Iniciar sesión",
      error: "Usuario o contraseña incorrectos", 
      active: ""
    });
  
}
};
