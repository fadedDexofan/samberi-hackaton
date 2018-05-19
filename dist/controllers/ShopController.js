"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Shop_1 = require("../db/entity/Shop");
exports.getAllShops = async (ctx) => {
    const shopRepository = typeorm_1.getRepository(Shop_1.Shop);
    const shops = await shopRepository.find();
    ctx.body = shops;
};
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/ShopController.js.map