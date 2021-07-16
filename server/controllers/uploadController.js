const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();



exports.uploadFile = (req, res) => {
    let type = req.params.type;

    if(!req.files) {
        return res.status(400).json({
            ok: false,
            message: "There's no file selected"
        });
    }

    // Check type
    let tiposValidos = ['users', 'ingredients', 'meals']
    if(tiposValidos.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            message: "Invalid type"
        });
    }

    // Check extension
    let file = req.files.file;
    let nombreCortado = file.name.split(".");
    let extension = nombreCortado[nombreCortado.length - 1];

    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if( extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            message: "Invalid extension"
        });
    }

    // Change name
    let nameFile = `${ new Date().getMilliseconds() }-${ file.name }`;
    file.mv(`../client/public/uploads/${type}/${nameFile}`, err => {
        if(err) {
            return res.status(500).json({
                ok: false,
                message: err
            })
        }
    });

    res.json({
        ok: true,
        data: {
            url: `uploads/${type}/${nameFile}`
        }
    });

}