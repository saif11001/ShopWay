const Sequelize = require('sequelize');

const sequelize = require('../config/DB');

const Cart = sequelize.define( 'Cart',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = Cart;