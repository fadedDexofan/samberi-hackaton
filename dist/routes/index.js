"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const buyController = __importStar(require("../controllers/BuyController"));
const categoryController = __importStar(require("../controllers/CategoryController"));
const consumerController = __importStar(require("../controllers/ConsumerController"));
const goodsController = __importStar(require("../controllers/GoodsController"));
const pushController = __importStar(require("../controllers/PushController"));
const shopController = __importStar(require("../controllers/ShopController"));
const router = new koa_router_1.default({
    prefix: "/api",
});
router.get("/consumers/:id", consumerController.getConsumer);
router.put("/consumers/:id/shop", consumerController.setCurrentShop);
router.del("/consumers/:id/shop", consumerController.unsetCurrentShop);
router.get("/consumers", consumerController.getAllConsumers);
router.post("/consumers", consumerController.newConsumer);
router.get("/consumers/:id/buys", consumerController.getConsumerBuys);
router.get("/consumers/:id/buys/top", consumerController.getTopBuys);
router.put("/consumers/:id/buys", consumerController.updateConsumerBuy);
router.del("/consumers/:id/buys", consumerController.delFromConsumerBuy);
router.get("/buys", buyController.getAllBuys);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategory);
router.get("/categories/:id/goods", categoryController.getCategoryGoods);
router.post("/categories", categoryController.createCategory);
router.get("/goods", goodsController.getAllGoods);
router.post("/goods", goodsController.createGoods);
router.get("/shops", shopController.getAllShops);
router.post("/push", pushController.fbPush);
router.put("/share", buyController.shareBuy);
router.del("/share", buyController.unshareBuy);
exports.default = router;
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/routes/index.js.map