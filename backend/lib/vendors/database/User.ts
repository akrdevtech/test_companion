import { UserTypes } from "../../enums/users";
import { Model, Sequelize, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from "sequelize";

const UserModel = (sequelize: Sequelize): any => {
    class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
        declare id: CreationOptional<string>;
        declare name: string;
        declare email: string;
        declare role: string;
        declare gender: CreationOptional<string>;
        declare phone: CreationOptional<string>;
        declare createdAt: CreationOptional<Date>;
        declare updatedAt: CreationOptional<Date>;
    }
    User.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false, defaultValue: UserTypes.STUDENT },
        gender: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: true },
        updatedAt: { type: DataTypes.DATE, allowNull: true },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Users'
    })
    return User;
}

export { UserModel }