/*const http=require('http');
const puerto=8080;
const server=http.createServer((req,res)=>{ //crea un servidor
    const tiempo = new Date()
    const hora = tiempo.getHours()
    if(hora >= 6 && hora <= 12) {
        res.end('Buenos dias')
    } else if(hora >= 13 && hora <= 19) {
        res.end('Buenas tardes')
    } else {
        res.end('Buenas noches')
    }
   // res.end('bienvenido a mi servidor');
});
server.listen(puerto,()=>{ //escucha en el puerto 8080
    console.log(`Servidor escuchando  en http://localhost:${puerto}`);
});*/


//SERVIDOR CON EXPRESS
/*
const express = require('express')
const app = express()
const puerto = 8080

app.get('/', (req, res) => {
    res.send('Hola soy home')
})
app.get('/user/:id/:nombre', (req, res) => {
    const { id, nombre } = req.params
    console.log(req.params)
    res.send(`Hola soy user: ${id} ${nombre}`)
})
app.post('/productos', (req, res) => {
    res.send('soy productos post')
})
app.get('/productos', (req, res) => {
    res.send('soy productos get')
})

app.listen(puerto, () => {
    console.log(`El servidor se inicio en el puerto ${puerto}`)
}) */

const express = require('express')
const app = express()
const puerto = 8080
let visitas = 0

//middleware
app.use((req, res, next) => {
    visitas++
    next()//continua con la siguiente funcion
})

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue">Bienvenido al servidor de express</h1>')
})

app.get('/visitas', (req, res) => { //para obtener las visitas
    
    res.send(`El servidor tuvo ${visitas} visitas`)
})
//middleware especial para fyh solo afecta fyh que esta abajo
app.use((req, res, next) => {
    console.log('Yendo a FYH')
    next()
})

app.get('/fyh', (req, res) => { //devuelve fecha y hora
    const date = new Date()

    res.json({fyh: date})
})

app.listen(puerto, (error) => {
    if(!error) {
        console.log(`Servidor escuchando el puerto ${puerto}`)
    } else {
        console.log('Hubo un error al iniciar el servidor:', error)
    }
})