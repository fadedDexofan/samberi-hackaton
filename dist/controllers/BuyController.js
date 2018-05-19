"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Buy_1 = require("../db/entity/Buy");
exports.getAllBuys = async (ctx) => {
    const buyRepository = typeorm_1.getRepository(Buy_1.Buy);
    const buys = await buyRepository.find({
        relations: ["goods"],
    });
    ctx.body = buys;
};
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/BuyController.js.map