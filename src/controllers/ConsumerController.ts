import Koa from "koa";
import { getRepository } from "typeorm";
import { Buy } from "../db/entity/Buy";
import { Consumer } from "../db/entity/Consumer";
import { Goods } from "../db/entity/Goods";
import getConsumerById from "../helpers/getConsumerById";
import getConsumerByUUID from "../helpers/getConsumerByUUID";

export const newConsumer = async (ctx: Koa.Context) => {
  const consumerRepository = getRepository(Consumer);
  const consumer = consumerRepository.create(ctx.request.body);
  await consumerRepository.save(consumer);
  ctx.status = 201;
  ctx.body = consumer;
};

export const getAllConsumers = async (ctx: Koa.Context) => {
  const consumerRepository = getRepository(Consumer);
  const consumers = await consumerRepository.find({
    relations: ["currentShop"],
  });
  ctx.body = consumers;
};

export const getConsumer = async (ctx: Koa.Context) => {
  const { consumerId } = ctx.params;
  const consumerRepository = getRepository(Consumer);
  const consumer = await getConsumerById(consumerId);
  ctx.body = consumer;
};

export const getConsumerBuys = async (ctx: Koa.Context) => {
  const consumerRepository = getRepository(Consumer);
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

export const updateConsumerBuy = async (ctx: Koa.Context) => {
  const { uuid, goods } = ctx.request.body;
  const buyRepository = getRepository(Buy);
  const goodsRepository = getRepository(Goods);
  const consumerRepository = getRepository(Consumer);
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
    ctx.body = await getConsumerByUUID(ctx, uuid);
    return;
  }
  if (goods) {
    buy.goods.push(goods);
    await buyRepository.save(buy);
  }
  ctx.body = await getConsumerByUUID(ctx, uuid);
};

export const delFromConsumerBuy = async (ctx: Koa.Context) => {
  const { uuid, goods } = ctx.request.body;
  const goodsId = goods.id;
  const buyRepository = getRepository(Buy);
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

export const setCurrentShop = async (ctx: Koa.Context) => {
  const { id: consumerId } = ctx.params;
  const { shopId } = ctx.request.body;
  let consumer = await getConsumerById(consumerId);
  if (!consumer) {
    return;
  }
  consumer.currentShop = shopId;
  await consumer.save();
  consumer = await getConsumerById(consumerId);
  ctx.body = consumer;
};

export const unsetCurrentShop = async (ctx: Koa.Context) => {
  const { id: consumerId } = ctx.params;
  let consumer = await getConsumerById(consumerId);
  if (!consumer) {
    return;
  }
  consumer.currentShop = null;
  await consumer.save();
  consumer = await getConsumerById(consumerId);
  ctx.body = consumer;
};

export const getTopBuys = async (ctx: Koa.Context) => {
  const { id: consumerId } = ctx.params;
  const consumerRepository = getRepository(Consumer);
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
  const allGoods: Goods[] = [];
  consumerGoods.forEach((val) => {
    val.forEach((goods) => allGoods.push(goods));
  });

  // ctx.body = allGoods.filter(x => x.id ===1);
};
