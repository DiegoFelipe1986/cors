"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
const cors_1 = require("./config/cors");
const cors = require("cors");
class App {
    constructor() {
        this.route = new routes_1.Routes();
        this.cors = new cors_1.Cors();
        this.app = express();
        this.app.use(cors());
        // this.cors.config(this.app);
        this.config();
        this.route.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map