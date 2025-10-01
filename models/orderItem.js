const Sequelize = require('sequelize');

const sequelize = require('../config/DB');

const OrderItem = sequelize.define('OrderItem', 
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
        }
    },
    {
        timestamps: true
    }
)

module.exports = OrderItem;