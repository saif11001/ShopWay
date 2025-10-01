const Sequelize = require('sequelize');

const sequelize = require('../config/DB');

const Order = sequelize.define('Order', 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true
        },
        paymentMethod: {
            type: Sequelize.ENUM("COD", "CREDIT"),
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
            defaultValue: "pending",
        },
        totalPrice: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
        }        
    },
    {
        timestamps: true 
    }
)

module.exports = Order;