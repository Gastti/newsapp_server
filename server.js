const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.paths = {
            news: '/news'
        }

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.news, require('./routes/news'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}

module.exports = Server;