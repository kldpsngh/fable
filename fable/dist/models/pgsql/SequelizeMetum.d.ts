import * as Sequelize from 'sequelize';
import { Model } from 'sequelize';
export interface SequelizeMetumAttributes {
    name: string;
}
export type SequelizeMetumPk = "name";
export type SequelizeMetumId = SequelizeMetum[SequelizeMetumPk];
export type SequelizeMetumCreationAttributes = SequelizeMetumAttributes;
export declare class SequelizeMetum extends Model<SequelizeMetumAttributes, SequelizeMetumCreationAttributes> implements SequelizeMetumAttributes {
    name: string;
    static initModel(sequelize: Sequelize.Sequelize): typeof SequelizeMetum;
}
//# sourceMappingURL=SequelizeMetum.d.ts.map