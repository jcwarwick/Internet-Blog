const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', 
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post', 
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true, // Enabling the automatic creation of createdAt and updatedAt fields
        freezeTableName: true, // Disables the automatic pluralization of table names
        underscored: true, // Uses underscores instead of camelCasing
        modelName: 'comment' // Name of the model in Sequelize
    }
);

module.exports = Comment;