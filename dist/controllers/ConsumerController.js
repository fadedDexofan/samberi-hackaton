"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Consumer_1 = require("../db/entity/Consumer");
const Buy_1 = require("../db/entity/Buy");
exports.newConsumer = async (ctx) => {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const { name } = ctx.request.body;
    const consumer = consumerRepository.create({ name });
    await consumerRepository.save(consumer);
    ctx.status = 201;
    ctx.body = consumer;
};
exports.getAllConsumers = async (ctx) => {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumers = await consumerRepository.find();
    ctx.body = consumers;
};
exports.getConsumer = async (ctx) => {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = await consumerRepository.findOneOrFail(ctx.params.id);
    ctx.body = consumer;
};
exports.getConsumerBuys = async (ctx) => {
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = await consumerRepository.findOneOrFail(ctx.params.id, {
        relations: ["buys"],
    });
    ctx.body = consumer;
};
exports.newConsumerBuy = async (ctx) => {
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const consumer = await consumerRepository.findOneOrFail(ctx.params.id, {
        relations: ["buys"],
    });
    const payload = ctx.request.body;
    console.log(payload);
    const buy = buyRepository.create(payload);
    await buyRepository.save(buy);
    consumer.buys.push(buy);
    await consumerRepository.save(consumer);
    ctx.status = 201;
    ctx.body = buy;
};
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/ConsumerController.js.map