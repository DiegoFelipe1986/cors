import { Request, Response } from 'express';
import { PEYA_BASE_URL, CLIENT_ID_PEYA, CLIENT_SECRET_PEYA } from '../config/enviroment';
import request from 'sync-request';

export class PeyaController {

    private httpGet(url, params = {}, options = {}) {
        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        if (query) {
            url = `${url}?${query}`;
        }

        let response = request(
            'GET',
            url,
            options
        );

        return {
            'data': JSON.parse(response.body.toString()),
            'status': response.statusCode
        };
    }

    private getInitialToken() {
        const uri = 'tokens';
        const url = PEYA_BASE_URL + uri;

        let params = {
            clientId: CLIENT_ID_PEYA,
            clientSecret: CLIENT_SECRET_PEYA
        };

        return this.httpGet(url, params);
    }

    public getLoginToken(req: Request, res: Response) {
        let initialToken = this.getInitialToken();
        if (initialToken.status != 200) {
            res.status(initialToken.status).json({error: 'error al autenticar con la aplicación'});
            return;
        }
        const token = initialToken.data.access_token;

        let userName = req.body.userName;
        let password = req.body.password;

        const uri = 'tokens';
        const url = PEYA_BASE_URL + uri;
        let params = {
            userName,
            password
        };
        let options = {
            headers: { authorization: token }
        };
        let response = this.httpGet(url, params, options);
        if (response.status != 200) {
            res.status(response.status).json({error: 'error'});
            return;
        }

        res.status(response.status).json(response.data);
    }

    public getAboutMe(req: Request, res: Response) {
        let userToken = req.headers.authorization || '98-151526-5c3063be-2892-400a-542b-6d92ec40b90e';

        const uri = 'myAccount';
        const url = PEYA_BASE_URL + uri;

        let options = {
            headers: { Authorization: userToken }
        };

        let response = this.httpGet(url, {}, options);
        return res.status(response.status).json(response.data);
    }

    public getEstablishments(req: Request, res: Response) {
        let userToken = req.headers.authorization;
        let country = req.query.country || 1;
        let point = req.query.point || '-34.905490,-56.181319';
        let max = 20;
        const uri = 'search/restaurants';
        const url = PEYA_BASE_URL + uri;

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
