const sequelize = require('../config/DB');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const httpStatusText = require('../utils/httpStatusText');
const calculateCartTotal = require('../utils/calculateCartTotal');

const checkOut = async (req, res, next) => {
    const userId = req.user.id;
    const { paymentMethod, address, phone, note } = req.body;
    try{
        await sequelize.transaction(async (t) => {
            const cart = await Cart.findOne({
                where: { UserId: userId },
                include: [
                    {
                        model: CartItem,
                        include: [Product]
                    }
                ],
                transaction: t
            })
            if(!cart || cart.CartItems.length === 0) {
                return res.status(400).json({ status: httpStatusText.FAIL, message: 'Cart is empty !' });
            }

            const totalPrice = calculateCartTotal(cart);

            const order = await Order.create(
                {
                    UserId: userId,
                    totalPrice,
                    paymentMethod,
                    address,
                    phone,
                    note: note || "",
                    status: 'pending'
                },
                {
                    transaction: t
                }
            )
            
            const orderItem = await OrderItem.bulkCreate(
                cart.CartItems.map(item => ({
                    quantity: item.quantity,
                    price: item.Product.price,
                    OrderId: order.id,
                    ProductId: item.ProductId
                })),
                { transaction: t }
            )

            await CartItem.destroy({ where: { CartId: cart.id }, transaction: t });

            return res.status(201).json({ status: "success", message: "Order created successfully", data: { order, orderItem } });
        })
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    try{
        const order = await Order.findAll(
            {
                where: { UserId: req.user.id },
                include: [
                    {
                        model: OrderItem,
                        attributes: [ "id", "quantity" ],
                        include: [
                            {
                                model: Product,
                                attributes: [ "id", "title", "price" ] 
                            }
                        ]
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        )
        if(!order || order.length <= 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Order list is Empty.', data: [] });
        }
        
        res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Order fetched successfully.', data: order });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkOut,
    getOrder
};