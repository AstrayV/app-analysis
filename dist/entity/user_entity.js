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
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var User_Entity = /** @class */ (function () {
    function User_Entity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User_Entity.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('varchar'),
        __metadata("design:type", String)
    ], User_Entity.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column('varchar'),
        __metadata("design:type", String)
    ], User_Entity.prototype, "password", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], User_Entity.prototype, "create_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], User_Entity.prototype, "update_at", void 0);
    User_Entity = __decorate([
        typeorm_1.Entity('user')
    ], User_Entity);
    return User_Entity;
}());
exports.User_Entity = User_Entity;
//# sourceMappingURL=user_entity.js.map