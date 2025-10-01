const Sequelize = require('sequelize');

const sequelize = require('../config/DB');

const Product = sequelize.define('Product',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        price: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        short_description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        long_description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive', 'draft'),
            defaultValue: 'active'
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: { min: 0 }
        },
        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'id',
            }
        }
    },
    {
        timestamps: true
    }
)

module.exports = Product;