const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const bcrypt = require('bcrypt');

class User extends Model {
    // Method to check the password validity
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true // Validates the email format
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8] // Minimum length 8 characters
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                console.log('BeforeCreate hook: Called with data', newUserData.toJSON());
                try {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    console.log('BeforeCreate hook: Password hashed');
                } catch (error) {
                    console.error('Error in beforeCreate hook:', error);
                }
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                console.log('BeforeUpdate hook: Called with data', updatedUserData.toJSON());
                try {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    console.log('BeforeUpdate hook: Password hashed');
                } catch (error) {
                    console.error('Error in beforeUpdate hook:', error);
                }
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;