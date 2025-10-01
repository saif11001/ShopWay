const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Product = require("../models/product");
const calculateCartTotal = require("./calculateCartTotal");

const formatCart = async (userId) => {
    const cart = await Cart.findOne({
        where: { UserId: userId },
        include: [
            {
                model: CartItem,
                include: [
                    {
                        model: Product,
                        attributes: ["id", "title", "price", "brand"]
                    }
                ]
            }
        ]
    });

    if (!cart) return null;

    const formattedCart = {
        UserId: cart.UserId,
        CartItems: cart.CartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            CartId: item.CartId,
            Product: item.Product,
        })),
    };

    const totalPrice = calculateCartTotal(cart);

    return { formattedCart, totalPrice };
};

module.exports = formatCart ;
