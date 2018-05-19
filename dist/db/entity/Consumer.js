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
const Buy_1 = require("./Buy");
let Consumer = class Consumer extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Consumer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Consumer.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => Buy_1.Buy, (buy) => buy.consumers, { cascade: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Consumer.prototype, "buys", void 0);
Consumer = __decorate([
    typeorm_1.Entity()
], Consumer);
exports.Consumer = Consumer;
//# sourceMappingURL=C:/Users/faded/Documents/Code/Hackaton/samberi/dist/db/entity/Consumer.js.map