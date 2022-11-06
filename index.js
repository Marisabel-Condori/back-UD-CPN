const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = 8000;

app.use(cors())   // acceso a TODO desde el frontend, API permite cualquier origen

//obtener los HTTP METHOS
const server = require('http').createServer(app);
app.use(morgan('dev'));

//decodificamos la respuesta en json
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//coneccin a la base de datos 
const mysql = require('mysql');
var conexion = mysql.createConnection({
    host:'localhost',  
    database: 'bd_proy',
    user:'root',
    password:''
});


//verificar que se conecte correctamente
conexion.connect(function(err){
    if(err){
        console.log('Error en la conexion: '+err.stack);
        return;
    }
    console.log('Conectado con el identificador: '+conexion.threadId);
});

////////////////////////////////////////////////
////////////////////////////////////////////////

// HTTP METHODS
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// SELECT * FROM persona
app.get('/persona',(req, res) => {
    conexion.query(`SELECT * FROM persona`, function (err , result, fields){
        if(err)throw err;
        res.json(result);
    });
    // res.sendFile(path.join(__dirname, 'index.html'));
});


// SELECT * FROM personabyEmail
app.get('/personabyemail',(req, res) => {
    var correo = req.query.correo 
    console.log(req.query.correo);

    conexion.query(`SELECT * FROM persona where correo = "${correo}"`, function (err , result, fields){
        if(err)throw err;
        res.json(result);
    });
    // res.sendFile(path.join(__dirname, 'index.html'));
});

// SELECT * FROM instructor
app.get('/instructor',(req, res) => {
    conexion.query(`SELECT * FROM instructor`, function (err , result, fields){
        if(err)throw err;
        res.json(result);
    });
    // res.sendFile(path.join(__dirname, 'index.html'));
});
 
// SELECT * FROM estudiante
app.get('/estudiante',(req, res) => {
    conexion.query(`SELECT * FROM estudiante`, function (err , result, fields){
        if(err)throw err;  
        res.json(result);
    });
    // res.sendFile(path.join(__dirname, 'index.html'));
});

// SELECT * FROM curso
app.get('/curso',(req, res) => {
    conexion.query(`SELECT * FROM curso`, function (err , result, fields){
        if(err)throw err;  
        res.json(result);
    });
    // res.sendFile(path.join(__dirname, 'index.html'));
});

// SELECT * FROM seccion
app.get('/seccion',(req, res) => {
    conexion.query(`SELECT * FROM seccion`, function (err , result, fields){
        if(err)throw err;  
        res.json(result);
    });
    // res.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('/cursobyid',(req, res) => {
//     var id = req.query.idcurso 
//     console.log(req.query.idcurso);

//     conexion.query(`SELECT * FROM curso where id = "${id}"`, function (err , result, fields){
//         if(err)throw err;
//         res.json(result);
//     });
//     // res.sendFile(path.join(__dirname, 'index.html'));
// });
 
// SELECT * FROM video
app.get('/video',(req, res) => {
    conexion.query(`SELECT * FROM video`, function (err , result, fields){
        if(err)throw err;
        res.json(result);
    });
    // res.sendFile(path.join(__dirname, 'index.html'));
});


// SELECT * FROM producto
app.get('/producto/:id',(req, res) => {
    var id = req.params.id;
    conexion.query(`SELECT * FROM producto where id = ${id}`, function (err , result, fields){
        if(err)throw err;
        res.json(result);
    });
    // res.sendFile(path.join(__dirname, 'index.html'));
});

//requiere postman
// SELECT * FROM producto
app.get('/venta',(req, res) => {
    // console.log(req.query);
    var nit = req.query.nit;
    conexion.query(`SELECT * FROM venta where nit = ${nit}`, function (err , result, fields){
        if(err)throw err;
        res.json(result);
    });
//     // res.sendFile(path.join(__dirname, 'index.html'));
});



// post
//************** INSERT INTO PERSONA ****************************************
app.post('/persona',(req,res)=>{
    console.log("################################## MI PRUEBA ####");
    console.log(req.query);
    console.log("################################## MI PRUEBA ####");
    // var idpersona = req.body.idpersona;
    var nombre = req.query.nombre;
    var apellidos = req.query.ap_paterno;
    // var ap_materno = req.body.ap_materno;
    var correo = req.query.correo;
    var password = req.query.password;
    var depto = req.query.departamento;  

    var consulta = "INSERT INTO persona (nombre, ap_paterno, correo, password, departamento )";
    var consulta = consulta + `VALUES ('${nombre}', '${apellidos}', '${correo}', '${password}', '${depto}')`;

    conexion.query( consulta , function(error, resultado, field){
        if(error) throw error;  
        res.status(200).json(resultado); 
    });
})

//************** INSERT INTO CURSO ****************************************
app.post('/curso',(req,res)=>{
    console.log("################################## CURSO PRUEBA ####")
    console.log(req.query);
    console.log("################################## CURSO PRUEBA ####");

    var titulo_curso = req.query.titulo_curso;
    var descripcion_curso = req.query.descripcion_curso;
    var requisitos = req.query.requisitos; 

    var consulta = "INSERT INTO curso (titulo_curso, descripcion_curso, requisitos )";
    var consulta = consulta + `VALUES ('${titulo_curso}', '${descripcion_curso}', '${requisitos}')`;

    conexion.query( consulta , function(error, resultado, field){
        if(error) throw error;
        res.status(200).json(resultado);
    });
})

//************** INSERT INTO SECCION ****************************************
app.post('/seccion',(req,res)=>{
    console.log("################################## CURSO PRUEBA ####")
    console.log(req.query);
    console.log("################################## CURSO PRUEBA ####");

    var nombre_seccion = req.query.nombre_seccion;
    var idcurso = req.query.idcurso; 
    
    var consulta = "INSERT INTO seccion (idcurso, nombre_seccion )";
    var consulta = consulta + `VALUES ('${idcurso}', '${nombre_seccion}')`;

    conexion.query( consulta , function(error, resultado, field){
        if(error) throw error;
        res.status(200).json(resultado);
    });
})


//delete
app.delete('/producto/:id',(req,res)=>{
        
    var id = req.params.id;

    var consulta = `DELETE FROM PRODUCTO WHERE id = '${id}'`
    
    conexion.query( consulta , function(error, resultado, field){
        if(error) throw error;
        res.status(200).json(resultado);
        
    });

})


//update
//************** ALTER CURSO ****************************************
app.put('/producto/:id',(req,res)=>{
    console.log(req.body);
    var id = req.params.id;
    var titulo_curso = req.body.titulo_curso;
    var descripcion_curso = req.body.descripcion_curso;
    var requisitos = req.body.requisitos;
    
    var consulta = `update producto set titulo_curso = '${titulo_curso}', descripcion_curso = '${descripcion_curso}', requisitos = '${requisitos}' where id = '${id}' `

    conexion.query( consulta , function(error, resultado, field){
        if(error) throw error;
        res.status(200).json(resultado);
        
    });

})

app.put('/producto/:id',(req,res)=>{
    // console.log(req.params);
    console.log(req.body);
    var id = req.params.id;
    var nombre = req.body.nombre;
    var stock = req.body.stock;
    var precio = req.body.precio;
    
    var consulta = `update producto set nombre = '${nombre}', stock = '${stock}', precio = '${precio}' where id = '${id}' `

    conexion.query( consulta , function(error, resultado, field){
        if(error) throw error;
        res.status(200).json(resultado);
        
    });

})




server.listen(port,() => {
    console.log('Servidor escuchando en el puerto: ', port);
});   