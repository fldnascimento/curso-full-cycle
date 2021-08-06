const express = require('express')
const app = express()
const port = 3000
const config = {
    port: 3306,
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const schema = `CREATE TABLE people(id int auto_increment, name varchar(255), primary key(id));`

connection.query(schema)

const sql = `INSERT INTO people(name) values('Felipe Nascimento')`
connection.query(sql)
connection.end()

app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)
    connection.query('SELECT name FROM people', function (error, results, fields) {
        if (error) throw error;

        let names = ''

        results.forEach(function(row) {
            names += row.name + '<br>'
        });

        connection.end()
        
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <br>
            <a href="http://localhost:8080/name">Novo Nome</a>
            <br>
            ${names}
        `)
    });
    
})

app.get('/name/:name?', (req,res) => {
    const name = req.params.name;
    if (name !== undefined) {
        const connection = mysql.createConnection(config)
        const sql = `INSERT INTO people(name) values('${name}')`
        connection.query(sql)
        connection.end()

        res.send(`
            <script>
                location.href = "http://localhost:8080"
            </script>
        `)
    } else {
        res.send(`
            <script>
                let name = prompt("Digite seu nome:", "");
                location.href = "http://localhost:8080/name/" + name
            </script>
        `)
    }
    
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})