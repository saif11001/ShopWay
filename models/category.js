const Sequelize = require("sequelize");

const sequelize = require('../config/DB');

const Category = sequelize.define('Category',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = Category;
