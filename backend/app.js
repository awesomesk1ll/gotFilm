const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const router = require('./routes');


const app = express();
app.use(express.json({extended: true}));
app.use(router);

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false 
        })
        app.listen(PORT, () => console.log(`Server has benn started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}

start();
