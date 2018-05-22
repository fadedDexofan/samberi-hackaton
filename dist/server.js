"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || 3000;
typeorm_1.createConnection()
    .then((connection) => __awaiter(this, void 0, void 0, function* () {
    try {
        app_1.default.listen(PORT);
        logger_1.default.info(`Server started at http://localhost:${PORT}`);
    }
    catch (err) {
        logger_1.default.error(err);
    }
}))
    .catch((err) => logger_1.default.error("TypeORM connection error: ", err));
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/server.js.map