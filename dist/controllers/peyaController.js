"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enviroment_1 = require("../config/enviroment");
const sync_request_1 = require("sync-request");
class PeyaController {
    httpGet(url, params = {}, options = {}) {
        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        if (query) {
            url = `${url}?${query}`;
        }
        let response = sync_request_1.default('GET', url, options);
        return {
            'data': JSON.parse(response.body.toString()),
            'status': response.statusCode
        };
    }
    getInitialToken() {
        const uri = 'tokens';
        const url = enviroment_1.PEYA_BASE_URL + uri;
        let params = {
            clientId: enviroment_1.CLIENT_ID_PEYA,
            clientSecret: enviroment_1.CLIENT_SECRET_PEYA
        };
        return this.httpGet(url, params);
    }
    getLoginToken(req, res) {
        let initialToken = this.getInitialToken();
        if (initialToken.status != 200) {
            res.status(initialToken.status).json({ error: 'error al autenticar con la aplicación' });
            return;
        }
        const token = initialToken.data.access_token;
        let userName = req.body.userName;
        let password = req.body.password;
        const uri = 'tokens';
        const url = enviroment_1.PEYA_BASE_URL + uri;
        let params = {
            userName,
            password
        };
        let options = {
            headers: { authorization: token }
        };
        let response = this.httpGet(url, params, options);
        if (response.status != 200) {
            res.status(response.status).json({ error: 'error' });
            return;
        }
        res.status(response.status).json(response.data);
    }
    getAboutMe(req, res) {
        let userToken = req.headers.authorization || '98-151526-5c3063be-2892-400a-542b-6d92ec40b90e';
        const uri = 'myAccount';
        const url = enviroment_1.PEYA_BASE_URL + uri;
        let options = {
            headers: { Authorization: userToken }
        };
        let response = this.httpGet(url, {}, options);
        return res.status(response.status).json(response.data);
    }
    getEstablishments(req, res) {
        let userToken = req.headers.authorization;
        let country = req.query.country || 1;
        let point = req.query.point || '-34.905490,-56.181319';
        let max = 20;
        const uri = 'search/restaurants';
        const url = enviroment_1.PEYA_BASE_URL + uri;
        let params = {
            country,
            point,
            max,
        };
        let options = {
            headers: { authorization: userToken }
        };
        let response = this.httpGet(url, params, options);
        res.status(response.status).json(response.data);
    }
}
exports.PeyaController = PeyaController;
//# sourceMappingURL=peyaController.js.map