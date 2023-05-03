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
// --------------------------- FACTURA ----------------------------------

async function insertarFacturaEnDB() {
  const [result, fields] = await connection.execute(
    'INSERT INTO factura (productos, precio_total) VALUES (?, ?)',
    [factura.productos, factura.precio_total]
  );
  console.log(result);
  console.log(fields);
}

app.post('/factura', async (req, res) => {
  const factura = req.body;
  try {
    await insertarFacturaEnDB();
    res.status(200).send('Factura guardada con éxito en la base de datos');
  } catch (error) {
    console.error('Error al guardar factura en la base de datos:', error);
    res.status(500).send('Error al guardar factura en la base de datos');
  }
});

// -------------------------------- FIN FACTURA -------------------------------------------


//---------------------- GRAFICO ----------------------------------------------------
app.get('/datos-para-grafico', (req, res) => {
  connection.query('SELECT mes, cantidad_ventas FROM tabla_ventas', (error, results) => {
    if (error) {
      res.status(500).send('Error al obtener los datos');
    } else {
      res.send(results);
    }
  });
});
// -------------------FIN  GRAFICO --------------------------------------------------

app.listen(3000, () => {
  console.log('Server conectado al puerto 3000');
});
