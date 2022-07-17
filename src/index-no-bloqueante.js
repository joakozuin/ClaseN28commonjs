/* import express from 'express';
import { fork } from 'child_process';
import {join} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename,'../utils'); */

const express = require('express')
const  { fork } = require('child_process')
const path =require( 'path')

console.log('-----------------------------------------')
const scriptPath = path.resolve(__dirname, './utils/calculo.js');
console.log(scriptPath);
console.log('-----------------------------------------')

const app = express();
let visitas = 0;

app.get('/', (req, res) => {
  visitas += 1;
  res.json({
    mensage: 'Servidor No Bloqueante',
    visitas,
  });
});


app.get('/calculo', (req, res) => {

  const computo = fork(scriptPath);

  computo.on('message', (sum) => {
    res.json({
      resultado: sum,
    });
  });

  computo.send('comenzar')
  
});

const puerto = 8081;

const server = app.listen(puerto, () => {
  console.log(`Servidor No Bloqueante escuchando en el puerto ${puerto}`);
});

server.on('error', (error) => console.log(`Error en servidor: ${error}`));
