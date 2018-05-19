import Koa from "koa";
import { getRepository } from "typeorm";
import { Buy } from "../db/entity/Buy";
import { Consumer } from "../db/entity/Consumer";

// export const getAllCostumers

export const newConsumer = async (ctx: Koa.Context) => {
  const consumerRepository = getRepository(Consumer);
  const { name } = ctx.request.body;
  const consumer = consumerRepository.create({ name });
  await consumerRepository.save(consumer);
  ctx.status = 201;
  ctx.body = consumer;
};

export const getAllConsumers = async (ctx: Koa.Context) => {
  const consumerRepository = getRepository(Consumer);
  const consumers = await consumerRepository.find();
  ctx.body = consumers;
};

export const getConsumer = async (ctx: Koa.Context) => {
  const consumerRepository = getRepository(Consumer);
  const consumer = await consumerRepository.findOneOrFail(ctx.params.id);
  ctx.body = consumer;
};

export const getConsumerBuys = async (ctx: Koa.Context) => {
  const consumerRepository = getRepository(Consumer);
  const consumer = await consumerRepository.findOneOrFail(ctx.params.id, {
    relations: ["buys"],
  });
  ctx.body = consumer;
};

export const newConsumerBuy = async (ctx: Koa.Context) => {
  const buyRepository = getRepository(Buy);
  const consumerRepository = getRepository(Consumer);
  const consumer = await consumerRepository.findOneOrFail(ctx.params.id, {
    relations: ["buys"],
  });
  const payload = ctx.request.body;
  console.log(payload);
  const buy = buyRepository.create(payload);
  await buyRepository.save(buy);
  // @ts-ignore
  consumer.buys.push(buy);
  await consumerRepository.save(consumer);
  ctx.status = 201;
  ctx.body = buy;
};
