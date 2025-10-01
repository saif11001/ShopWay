const Sequelize = require('sequelize');

const sequelize = require('../config/DB');

const CartItem = sequelize.define( 'CartItem',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1
        }
    },
    {
        timestamps: true
    }
)

module.exports = CartItem;