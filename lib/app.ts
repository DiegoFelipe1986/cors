import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import { Cors } from "./config/cors";
import * as cors from "cors"; 

class App {
    public app: express.Application;
    public route: Routes = new Routes();
    public cors: Cors = new Cors();

    constructor() {
        this.app = express();

        this.app.use(cors());
        // this.cors.config(this.app);
        
        this.config();
        this.route.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;
