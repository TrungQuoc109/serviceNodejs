import { Model, DataTypes } from "sequelize";
import { sequelize } from "../datasourse/db.connection.js";

class Profile extends Model {}

Profile.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Profile",
        tableName: "profile",
        timestamps: false,
    }
);

export { Profile };
