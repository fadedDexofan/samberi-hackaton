"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
typeorm_1.createConnection()
    .then(async (connection) => {
    try {
        app_1.default.listen(PORT);
        console.log(`Server started at http://localhost:${PORT}`);
    }
    catch (err) {
        console.error(err);
    }
})
    .catch((err) => console.log("TypeORM connection error: ", err));
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/server.js.map