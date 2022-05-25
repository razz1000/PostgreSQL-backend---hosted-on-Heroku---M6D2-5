import Product from "./product.js";
import Review from "./review.js";
import Category from "./categories.js";
import User from "./users.js";
import ProductCategory from "./productCategories.js";

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

export default { Product, Review, User, Category, ProductCategory };
