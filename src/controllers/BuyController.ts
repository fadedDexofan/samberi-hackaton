import Koa from "koa";
import { getRepository } from "typeorm";
import { Buy } from "../db/entity/Buy";
import { Consumer } from "../db/entity/Consumer";
import getConsumerByUUID from "../helpers/getConsumerByUUID";

export const getAllBuys = async (ctx: Koa.Context) => {
  const buyRepository = getRepository(Buy);
  const buys = await buyRepository.find({
    relations: ["goods", "consumer", "consumer.sharedBuys"],
  });
  ctx.body = buys;
};

export const shareBuy = async (ctx: Koa.Context) => {
  const { uuid, consumerId } = ctx.request.body;
  const buyRepository = getRepository(Buy);
  const buy = await buyRepository.findOneOrFail({
    where: { uuid },
    relations: ["consumer", "consumer.sharedBuys", "sharedConsumer"],
  });
  buy.sharedConsumer = consumerId;
  await buyRepository.save(buy);
  ctx.body = await getConsumerByUUID(ctx, uuid);
};

export const unshareBuy = async (ctx: Koa.Context) => {
  const { uuid } = ctx.request.body;
  const buyRepository = getRepository(Buy);
  const buy = await buyRepository.findOneOrFail({
    where: { uuid },
    relations: ["consumer", "consumer.sharedBuys", "sharedConsumer"],
  });
  buy.sharedConsumer = null;
  await buyRepository.save(buy);
  ctx.body = await getConsumerByUUID(ctx, uuid);
};
