const express = require('express');
const router = express.Router();
const {body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', function (req, res) {
    connection.query("SELECT a.tanggal, b.nama_pelanggan as pelanggan, c.cabang_daerah as cabang_geprek, d.nama_menu as menu, e.bagian_ayam as jenis_ayam, f.nama_varian as varian, g.nama_minuman as minuman  from pemesanan as a JOIN pelanggan as b on b.id_pelanggan=a.id_pelanggan  JOIN cabang_geprek as c on c.id_cabang=a.id_cabang  JOIN menu as d on d.id_paket=a.id_paket JOIN jenis_ayam as e on e.id_jenis_paket = a.id_jenis_paket JOIN varian as f on f.id_varian=a.id_varian  JOIN minuman as g on g.id_minuman=a.id_minuman", function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
                error:err
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data pemesanan',
                data: rows
            })
        }
    });
});

router.post('/store', [
    body('tanggal').notEmpty(),
    body('id_pelanggan').notEmpty(),
    body('id_cabang').notEmpty(),
    body('id_paket').notEmpty(),
    body('id_jenis_paket').notEmpty(),
    body('id_varian').notEmpty(),
    body('id_minuman').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        tanggal: req.body.tanggal,
        id_pelanggan: req.body.id_pelanggan,
        id_cabang: req.body.id_cabang,
        id_paket: req.body.id_paket,
        id_jenis_paket: req.body.id_jenis_paket,
        id_varian: req.body.id_varian,
        id_minuman: req.body.id_minuman
    }
    connection.query('insert into pemesanan set ?', Data, function(err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error:err
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success..!',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`SELECT a.tanggal, b.nama_pelanggan as pelanggan, c.cabang_daerah as cabang_geprek, d.nama_menu as menu, e.bagian_ayam as jenis_ayam, f.nama_varian as varian, g.nama_minuman as minuman  from pemesanan as a JOIN pelanggan as b on b.id_pelanggan=a.id_pelanggan  JOIN cabang_geprek as c on c.id_cabang=a.id_cabang  JOIN menu as d on d.id_paket=a.id_paket JOIN jenis_ayam as e on e.id_jenis_paket = a.id_jenis_paket JOIN varian as f on f.id_varian=a.id_varian  JOIN minuman as g on g.id_minuman=a.id_minuman WHERE id_pemesanan=${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }
        if(rows.lenght <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data pemesanan',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id', [
    body('tanggal').notEmpty(),
    body('id_pelanggan').notEmpty(),
    body('id_cabang').notEmpty(),
    body('id_paket').notEmpty(),
    body('id_jenis_paket').notEmpty(),
    body('id_varian').notEmpty(),
    body('id_minuman').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        tanggal: req.body.tanggal,
        id_pelanggan: req.body.id_pelanggan,
        id_cabang: req.body.id_cabang,
        id_paket: req.body.id_paket,
        id_jenis_paket: req.body.id_jenis_paket,
        id_varian: req.body.id_varian,
        id_minuman: req.body.id_minuman
    }
    connection.query(`update pemesanan set ? where id_pemesanan = ${id}`, Data, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error:err
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Success..!',
            })
        }
    })
})  

router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from pemesanan where id_pemesanan = ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error:err
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has been delete !',
            })
        }
    })
})

module.exports = router; // Corrected export statement