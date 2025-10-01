const User = require("./user");
const Product = require("./product");
const Category = require("./category");
const Cart = require("./cart");
const CartItem = require("./cartItem");
const Order = require("./order");
const OrderItem = require("./orderItem");

// User ↔ Product
User.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(User);

// Category ↔ Product
Category.hasMany(Product);
Product.belongsTo(Category);

// User ↔ Cart
User.hasOne(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User);

// Cart ↔ Product (many-to-many through CartItem)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Cart ↔ CartItem
Cart.hasMany(CartItem, { onDelete: "CASCADE" });
CartItem.belongsTo(Cart);

// Product ↔ CartItem
Product.hasMany(CartItem, { onDelete: "CASCADE" });
CartItem.belongsTo(Product);

// User ↔ Order
User.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(User);

// Order ↔ OrderItem
Order.hasMany(OrderItem, { onDelete: "CASCADE" });
OrderItem.belongsTo(Order);

// Product ↔ OrderItem
Product.hasMany(OrderItem, { onDelete: "CASCADE" });
OrderItem.belongsTo(Product);

module.exports = {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem
};
