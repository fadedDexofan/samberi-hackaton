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
const categoryController = __importStar(require("../controllers/CategoryController"));
const goodsController = __importStar(require("../controllers/GoodsController"));
const consumerController = __importStar(require("../controllers/ConsumerController"));
const buyController = __importStar(require("../controllers/BuyController"));
const shopController = __importStar(require("../controllers/ShopController"));
const pushController = __importStar(require("../controllers/PushController"));
const router = new koa_router_1.default({
    prefix: "/api",
});
router.get("/consumers/:id", consumerController.getConsumer);
router.get("/consumers/:id/buys", consumerController.getConsumerBuys);
router.get("/consumers", consumerController.getAllConsumers);
router.post("/consumers", consumerController.newConsumer);
router.post("/consumers/:id/buys", consumerController.newConsumerBuy);
router.get("/buys", buyController.getAllBuys);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategory);
router.get("/categories/:id/goods", categoryController.getCategoryGoods);
router.post("/categories", categoryController.createCategory);
router.get("/goods", goodsController.getAllGoods);
router.post("/goods", goodsController.createGoods);
router.get("/shops", shopController.getAllShops);
router.post("/push", pushController.fbPush);
exports.default = router;
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/routes/index.js.map