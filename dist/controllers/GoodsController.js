"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Goods_1 = require("../db/entity/Goods");
exports.getAllGoods = async (ctx) => {
    const goodsRepository = typeorm_1.getRepository(Goods_1.Goods);
    const goods = await goodsRepository.find();
    ctx.body = goods;
};
exports.createGoods = async (ctx) => {
    const goodsRepository = typeorm_1.getRepository(Goods_1.Goods);
    const goods = goodsRepository.create(ctx.request.body);
    await goodsRepository.save(goods);
    ctx.status = 201;
    ctx.body = goods;
};
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/GoodsController.js.map