import Product from "./product.js";
import Review from "./review.js";
import Category from "./categories.js";
import User from "./users.js";
import ProductCategory from "./productCategories.js";
import Like from "./like.js";
import ProductLikes from "./productLikes.js";
import Cart from "./cart.js";

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
});
Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
});

Product.belongsToMany(User, {
  through: { model: Like, unique: false },
  as: "likes",
});

User.belongsToMany(Product, {
  through: { model: Like, unique: false },
  as: "productlikes",
});

Product.belongsToMany(User, {
  through: { model: Cart, unique: false },
});

User.belongsToMany(Product, {
  through: { model: Cart, unique: false },
});

export default {
  Product,
  Review,
  User,
  Category,
  ProductCategory,
  Like,
  Cart,
};
