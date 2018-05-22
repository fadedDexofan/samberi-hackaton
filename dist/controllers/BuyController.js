"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Buy_1 = require("../db/entity/Buy");
const getConsumerByUUID_1 = __importDefault(require("../helpers/getConsumerByUUID"));
exports.getAllBuys = async (ctx) => {
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const buys = await buyRepository.find({
        relations: ["goods", "consumer", "consumer.sharedBuys"],
    });
    ctx.body = buys;
};
exports.shareBuy = async (ctx) => {
    const { uuid, consumerId } = ctx.request.body;
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const buy = await buyRepository.findOneOrFail({
        where: { uuid },
        relations: ["consumer", "consumer.sharedBuys", "sharedConsumer"],
    });
    buy.sharedConsumer = consumerId;
    await buyRepository.save(buy);
    ctx.body = await getConsumerByUUID_1.default(ctx, uuid);
};
exports.unshareBuy = async (ctx) => {
    const { uuid } = ctx.request.body;
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const buy = await buyRepository.findOneOrFail({
        where: { uuid },
        relations: ["consumer", "consumer.sharedBuys", "sharedConsumer"],
    });
    buy.sharedConsumer = null;
    await buyRepository.save(buy);
    ctx.body = await getConsumerByUUID_1.default(ctx, uuid);
};
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/BuyController.js.map