"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Goods_1 = require("./Goods");
const Consumer_1 = require("./Consumer");
let Buy = class Buy extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Buy.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => Goods_1.Goods),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Buy.prototype, "goods", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => Consumer_1.Consumer, (consumer) => consumer.buys),
    __metadata("design:type", Array)
], Buy.prototype, "consumers", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Buy.prototype, "date", void 0);
Buy = __decorate([
    typeorm_1.Entity()
], Buy);
exports.Buy = Buy;
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/db/entity/Buy.js.map