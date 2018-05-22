"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Goods_1 = require("../db/entity/Goods");
exports.getAllGoods = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const goodsRepository = typeorm_1.getRepository(Goods_1.Goods);
    const goods = yield goodsRepository.find();
    ctx.body = goods;
});
exports.createGoods = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const goodsRepository = typeorm_1.getRepository(Goods_1.Goods);
    const goods = goodsRepository.create(ctx.request.body);
    yield goodsRepository.save(goods);
    ctx.status = 201;
    ctx.body = goods;
});
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/GoodsController.js.map