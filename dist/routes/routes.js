"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const peyaController_1 = require("../controllers/peyaController");
class Routes {
    constructor() {
        this.peyaController = new peyaController_1.PeyaController();
    }
    routes(app) {
        app.route('/login')
            .post((req, res) => this.peyaController.getLoginToken(req, res));
        app.route('/aboutme')
            .get((req, res) => this.peyaController.getAboutMe(req, res));
        app.route('/searchestablishments')
            .get((req, res) => this.peyaController.getEstablishments(req, res));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map