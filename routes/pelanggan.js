const express = require('express');
const router = express.Router();
//import express validator
const {body, validationResult} = require('express-validator');
//import database
const connection = require('../config/db');
const { json } = require('body-parser');

router.get('/', function(req, res){
    connection.query('select * from pelanggan order by id_pelanggan desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data pelanggan',
                data: rows
            })
        }
    })
})

router.post('/store',[
    //validation
    body('id_pelanggan').notEmpty(),
    body('nama_pelanggan').notEmpty(),
    body('alamat_pelanggan').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
let Data = {
    id_pelanggan: req.body.id_pelanggan,
    nama_pelanggan: req.body.nama_pelanggan,
    alamat_pelanggan: req.body.alamat_pelanggan
}
connection.query('insert into pelanggan set ?', Data, function(err, rows){
    if(err){
        return res.status(500).json({
            status: false,
            message: 'Server Error',
        })
    }else{
        return res.status(201).json({
            status:true,
            message: 'Succes..!',
            data: rows[0]
        })
    }
})
})

router.get('/:id', function (req, res) {
    let id = req.params.id;
    connection.query(`select * from pelanggan where id_pelanggan = ${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            });
        }
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data pelanggan',
                data: rows[0]
            });
        }
    });
});

router.patch('/update/:id', [
    body('id_pelanggan').notEmpty(),
    body('nama_pelanggan').notEmpty(),
    body('alamat_pelanggan').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan
    };
    connection.query(`UPDATE pelanggan SET ? WHERE id_pelanggan = ${id}`, Data, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update succes..!'
            });
        }
    });
});

router.delete('/delete/:id', function(req, res){
    let id = req.params.id;
    if (!id) {
        return res.status(400).json({
            status: false,
            message: 'Bad Request: ID parameter is missing',
        });
    }else{
        connection.query('DELETE FROM pelanggan WHERE id_pelanggan = ?', [id], function(err, result) {
        if (err) {
               return res.status(500).json({
                   status: false,
                   message: 'Server Error',
               });
           } else if (result.affectedRows === 0) {
               return res.status(404).json({
                   status: false,
                   message: 'Data not found',
               });
           } else {
               return res.status(200).json({
                   status: true,
                   message: 'Data has been deleted!',
               });
           }
         })
        }
        });


module.exports = router;