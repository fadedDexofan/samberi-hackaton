import Koa from "koa";
import { getRepository } from "typeorm";
import { Buy } from "../db/entity/Buy";
import { Consumer } from "../db/entity/Consumer";

export const getAllBuys = async (ctx: Koa.Context) => {
  const buyRepository = getRepository(Buy);
  const buys = await buyRepository.find({
    relations: ["goods"],
  });
  ctx.body = buys;
};
