"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const users_1 = require("../../enums/users");
const sequelize_1 = require("sequelize");
const UserModel = (sequelize) => {
    class User extends sequelize_1.Model {
    }
    User.init({
        id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
        name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        role: { type: sequelize_1.DataTypes.STRING, allowNull: false, defaultValue: users_1.UserTypes.STUDENT },
        gender: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Users'
    });
    return User;
};
exports.UserModel = UserModel;
//# sourceMappingURL=User.js.map