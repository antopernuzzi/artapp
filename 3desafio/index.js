/*servidor basado en node.js que utiliza el módulo express*/
const express = require('express')
const app = express()
const puerto = 8080

const fs = require('fs')
let fecha = new Date()

class Contenedor {
    constructor(archivo) {
      this.archivo = archivo;
    }

   
    async getAll() {  //devuelve todos los productos
        try {

            let productos = await fs.promises.readFile(`3desafio/${this.archivo}`, 'utf-8')
            productos = JSON.parse(productos);
            return productos;
          
        } catch (error) {
          console.log(` Ha ocurrido el siguiente error en getAll ${error}`);
        }
      }


}
app.get('/', (req, res) => {
    res.send('<h1 style="color: blue">Bienvenido al servidor de express - Desafio 3 anto</h1>')
})



app.get('/productos', async (req, res) => {
    
    let productos = await new Contenedor('productos.txt').getAll()
    
    res.send( `<h1>PRODUCTOS</h1> <ul  style="list-style: none" > ${productos.map(prod => {
        let card = `<li><img src='${prod.thumbnail}' style="width: 100px" /> <br> Titulo:${prod.title} <br> Precio:$ ${prod.price}</li>`
        return card
    })}</ul>` )
} )


app.get('/productoRandom', async (req, res) => {
    
    let productos = await new Contenedor('productos.txt').getAll()

    let random =Math.floor( Math.random() * productos.length);
    
    res.send(

        `<img src='${productos[random].thumbnail}' style="width: 100px" /><br>Titulo:${productos[random].title} <br> Precio:$ ${productos[random].price}`

    )
} )




app.listen(puerto, (error) => { //servidor escuchando el puerto
    if(!error) {
        console.log(`Servidor escuchando el puerto ${puerto}`)
    } else {
        console.log('Hubo un error al iniciar el servidor:', error)
    }
})







