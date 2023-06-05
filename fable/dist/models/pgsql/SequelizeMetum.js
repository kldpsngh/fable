"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeMetum = void 0;
const sequelize_1 = require("sequelize");
class SequelizeMetum extends sequelize_1.Model {
    static initModel(sequelize) {
        return SequelizeMetum.init({
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'SequelizeMeta',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.SequelizeMetum = SequelizeMetum;
//# sourceMappingURL=SequelizeMetum.js.map