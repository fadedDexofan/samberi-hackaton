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
const Buy_1 = require("../db/entity/Buy");
const getConsumerByUUID_1 = __importDefault(require("../helpers/getConsumerByUUID"));
exports.getAllBuys = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const buys = yield buyRepository.find({
        relations: ["goods", "consumer", "consumer.sharedBuys"],
    });
    ctx.body = buys;
});
exports.shareBuy = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { uuid, consumerId } = ctx.request.body;
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const buy = yield buyRepository.findOneOrFail({
        where: { uuid },
        relations: ["consumer", "consumer.sharedBuys", "sharedConsumer"],
    });
    buy.sharedConsumer = consumerId;
    yield buyRepository.save(buy);
    ctx.body = yield getConsumerByUUID_1.default(ctx, uuid);
});
exports.unshareBuy = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { uuid } = ctx.request.body;
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const buy = yield buyRepository.findOneOrFail({
        where: { uuid },
        relations: ["consumer", "consumer.sharedBuys", "sharedConsumer"],
    });
    buy.sharedConsumer = null;
    yield buyRepository.save(buy);
    ctx.body = yield getConsumerByUUID_1.default(ctx, uuid);
});
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/BuyController.js.map