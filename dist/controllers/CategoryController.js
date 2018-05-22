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
const Category_1 = require("../db/entity/Category");
exports.getAllCategories = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const categoryRepository = typeorm_1.getRepository(Category_1.Category);
    const categories = yield categoryRepository.find();
    ctx.body = categories;
});
exports.createCategory = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const categoryRepository = typeorm_1.getRepository(Category_1.Category);
    const category = categoryRepository.create(ctx.request.body);
    yield categoryRepository.save(category);
    ctx.status = 201;
    ctx.body = category;
});
exports.getCategory = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const categoryRepository = typeorm_1.getRepository(Category_1.Category);
    const category = yield categoryRepository.findOneOrFail(ctx.params.id);
    ctx.body = category;
});
exports.getCategoryGoods = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const categoryRepository = typeorm_1.getRepository(Category_1.Category);
    const categoryGoods = yield categoryRepository.findOneOrFail(ctx.params.id, {
        relations: ["goods"],
    });
    ctx.body = categoryGoods;
});
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/CategoryController.js.map