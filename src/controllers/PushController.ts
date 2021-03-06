import FCM from "fcm-push";
import Koa from "koa";
import { getRepository } from "typeorm";
import { Consumer } from "../db/entity/Consumer";
import { Shop } from "../db/entity/Shop";
import logger from "../utils/logger";

const serverKey =
  "AAAATL1rL00:APA91bGb5ufymJ9DXCLIeys-KrEV8flZj8HJoVLWm8MDyg0FuFFvKFUU_HzG5mTAwyy5u4-hJly8yZolsryaYrEso_ZDwnZ1MurQ-DCFu2KbfTxlvMUGj-zuMvyhThcWljbZj-D80Ldo";

const fcm = new FCM(serverKey);

export const fbPush = async (ctx: Koa.Context) => {
  const { userId, shopId } = ctx.request.body;
  const consumerRepository = getRepository(Consumer);
  const shopRepository = getRepository(Shop);
  const consumer = await consumerRepository.findOneOrFail(userId);
  const shop = await shopRepository.findOneOrFail(shopId);
  logger.debug(consumer.toString(), shop);
  const message = {
    to: "/topics/notifications", // required fill with device token or topics
    data: {
      userId,
    },
    notification: {
      title: "Самбери",
      body: `${consumer.name} сейчас в Самбери на ${shop.address}`,
    },
  };
  try {
    await fcm.send(message);
    ctx.body = { status: "ok" };
  } catch (err) {
    throw new Error(err);
  }
};
