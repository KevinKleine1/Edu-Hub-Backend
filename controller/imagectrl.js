var express = require('express');
var router = express.Router();
var multer = require('multer');


    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

var upload = multer({ storage: storage }).single('profilpic');

router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
         // An error occurred when uploading
         }
         res.json({
             success: true,
             message: 'image uploaded!'
         })

    // Everything went fine
    })
})

module.exports =  router;