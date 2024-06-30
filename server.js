const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const usuarios = [
    {id: 1, nombre: "Danny", apellido: "Guamán", ciudadNacimiento: "Ciudad"},
    {id: 2, nombre: "Pepito", apellido: "Perez", ciudadNacimiento: "Quito"},

];
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/usuarios/', (_, res) => {
    res.send(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(usuario => usuario.id == req.params.id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
} );

app.put('/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(usuarios => usuarios.id == req.params.id);
  if (index != -1){
    usuarios[index] = req.body;
    res.json(usuarios[index])
  }else{
    res.status(404).json({ error: "Usuario no encontrado" });
  }
  ;
});

app.post('/usuarios/', (req, res) => {
    usuarios.push(req.body);
    res.send('Usuario creado');
});

app.delete('/usuarios/:id', (req, res) =>{
    const index = usuarios.findIndex(usuario => usuario.id == req.params.id);
    if (index !== -1) {
      const usuarioBorrado = usuarios[index];
      usuarios.splice(index, 1);
      res.json(usuarioBorrado);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
})

app.listen(port, () => {
  console.log('Servidor web escuchando en el puerto', port);
});