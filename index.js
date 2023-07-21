require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = require("./src/server");

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const databaseUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

mongoose
    .connect(databaseUrl)
    .then(() => {
        console.log("Conexión a la base de datos exitosa");
        app.listen(8080, () => {
            console.log("La api está prendida!");
        });
        // Levantar servidor
    })
    .catch((err) => {
        console.log("No se pudo conectar a la base de datos");
    });
    