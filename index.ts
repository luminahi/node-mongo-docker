const express = require('express');
const mongoose = require('mongoose');
import { Request, Response } from 'express';

const app = express();

function connect() {
    mongoose.connect('mongodb://mongo:27017/test');
    const kittySchema = new mongoose.Schema({ name: String });
    return mongoose.model('Kitten', kittySchema);
}

const Kitten = connect();

async function add(name: string) {
    const newKitten = new Kitten({ name });
    await newKitten.save();
}

async function show() {
    const kitten = await Kitten.find();
    return kitten;
}

// routes

app.get('/', (req: Request, res: Response) => {
    res.send('veja no console');    
})

app.get('/add/:name', (req: Request, res: Response) => {
    const { name }  = req.params;
    add(name);
    res.send(`nome adicionado: ${name}`);
});

app.get('/show', (req: Request, res: Response) => {
    const lista: Array<string> = [];
    show().then(result => {
        result.map((x: any) => {
            lista.push(x.name);
        });
        res.send(lista);
    });
});

// server boot

app.listen(3000, () => {
    console.log('server running at port 3000');
})
