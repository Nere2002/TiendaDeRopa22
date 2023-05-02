const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require("cors");

const app = express();
// Configurar CORS
app.use(cors());
// Configura el middleware body-parser para parsear los datos del cuerpo de la petición como JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Admin123',
  database: 'tienda'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL database!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM usuarios WHERE username = ?', [username], (error, results, fields) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (result) {
          res.send({ message: 'Login iniciado!' });
        } else {
          res.status(401).send({ message: 'contraseña incorrecta' });
        }
      });
    } else {
      res.status(401).send({ message: 'Usuario no encontrado' });
    }
  });



});


// Configura la ruta para manejar la petición POST de guardar la factura
app.post('/factura', (req, res) => {
  // Obtén los datos de la factura del cuerpo de la petición
  const factura = req.body;

  // Guarda la factura en la base de datos (aquí asumimos que ya tienes una conexión a la base de datos)
  connection.query('INSERT INTO factura (id, productos, precio_total, fecha) VALUES (?, ?, ?, ?)', [factura.productos, factura.precioTotal], (err, result) => {
    if (err) {
      console.error('Error al guardar factura en la base de datos:', err);
      res.status(500).send('Error al guardar factura en la base de datos');
    } else {
      console.log('Factura guardada con éxito en la base de datos:', result);
      res.status(200).send('Factura guardada con éxito en la base de datos');
    }
  });
});

app.get('/grafico', (req, res) => {
  const query = 'SELECT id_producto, num_comparaciones FROM comparaciones';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los datos de la tabla "comparaciones":', err);
      res.status(500).send('Error al obtener los datos de la tabla "comparaciones"');
      return;
    }

    // Procesar los resultados y enviarlos a la plantilla para renderizar el gráfico
    const data = processData(results);
    res.render('grafico', { data });
    // Enviar los datos como un objeto JSON en la respuesta
    res.json({ results });

  });
});


app.listen(3000, () => {
  console.log('Server conectado al puerto 3000');
});
