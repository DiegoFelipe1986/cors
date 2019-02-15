import { Request, Response } from 'express';
import { PeyaController } from '../controllers/peyaController';

export class Routes {
    public peyaController = new PeyaController();

    public routes(app): void {
        app.route('/login')
            .post((req, res) => this.peyaController.getLoginToken(req, res));

        app.route('/aboutme')
            .get((req, res) => this.peyaController.getAboutMe(req, res));

        app.route('/searchestablishments')
            .get((req, res) => this.peyaController.getEstablishments(req, res));
    }
}
