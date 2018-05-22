import Router from "koa-router";
import * as buyController from "../controllers/BuyController";
import * as categoryController from "../controllers/CategoryController";
import * as consumerController from "../controllers/ConsumerController";
import * as goodsController from "../controllers/GoodsController";
import * as pushController from "../controllers/PushController";
import * as shopController from "../controllers/ShopController";

const router = new Router({
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

export default router;
