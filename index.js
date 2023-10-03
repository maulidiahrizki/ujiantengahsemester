const express = require('express');
const app = express();
const port = 2023;

//membuat route baru dengan method GET yang isinya kalimat halo dek
// app.get('/', (req,res) => {
//   res.send('Halo lovedek')
// })

//import route posts

const bodyPs = require('body-parser'); //import body parsernya
app.use(bodyPs.urlencoded({extended: false}));
app.use(bodyPs.json());

const varianRouter = require('./routes/varian');
const pelangganRouter = require('./routes/pelanggan');
const minumanRouter = require('./routes/minuman');
const jenisRouter = require('./routes/jenis');
const cabangRouter = require('./routes/cabang');
const menuRouter = require('./routes/menu');
const pemesananRouter = require('./routes/pemesanan');
app.use('/api/varian', varianRouter);
app.use('/api/pelanggan', pelangganRouter);
app.use('/api/minuman', minumanRouter);
app.use('/api/jenis', jenisRouter);
app.use('/api/cabang', cabangRouter);
app.use('/api/menu', menuRouter);
app.use('/api/pemesanan', pemesananRouter);

//KITA LISTEN eXPRESS.JS KEDALAM PORT YANG KITA BUAT DIATAS
app.listen(port,() =>{
    //dan kita tampilkan log sebagai penanda bahwa express.js berhasil
    console.log(`aplikasi berjalan di http:://localhost:${port}`);
})