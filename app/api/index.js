const express = require('express')
const mysql2 = require('mysql2');
var bodyParser = require('body-parser')
//const PORT = 9000;
const PORT = 3000;  //inside docker
const HOST = '0.0.0.0' //Uma forma do docker entender que ele só precisa repassar a porta 3000

const connection = mysql2.createConnection({
    host: 'database-mysql', 
    //host: 'localhost',
    user: 'root',
    password: '123',
    database: 'fiap',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to database');
  });

const app = express()

// create application/json parser
var jsonParser = bodyParser.json()
 
app.get('/', (req, res) => {
    const query = 'SELECT * FROM products';

    connection.query(query, (err, results, fields) => {
      if (err) {
        console.error('Error executing SELECT query:', err);
        return;
      }
    
      res.send(results.map(item => ({ name: item.name, price: item.price })));
    });
})

app.post('/', jsonParser, (req, res) =>{
  console.log('aqui');
  const dataToInsert = req.body;
  const query = 'INSERT INTO products SET ?';

  connection.query(query, dataToInsert, (err, results) => {
    if (err) {
      console.error('Error inserting data: ' + err);
      res.status(500).json({ error: 'Failed to insert data.' });
    } else {
      console.log('Data inserted successfully.');
      res.json({ message: 'Data inserted successfully.' });
    }
  });
})

app.listen(PORT, HOST)