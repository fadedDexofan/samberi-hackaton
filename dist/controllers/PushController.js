"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fcm_push_1 = __importDefault(require("fcm-push"));
const typeorm_1 = require("typeorm");
const Consumer_1 = require("../db/entity/Consumer");
const Shop_1 = require("../db/entity/Shop");
const serverKey = "AAAATL1rL00:APA91bGb5ufymJ9DXCLIeys-KrEV8flZj8HJoVLWm8MDyg0FuFFvKFUU_HzG5mTAwyy5u4-hJly8yZolsryaYrEso_ZDwnZ1MurQ-DCFu2KbfTxlvMUGj-zuMvyhThcWljbZj-D80Ldo";
const fcm = new fcm_push_1.default(serverKey);
exports.fbPush = async (ctx) => {
    const { userId, shopId } = ctx.request.body;
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const shopRepository = typeorm_1.getRepository(Shop_1.Shop);
    const consumer = await consumerRepository.findOneOrFail(userId);
    const shop = await shopRepository.findOneOrFail(shopId);
    console.log(consumer, shop);
    const message = {
        to: "/topics/notifications",
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
    }
    catch (err) {
        console.log("Something has gone wrong!");
        console.error(err);
    }
};
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/PushController.js.map