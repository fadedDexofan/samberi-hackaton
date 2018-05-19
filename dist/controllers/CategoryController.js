"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Category_1 = require("../db/entity/Category");
exports.getAllCategories = async (ctx) => {
    const categoryRepository = typeorm_1.getRepository(Category_1.Category);
    const categories = await categoryRepository.find();
    ctx.body = categories;
};
exports.createCategory = async (ctx) => {
    const categoryRepository = typeorm_1.getRepository(Category_1.Category);
    const category = categoryRepository.create(ctx.request.body);
    await categoryRepository.save(category);
    ctx.status = 201;
    ctx.body = category;
};
exports.getCategory = async (ctx) => {
    const categoryRepository = typeorm_1.getRepository(Category_1.Category);
    const category = await categoryRepository.findOneOrFail(ctx.params.id);
    ctx.body = category;
};
exports.getCategoryGoods = async (ctx) => {
    const categoryRepository = typeorm_1.getRepository(Category_1.Category);
    const categoryGoods = await categoryRepository.findOneOrFail(ctx.params.id, {
        relations: ["goods"],
    });
    ctx.body = categoryGoods;
};
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/CategoryController.js.map