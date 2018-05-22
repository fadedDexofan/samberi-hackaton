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
const Consumer_1 = require("../db/entity/Consumer");
const Goods_1 = require("../db/entity/Goods");
const getConsumerById_1 = __importDefault(require("../helpers/getConsumerById"));
const getConsumerByUUID_1 = __importDefault(require("../helpers/getConsumerByUUID"));
exports.newConsumer = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = consumerRepository.create(ctx.request.body);
    yield consumerRepository.save(consumer);
    ctx.status = 201;
    ctx.body = consumer;
});
exports.getAllConsumers = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumers = yield consumerRepository.find({
        relations: ["currentShop"],
    });
    ctx.body = consumers;
});
exports.getConsumer = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { consumerId } = ctx.params;
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = yield getConsumerById_1.default(consumerId);
    ctx.body = consumer;
});
exports.getConsumerBuys = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = yield consumerRepository.findOneOrFail(ctx.params.id, {
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
});
exports.updateConsumerBuy = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { uuid, goods } = ctx.request.body;
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const goodsRepository = typeorm_1.getRepository(Goods_1.Goods);
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = yield consumerRepository.findOneOrFail(ctx.params.id, {
        relations: ["buys"],
    });
    const buy = yield buyRepository.findOne({
        where: { uuid },
        relations: ["goods"],
    });
    if (!buy) {
        const newBuy = buyRepository.create({ uuid, goods: [goods] });
        yield buyRepository.save(newBuy);
        consumer.buys.push(newBuy);
        yield consumerRepository.save(consumer);
        ctx.status = 201;
        ctx.body = yield getConsumerByUUID_1.default(ctx, uuid);
        return;
    }
    if (goods) {
        buy.goods.push(goods);
        yield buyRepository.save(buy);
    }
    ctx.body = yield getConsumerByUUID_1.default(ctx, uuid);
});
exports.delFromConsumerBuy = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { uuid, goods } = ctx.request.body;
    const goodsId = goods.id;
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const buy = yield buyRepository.findOneOrFail({
        where: { uuid },
        relations: ["goods"],
    });
    buy.goods = buy.goods.filter((val) => {
        return val.id !== goodsId;
    });
    yield buyRepository.save(buy);
    ctx.body = buy;
});
exports.setCurrentShop = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { id: consumerId } = ctx.params;
    const { shopId } = ctx.request.body;
    let consumer = yield getConsumerById_1.default(consumerId);
    if (!consumer) {
        return;
    }
    consumer.currentShop = shopId;
    yield consumer.save();
    consumer = yield getConsumerById_1.default(consumerId);
    ctx.body = consumer;
});
exports.unsetCurrentShop = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { id: consumerId } = ctx.params;
    let consumer = yield getConsumerById_1.default(consumerId);
    if (!consumer) {
        return;
    }
    consumer.currentShop = null;
    yield consumer.save();
    consumer = yield getConsumerById_1.default(consumerId);
    ctx.body = consumer;
});
exports.getTopBuys = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { id: consumerId } = ctx.params;
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = yield consumerRepository.findOne(consumerId, {
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
});
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/ConsumerController.js.map