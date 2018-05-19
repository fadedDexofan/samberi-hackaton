import Koa from "koa";
import { getRepository } from "typeorm";
import { Category } from "../db/entity/Category";

export const getAllCategories = async (ctx: Koa.Context) => {
  const categoryRepository = getRepository(Category);
  const categories = await categoryRepository.find();
  ctx.body = categories;
};

export const createCategory = async (ctx: Koa.Context) => {
  const categoryRepository = getRepository(Category);
  const category = categoryRepository.create(ctx.request.body);
  await categoryRepository.save(category);
  ctx.status = 201;
  ctx.body = category;
};

export const getCategory = async (ctx: Koa.Context) => {
  const categoryRepository = getRepository(Category);
  const category = await categoryRepository.findOneOrFail(ctx.params.id);
  ctx.body = category;
};

export const getCategoryGoods = async (ctx: Koa.Context) => {
  const categoryRepository = getRepository(Category);
  const categoryGoods = await categoryRepository.findOneOrFail(ctx.params.id, {
    relations: ["goods"],
  });
  ctx.body = categoryGoods;
};
