"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const enviroment_1 = require("./config/enviroment");
app_1.default.listen(enviroment_1.SERVER_PORT, () => {
    console.log('Express server listening on port ' + enviroment_1.SERVER_PORT);
});
//# sourceMappingURL=server.js.map