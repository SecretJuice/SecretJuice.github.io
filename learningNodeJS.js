var http = require('http');
var fileSystem = require('fs');
const express = require('express');

var serverPort = 8080;

const app = express();

app.use(express.static("public"));

app.listen(process.env.PORT || serverPort, () => console.log(`App available on http://localhost:` + serverPort))