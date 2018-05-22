"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fcm_push_1 = __importDefault(require("fcm-push"));
const typeorm_1 = require("typeorm");
const Consumer_1 = require("../db/entity/Consumer");
const Shop_1 = require("../db/entity/Shop");
const logger_1 = __importDefault(require("../utils/logger"));
const serverKey = "AAAATL1rL00:APA91bGb5ufymJ9DXCLIeys-KrEV8flZj8HJoVLWm8MDyg0FuFFvKFUU_HzG5mTAwyy5u4-hJly8yZolsryaYrEso_ZDwnZ1MurQ-DCFu2KbfTxlvMUGj-zuMvyhThcWljbZj-D80Ldo";
const fcm = new fcm_push_1.default(serverKey);
exports.fbPush = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId, shopId } = ctx.request.body;
    const consumerRepository = typeorm_1.getRepository(Consumer_1.Consumer);
    const shopRepository = typeorm_1.getRepository(Shop_1.Shop);
    const consumer = yield consumerRepository.findOneOrFail(userId);
    const shop = yield shopRepository.findOneOrFail(shopId);
    logger_1.default.debug(consumer.toString(), shop);
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
        yield fcm.send(message);
        ctx.body = { status: "ok" };
    }
    catch (err) {
        throw new Error(err);
    }
});
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/controllers/PushController.js.map