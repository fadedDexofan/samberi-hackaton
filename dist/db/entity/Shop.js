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
const Consumer_1 = require("./Consumer");
let Shop = class Shop extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Shop.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Shop.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision" }),
    __metadata("design:type", Number)
], Shop.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision" }),
    __metadata("design:type", Number)
], Shop.prototype, "latitude", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Consumer_1.Consumer, (consumersInShop) => consumersInShop.currentShop),
    __metadata("design:type", Array)
], Shop.prototype, "consumersInShop", void 0);
Shop = __decorate([
    typeorm_1.Entity()
], Shop);
exports.Shop = Shop;
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/db/entity/Shop.js.map