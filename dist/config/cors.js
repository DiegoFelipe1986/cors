"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
class Cors {
    constructor() {
        this.corsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        };
    }
    config(app) {
        app.use(cors(this.corsOptions));
    }
}
exports.Cors = Cors;
//# sourceMappingURL=cors.js.map