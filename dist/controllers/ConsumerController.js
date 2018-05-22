"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Buy_1 = require("../db/entity/Buy");
const Consumer_1 = require("../db/entity/Consumer");
const Goods_1 = require("../db/entity/Goods");
const getConsumerById_1 = __importDefault(require("../helpers/getConsumerById"));
const getConsumerByUUID_1 = __importDefault(require("../helpers/getConsumerByUUID"));
exports.newConsumer = async (ctx) => {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = consumerRepository.create(ctx.request.body);
    await consumerRepository.save(consumer);
    ctx.status = 201;
    ctx.body = consumer;
};
exports.getAllConsumers = async (ctx) => {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumers = await consumerRepository.find({
        relations: ["currentShop"],
    });
    ctx.body = consumers;
};
exports.getConsumer = async (ctx) => {
    const { consumerId } = ctx.params;
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = await getConsumerById_1.default(consumerId);
    ctx.body = consumer;
};
exports.getConsumerBuys = async (ctx) => {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = await consumerRepository.findOneOrFail(ctx.params.id, {
        relations: [
            "buys",
            "buys.goods",
            "buys.consumer",
            "buys.sharedConsumer",
            "sharedBuys",
            "sharedBuys.goods",
            "sharedBuys.consumer",
        ],
    });
    ctx.body = consumer;
};
exports.updateConsumerBuy = async (ctx) => {
    const { uuid, goods } = ctx.request.body;
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const goodsRepository = typeorm_1.getRepository(Goods_1.Goods);
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = await consumerRepository.findOneOrFail(ctx.params.id, {
        relations: ["buys"],
    });
    const buy = await buyRepository.findOne({
        where: { uuid },
        relations: ["goods"],
    });
    if (!buy) {
        const newBuy = buyRepository.create({ uuid, goods: [goods] });
        await buyRepository.save(newBuy);
        consumer.buys.push(newBuy);
        await consumerRepository.save(consumer);
        ctx.status = 201;
        ctx.body = await getConsumerByUUID_1.default(ctx, uuid);
        return;
    }
    if (goods) {
        buy.goods.push(goods);
        await buyRepository.save(buy);
    }
    ctx.body = await getConsumerByUUID_1.default(ctx, uuid);
};
exports.delFromConsumerBuy = async (ctx) => {
    const { uuid, goods } = ctx.request.body;
    const goodsId = goods.id;
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const buy = await buyRepository.findOneOrFail({
        where: { uuid },
        relations: ["goods"],
    });
    buy.goods = buy.goods.filter((val) => {
        return val.id !== goodsId;
    });
    await buyRepository.save(buy);
    ctx.body = buy;
};
exports.setCurrentShop = async (ctx) => {
    const { id: consumerId } = ctx.params;
    const { shopId } = ctx.request.body;
    let consumer = await getConsumerById_1.default(consumerId);
    if (!consumer) {
        return;
    }
    consumer.currentShop = shopId;
    await consumer.save();
    consumer = await getConsumerById_1.default(consumerId);
    ctx.body = consumer;
};
exports.unsetCurrentShop = async (ctx) => {
    const { id: consumerId } = ctx.params;
    let consumer = await getConsumerById_1.default(consumerId);
    if (!consumer) {
        return;
    }
    consumer.currentShop = null;
    await consumer.save();
    consumer = await getConsumerById_1.default(consumerId);
    ctx.body = consumer;
};
exports.getTopBuys = async (ctx) => {
    const { id: consumerId } = ctx.params;
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = await consumerRepository.findOne(consumerId, {
        relations: ["buys", "buys.goods"],
    });
    if (!consumer) {
        return;
    }
    const consumerGoods = consumer.buys.map((buy) => {
        const goodsInBuy = buy.goods.map((good) => {
            return good;
        });
        return goodsInBuy;
    });
    const allGoods = [];
    consumerGoods.forEach((val) => {
        val.forEach((goods) => allGoods.push(goods));
    });
};
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/ConsumerController.js.map