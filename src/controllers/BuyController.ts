import Koa from "koa";
import { getRepository } from "typeorm";
import { Consumer } from "../db/entity/Consumer";
import { Buy } from "../db/entity/Buy";

export const getAllBuys = async (ctx: Koa.Context) => {
  const buyRepository = getRepository(Buy);
  const buys = await buyRepository.find({
    relations: ["goods"],
  });
  ctx.body = buys;
};
