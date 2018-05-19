import Koa from "koa";
import { getRepository } from "typeorm";
import { Shop } from "../db/entity/Shop";

export const getAllShops = async (ctx: Koa.Context) => {
  const shopRepository = getRepository(Shop);
  const shops = await shopRepository.find();
  ctx.body = shops;
};
