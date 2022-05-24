import Product from "./product.js";
import Review from "./review.js";

Product.hasMany(Review);
Review.belongsTo(Product);

export default { Product, Review };
