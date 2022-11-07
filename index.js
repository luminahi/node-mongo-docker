"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
const app = express();
function connect() {
    mongoose.connect('mongodb://mongo:27017/test');
    const kittySchema = new mongoose.Schema({ name: String });
    return mongoose.model('Kitten', kittySchema);
}
const Kitten = connect();
function add(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const newKitten = new Kitten({ name });
        yield newKitten.save();
    });
}
function show() {
    return __awaiter(this, void 0, void 0, function* () {
        const kitten = yield Kitten.find();
        return kitten;
    });
}
// routes
app.get('/', (req, res) => {
    res.send('veja no console');
});
app.get('/add/:name', (req, res) => {
    const { name } = req.params;
    add(name);
    res.send(`nome adicionado: ${name}`);
});
app.get('/show', (req, res) => {
    const lista = [];
    show().then(result => {
        result.map((x) => {
            lista.push(x.name);
        });
        res.send(lista);
    });
});
// server boot
app.listen(3000, () => {
    console.log('server running at port 3000');
});
