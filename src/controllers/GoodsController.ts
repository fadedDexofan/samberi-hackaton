import Koa from "koa";
import { getRepository } from "typeorm";
import { Goods } from "../db/entity/Goods";

export const getAllGoods = async (ctx: Koa.Context) => {
  const goodsRepository = getRepository(Goods);
  const goods = await goodsRepository.find();
  ctx.body = goods;
};

export const createGoods = async (ctx: Koa.Context) => {
  const goodsRepository = getRepository(Goods);
  const goods = goodsRepository.create(ctx.request.body);
  await goodsRepository.save(goods);
  ctx.status = 201;
  ctx.body = goods;
};
